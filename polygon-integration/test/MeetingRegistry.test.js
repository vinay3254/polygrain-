// test/MeetingRegistry.test.js — Hardhat + Chai tests for MeetingRegistry
const { expect }   = require("chai");
const { ethers }   = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("MeetingRegistry", function () {
  // ── Shared test data ──────────────────────────────────────────────────────
  // Using BigInt literals (n suffix) as required by ethers v6 for uint256 args
  const MEETING_ID        = "ABC-1234-XYZ";
  const START_TIME        = 1_700_000_000n;
  const END_TIME          = 1_700_003_600n;
  const PARTICIPANT_COUNT = 5n;
  const NOTES_HASH        = ethers.keccak256(ethers.toUtf8Bytes("test meeting notes"));

  /** Deploy a fresh contract instance before each test */
  async function deployRegistry() {
    const [owner, other] = await ethers.getSigners();
    const Factory        = await ethers.getContractFactory("MeetingRegistry");
    const registry       = await Factory.deploy();
    await registry.waitForDeployment();
    return { registry, owner, other };
  }

  // ── 1. Deployment ─────────────────────────────────────────────────────────

  describe("Deployment", function () {
    it("deploys to a valid non-zero address", async function () {
      const { registry } = await deployRegistry();
      expect(await registry.getAddress()).to.not.equal(ethers.ZeroAddress);
    });
  });

  // ── 2. storeMeeting ───────────────────────────────────────────────────────

  describe("storeMeeting", function () {
    it("emits MeetingStored with correct meetingId, host, and a non-zero timestamp", async function () {
      const { registry, owner } = await deployRegistry();

      await expect(
        registry.storeMeeting(MEETING_ID, START_TIME, END_TIME, PARTICIPANT_COUNT, NOTES_HASH)
      )
        .to.emit(registry, "MeetingStored")
        .withArgs(MEETING_ID, owner.address, anyValue); // anyValue matches block.timestamp
    });

    it("stores all fields correctly and retrieves them via getMeeting", async function () {
      const { registry, owner } = await deployRegistry();
      await registry.storeMeeting(MEETING_ID, START_TIME, END_TIME, PARTICIPANT_COUNT, NOTES_HASH);

      const m = await registry.getMeeting(MEETING_ID);
      expect(m.meetingId).to.equal(MEETING_ID);
      expect(m.host).to.equal(owner.address);
      expect(m.startTime).to.equal(START_TIME);
      expect(m.endTime).to.equal(END_TIME);
      expect(m.participantCount).to.equal(PARTICIPANT_COUNT);
      expect(m.notesHash).to.equal(NOTES_HASH);
    });

    it("reverts when meetingId is an empty string", async function () {
      const { registry } = await deployRegistry();
      await expect(
        registry.storeMeeting("", START_TIME, END_TIME, PARTICIPANT_COUNT, NOTES_HASH)
      ).to.be.revertedWith("MeetingRegistry: meetingId cannot be empty");
    });

    it("reverts when endTime is before startTime", async function () {
      const { registry } = await deployRegistry();
      await expect(
        // Pass END_TIME as startTime and START_TIME as endTime — deliberately reversed
        registry.storeMeeting(MEETING_ID, END_TIME, START_TIME, PARTICIPANT_COUNT, NOTES_HASH)
      ).to.be.revertedWith("MeetingRegistry: endTime before startTime");
    });

    it("reverts when startTime is zero", async function () {
      const { registry } = await deployRegistry();
      await expect(
        registry.storeMeeting(MEETING_ID, 0n, END_TIME, PARTICIPANT_COUNT, NOTES_HASH)
      ).to.be.revertedWith("MeetingRegistry: startTime must be non-zero");
    });

    it("reverts when the same meetingId is stored a second time (immutable records)", async function () {
      // Design choice: meetingId is a unique key — once stored, the record cannot be
      // overwritten. This prevents host impersonation and ensures on-chain data integrity.
      const { registry } = await deployRegistry();
      await registry.storeMeeting(MEETING_ID, START_TIME, END_TIME, PARTICIPANT_COUNT, NOTES_HASH);

      await expect(
        registry.storeMeeting(MEETING_ID, START_TIME, END_TIME, PARTICIPANT_COUNT, NOTES_HASH)
      ).to.be.revertedWith("MeetingRegistry: meeting already stored");
    });

    it("allows different hosts to each store different meetingIds", async function () {
      const { registry, owner, other } = await deployRegistry();
      const id2   = "DEF-5678-UVW";
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("other meeting notes"));

      // Owner stores the first meeting
      await registry.connect(owner).storeMeeting(
        MEETING_ID, START_TIME, END_TIME, PARTICIPANT_COUNT, NOTES_HASH
      );
      // A different address stores a second meeting with a distinct ID
      await registry.connect(other).storeMeeting(
        id2, START_TIME, END_TIME, 3n, hash2
      );

      expect((await registry.getMeeting(MEETING_ID)).host).to.equal(owner.address);
      expect((await registry.getMeeting(id2)).host).to.equal(other.address);
    });

    it("stores zero participantCount without reverting", async function () {
      // participantCount has no minimum — an empty room is technically valid
      const { registry } = await deployRegistry();
      await expect(
        registry.storeMeeting(MEETING_ID, START_TIME, END_TIME, 0n, NOTES_HASH)
      ).to.not.be.reverted;
      expect((await registry.getMeeting(MEETING_ID)).participantCount).to.equal(0n);
    });
  });

  // ── 3. getMeetingsByHost ──────────────────────────────────────────────────

  describe("getMeetingsByHost", function () {
    it("returns an empty array for an address that has never hosted", async function () {
      const { registry, other } = await deployRegistry();
      expect(await registry.getMeetingsByHost(other.address)).to.deep.equal([]);
    });

    it("returns all meeting IDs for a host in insertion order", async function () {
      const { registry, owner } = await deployRegistry();
      const ids  = ["MTG-001", "MTG-002", "MTG-003"];
      const hash = ethers.keccak256(ethers.toUtf8Bytes("notes"));

      for (let i = 0; i < ids.length; i++) {
        await registry.storeMeeting(
          ids[i],
          START_TIME + BigInt(i * 1000), // unique startTime per meeting
          END_TIME,
          2n,
          hash
        );
      }

      // Spread from ethers Result to plain JS array before comparing
      const result = [...(await registry.getMeetingsByHost(owner.address))];
      expect(result).to.deep.equal(ids);
    });

    it("does not mix meeting histories across different host addresses", async function () {
      const { registry, owner, other } = await deployRegistry();
      const hash = ethers.keccak256(ethers.toUtf8Bytes("notes"));

      await registry.connect(owner).storeMeeting("OWNER-1", START_TIME, END_TIME, 1n, hash);
      await registry.connect(other).storeMeeting("OTHER-1", START_TIME, END_TIME, 1n, hash);

      const ownerIds = [...(await registry.getMeetingsByHost(owner.address))];
      const otherIds = [...(await registry.getMeetingsByHost(other.address))];

      expect(ownerIds).to.deep.equal(["OWNER-1"]);
      expect(otherIds).to.deep.equal(["OTHER-1"]);
    });
  });

  // ── 4. getMeeting (unset case) ────────────────────────────────────────────

  describe("getMeeting", function () {
    it("returns a zero-value struct for an ID that was never stored", async function () {
      const { registry } = await deployRegistry();
      const m = await registry.getMeeting("NONEXISTENT-ID");
      // Callers use startTime === 0n to detect an unset record
      expect(m.startTime).to.equal(0n);
      expect(m.host).to.equal(ethers.ZeroAddress);
      expect(m.participantCount).to.equal(0n);
    });
  });

  // ── Shared CIDs for new lifecycle tests ──────────────────────────────────
  const METADATA_CID = "QmTestMetadataCIDxxxxxxxxxxxxxxxxxxxx";
  const CONTENT_CID  = "QmTestContentCIDxxxxxxxxxxxxxxxxxxxxxx";

  // ── 5. createMeeting ──────────────────────────────────────────────────────

  describe("createMeeting", function () {
    it("emits MeetingCreated with meetingId, host, metadataCID, and non-zero timestamp", async function () {
      const { registry, owner } = await deployRegistry();
      await expect(
        registry.createMeeting(MEETING_ID, METADATA_CID)
      )
        .to.emit(registry, "MeetingCreated")
        .withArgs(MEETING_ID, owner.address, METADATA_CID, anyValue);
    });

    it("stores host as msg.sender, sets startTime > 0, endTime = 0", async function () {
      const { registry, owner } = await deployRegistry();
      await registry.createMeeting(MEETING_ID, METADATA_CID);
      const m = await registry.getMeeting(MEETING_ID);
      expect(m.host).to.equal(owner.address);
      expect(m.startTime).to.be.gt(0n);
      expect(m.endTime).to.equal(0n);
    });

    it("stores metadataCID in the Meeting struct", async function () {
      const { registry } = await deployRegistry();
      await registry.createMeeting(MEETING_ID, METADATA_CID);
      const m = await registry.getMeeting(MEETING_ID);
      expect(m.metadataCID).to.equal(METADATA_CID);
    });

    it("reverts on empty meetingId", async function () {
      const { registry } = await deployRegistry();
      await expect(
        registry.createMeeting("", METADATA_CID)
      ).to.be.revertedWith("MeetingRegistry: meetingId cannot be empty");
    });

    it("reverts when the same meetingId is created twice", async function () {
      const { registry } = await deployRegistry();
      await registry.createMeeting(MEETING_ID, METADATA_CID);
      await expect(
        registry.createMeeting(MEETING_ID, METADATA_CID)
      ).to.be.revertedWith("MeetingRegistry: meeting already exists");
    });
  });

  // ── 6. joinMeeting ────────────────────────────────────────────────────────

  describe("joinMeeting", function () {
    it("emits ParticipantJoined with meetingId, participant address, and non-zero timestamp", async function () {
      const { registry, owner, other } = await deployRegistry();
      await registry.connect(owner).createMeeting(MEETING_ID, METADATA_CID);
      await expect(
        registry.connect(other).joinMeeting(MEETING_ID)
      )
        .to.emit(registry, "ParticipantJoined")
        .withArgs(MEETING_ID, other.address, anyValue);
    });

    it("increments participantCount by 1 per join", async function () {
      const { registry, owner, other } = await deployRegistry();
      await registry.connect(owner).createMeeting(MEETING_ID, METADATA_CID);
      const before = (await registry.getMeeting(MEETING_ID)).participantCount;
      await registry.connect(other).joinMeeting(MEETING_ID);
      const after = (await registry.getMeeting(MEETING_ID)).participantCount;
      expect(after).to.equal(before + 1n);
    });

    it("reverts when meeting does not exist", async function () {
      const { registry } = await deployRegistry();
      await expect(
        registry.joinMeeting("NONEXISTENT")
      ).to.be.revertedWith("MeetingRegistry: meeting does not exist");
    });

    it("reverts when joining a meeting that has already ended", async function () {
      const { registry, owner } = await deployRegistry();
      await registry.createMeeting(MEETING_ID, METADATA_CID);
      await registry.endMeeting(MEETING_ID, ethers.ZeroHash);
      await expect(
        registry.joinMeeting(MEETING_ID)
      ).to.be.revertedWith("MeetingRegistry: meeting has ended");
    });
  });

  // ── 7. sendMessage ────────────────────────────────────────────────────────

  describe("sendMessage", function () {
    it("emits MessageSent with meetingId, sender, contentCID, and non-zero timestamp", async function () {
      const { registry, owner } = await deployRegistry();
      await registry.createMeeting(MEETING_ID, METADATA_CID);
      await expect(
        registry.sendMessage(MEETING_ID, CONTENT_CID)
      )
        .to.emit(registry, "MessageSent")
        .withArgs(MEETING_ID, owner.address, CONTENT_CID, anyValue);
    });

    it("reverts when meeting does not exist", async function () {
      const { registry } = await deployRegistry();
      await expect(
        registry.sendMessage("NONEXISTENT", CONTENT_CID)
      ).to.be.revertedWith("MeetingRegistry: meeting does not exist");
    });

    it("reverts when meeting has ended", async function () {
      const { registry } = await deployRegistry();
      await registry.createMeeting(MEETING_ID, METADATA_CID);
      await registry.endMeeting(MEETING_ID, ethers.ZeroHash);
      await expect(
        registry.sendMessage(MEETING_ID, CONTENT_CID)
      ).to.be.revertedWith("MeetingRegistry: meeting has ended");
    });
  });

  // ── 8. endMeeting ─────────────────────────────────────────────────────────

  describe("endMeeting", function () {
    it("emits MeetingEnded with meetingId, host, endTime, participantCount, notesHash", async function () {
      const { registry, owner } = await deployRegistry();
      await registry.createMeeting(MEETING_ID, METADATA_CID);
      await expect(
        registry.endMeeting(MEETING_ID, NOTES_HASH)
      )
        .to.emit(registry, "MeetingEnded")
        .withArgs(MEETING_ID, owner.address, anyValue, anyValue, NOTES_HASH);
    });

    it("sets endTime > 0 and stores notesHash after endMeeting", async function () {
      const { registry } = await deployRegistry();
      await registry.createMeeting(MEETING_ID, METADATA_CID);
      await registry.endMeeting(MEETING_ID, NOTES_HASH);
      const m = await registry.getMeeting(MEETING_ID);
      expect(m.endTime).to.be.gt(0n);
      expect(m.notesHash).to.equal(NOTES_HASH);
    });

    it("reverts when called by non-host", async function () {
      const { registry, owner, other } = await deployRegistry();
      await registry.connect(owner).createMeeting(MEETING_ID, METADATA_CID);
      await expect(
        registry.connect(other).endMeeting(MEETING_ID, ethers.ZeroHash)
      ).to.be.revertedWith("MeetingRegistry: only host can end meeting");
    });

    it("reverts when meeting does not exist", async function () {
      const { registry } = await deployRegistry();
      await expect(
        registry.endMeeting("NONEXISTENT", ethers.ZeroHash)
      ).to.be.revertedWith("MeetingRegistry: meeting does not exist");
    });

    it("reverts when meeting is already ended", async function () {
      const { registry } = await deployRegistry();
      await registry.createMeeting(MEETING_ID, METADATA_CID);
      await registry.endMeeting(MEETING_ID, ethers.ZeroHash);
      await expect(
        registry.endMeeting(MEETING_ID, ethers.ZeroHash)
      ).to.be.revertedWith("MeetingRegistry: meeting already ended");
    });
  });
});
