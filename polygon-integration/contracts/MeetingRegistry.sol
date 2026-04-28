// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title MeetingRegistry
/// @notice Manages the full on-chain lifecycle of EtherXMeet meeting sessions.
/// @dev Supports two flows:
///      Legacy: storeMeeting() — single atomic write after meeting ends (backward compat)
///      New:    createMeeting() → joinMeeting() → sendMessage() → endMeeting()
contract MeetingRegistry {

    // ─── Data Structures ──────────────────────────────────────────────────────

    struct Meeting {
        string   meetingId;        // Unique room code (e.g. "abc-1234-xyz")
        address  host;             // Wallet address of the meeting host
        uint256  startTime;        // Unix timestamp when meeting started (0 = never created)
        uint256  endTime;          // Unix timestamp when meeting ended (0 = still active)
        uint256  participantCount; // Number of wallets that joined
        bytes32  notesHash;        // keccak256 hash of AI-generated notes
        string   metadataCID;      // IPFS CID for rich metadata JSON (empty for legacy records)
    }

    // ─── Storage ──────────────────────────────────────────────────────────────

    mapping(string => Meeting)   private meetings;
    mapping(string => address[]) private meetingParticipants;
    mapping(address => string[]) private hostMeetings;
    mapping(address => string[]) private participantMeetings;

    // ─── Events ───────────────────────────────────────────────────────────────

    /// @notice Emitted by the legacy storeMeeting() — kept for backward compat.
    event MeetingStored(
        string  indexed meetingId,
        address indexed host,
        uint256         timestamp
    );

    /// @notice Emitted when a host creates a new room on-chain.
    event MeetingCreated(
        string  indexed meetingId,
        address indexed host,
        string          metadataCID,
        uint256         timestamp
    );

    /// @notice Emitted when a participant joins a live room.
    event ParticipantJoined(
        string  indexed meetingId,
        address indexed participant,
        uint256         timestamp
    );

    /// @notice Emitted for each chat message (content on IPFS, CID anchored here).
    event MessageSent(
        string  indexed meetingId,
        address indexed sender,
        string          contentCID,
        uint256         timestamp
    );

    /// @notice Emitted when the host ends the meeting.
    event MeetingEnded(
        string  indexed meetingId,
        address indexed host,
        uint256         endTime,
        uint256         participantCount,
        bytes32         notesHash
    );

    // ─── Legacy Write (backward compat) ───────────────────────────────────────

    /// @notice Store meeting metadata on-chain in a single atomic call.
    ///         The legacy flow — still valid and used by existing tests.
    function storeMeeting(
        string  calldata meetingId,
        uint256          startTime,
        uint256          endTime,
        uint256          participantCount,
        bytes32          notesHash
    ) external {
        require(bytes(meetingId).length > 0,       "MeetingRegistry: meetingId cannot be empty");
        require(meetings[meetingId].startTime == 0, "MeetingRegistry: meeting already stored");
        require(startTime > 0,                      "MeetingRegistry: startTime must be non-zero");
        require(endTime >= startTime,               "MeetingRegistry: endTime before startTime");

        meetings[meetingId] = Meeting({
            meetingId:        meetingId,
            host:             msg.sender,
            startTime:        startTime,
            endTime:          endTime,
            participantCount: participantCount,
            notesHash:        notesHash,
            metadataCID:      ""
        });

        hostMeetings[msg.sender].push(meetingId);
        emit MeetingStored(meetingId, msg.sender, block.timestamp);
    }

    // ─── New Lifecycle Functions ───────────────────────────────────────────────

    /// @notice Open a new meeting room on-chain.
    ///         Caller becomes the host. startTime = block.timestamp. endTime = 0.
    /// @param meetingId   Unique room code — reverts if already used by any flow.
    /// @param metadataCID IPFS CID pointing to the meeting metadata JSON.
    function createMeeting(
        string calldata meetingId,
        string calldata metadataCID
    ) external {
        require(bytes(meetingId).length > 0,        "MeetingRegistry: meetingId cannot be empty");
        require(meetings[meetingId].startTime == 0,  "MeetingRegistry: meeting already exists");

        meetings[meetingId] = Meeting({
            meetingId:        meetingId,
            host:             msg.sender,
            startTime:        block.timestamp,
            endTime:          0,
            participantCount: 1,
            notesHash:        bytes32(0),
            metadataCID:      metadataCID
        });

        meetingParticipants[meetingId].push(msg.sender);
        hostMeetings[msg.sender].push(meetingId);
        participantMeetings[msg.sender].push(meetingId);

        emit MeetingCreated(meetingId, msg.sender, metadataCID, block.timestamp);
    }

    /// @notice Join an active meeting room. Reverts if ended or non-existent.
    function joinMeeting(string calldata meetingId) external {
        require(meetings[meetingId].startTime != 0, "MeetingRegistry: meeting does not exist");
        require(meetings[meetingId].endTime == 0,   "MeetingRegistry: meeting has ended");

        meetings[meetingId].participantCount++;
        meetingParticipants[meetingId].push(msg.sender);
        participantMeetings[msg.sender].push(meetingId);

        emit ParticipantJoined(meetingId, msg.sender, block.timestamp);
    }

    /// @notice Emit a chat message anchored on-chain.
    ///         Content lives on IPFS; only the CID is in the event log (no storage write).
    function sendMessage(
        string calldata meetingId,
        string calldata contentCID
    ) external {
        require(meetings[meetingId].startTime != 0, "MeetingRegistry: meeting does not exist");
        require(meetings[meetingId].endTime == 0,   "MeetingRegistry: meeting has ended");

        emit MessageSent(meetingId, msg.sender, contentCID, block.timestamp);
    }

    /// @notice End the meeting. Only the host can call this.
    function endMeeting(
        string  calldata meetingId,
        bytes32          notesHash
    ) external {
        require(meetings[meetingId].startTime != 0,         "MeetingRegistry: meeting does not exist");
        require(meetings[meetingId].host == msg.sender,      "MeetingRegistry: only host can end meeting");
        require(meetings[meetingId].endTime == 0,            "MeetingRegistry: meeting already ended");

        meetings[meetingId].endTime   = block.timestamp;
        meetings[meetingId].notesHash = notesHash;

        emit MeetingEnded(
            meetingId,
            msg.sender,
            block.timestamp,
            meetings[meetingId].participantCount,
            notesHash
        );
    }

    // ─── View Functions ───────────────────────────────────────────────────────

    function getMeeting(string calldata meetingId)
        external view returns (Meeting memory)
    {
        return meetings[meetingId];
    }

    function getMeetingsByHost(address host)
        external view returns (string[] memory)
    {
        return hostMeetings[host];
    }

    function getMeetingParticipants(string calldata meetingId)
        external view returns (address[] memory)
    {
        return meetingParticipants[meetingId];
    }
}
