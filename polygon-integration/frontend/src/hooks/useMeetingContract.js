// frontend/src/hooks/useMeetingContract.js
// ethers.js v6 hook for the full MeetingRegistry lifecycle.
import { useState, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';
import contractData from '../contracts/MeetingRegistry.json';
import { pinJSON, fetchJSON } from '../utils/ipfs';
import { useWallet } from '../context/WalletContext';

/**
 * useMeetingContract — ethers.js v6 hook for the MeetingRegistry smart contract.
 * Uses the signer from WalletContext so a single MetaMask connection powers everything.
 */
export function useMeetingContract() {
  const { signer, account: walletAddress } = useWallet();

  const [isTxPending, setIsTxPending] = useState(false);
  const [txHash,      setTxHash]      = useState(null);
  const [error,       setError]       = useState(null);

  // Signer-backed contract — rebuilt whenever the signer changes
  const signerContract = useMemo(() => {
    if (!signer) return null;
    return new ethers.Contract(contractData.address, contractData.abi, signer);
  }, [signer]);

  // ── Internal helpers ──────────────────────────────────────────────────────

  const getReadOnlyContract = useCallback(() => {
    if (!window.ethereum) throw new Error('MetaMask not installed');
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(contractData.address, contractData.abi, provider);
  }, []);

  // ── createMeeting ─────────────────────────────────────────────────────────

  const createMeeting = useCallback(async (roomCode, metadata) => {
    if (!signerContract) { setError('Wallet not connected.'); return null; }
    setIsTxPending(true); setTxHash(null); setError(null);
    try {
      const meta = metadata || { title: roomCode, hostAddress: walletAddress, roomCode, createdAt: Date.now() };
      const cid = await pinJSON(meta);
      const tx  = await signerContract.createMeeting(roomCode, cid);
      setTxHash(tx.hash);
      return await tx.wait(1);
    } catch (err) {
      setError(err.reason || err.shortMessage || err.message || 'createMeeting failed');
      return null;
    } finally { setIsTxPending(false); }
  }, [signerContract, walletAddress]);

  // ── joinMeeting ───────────────────────────────────────────────────────────

  const joinMeeting = useCallback(async (roomCode) => {
    if (!signerContract) { setError('Wallet not connected.'); return null; }
    setIsTxPending(true); setError(null);
    try {
      const tx = await signerContract.joinMeeting(roomCode);
      setTxHash(tx.hash);
      return await tx.wait(1);
    } catch (err) {
      setError(err.reason || err.shortMessage || err.message || 'joinMeeting failed');
      return null;
    } finally { setIsTxPending(false); }
  }, [signerContract]);

  // ── sendMessage ───────────────────────────────────────────────────────────

  const sendMessage = useCallback(async (roomCode, text) => {
    if (!signerContract) { setError('Wallet not connected.'); return null; }
    setError(null);
    try {
      const cid = await pinJSON({
        text,
        sender:    walletAddress,
        timestamp: Math.floor(Date.now() / 1000),
      });
      const tx = await signerContract.sendMessage(roomCode, cid);
      await tx.wait(1);
      return cid;
    } catch (err) {
      setError(err.reason || err.shortMessage || err.message || 'sendMessage failed');
      return null;
    }
  }, [signerContract, walletAddress]);

  // ── endMeeting ────────────────────────────────────────────────────────────

  const endMeeting = useCallback(async (roomCode, notesHash) => {
    if (!signerContract) { setError('Wallet not connected.'); return null; }
    setIsTxPending(true); setTxHash(null); setError(null);
    try {
      const tx = await signerContract.endMeeting(roomCode, notesHash || ethers.ZeroHash);
      setTxHash(tx.hash);
      return await tx.wait(1);
    } catch (err) {
      setError(err.reason || err.shortMessage || err.message || 'endMeeting failed');
      return null;
    } finally { setIsTxPending(false); }
  }, []);

  // ── pollEvents ────────────────────────────────────────────────────────────

  /**
   * Fetch ParticipantJoined and MessageSent events for a room since fromBlock.
   * For MessageSent: fetches IPFS content per CID (retries once; null → placeholder).
   *
   * @param {string} roomCode
   * @param {number} fromBlock - Block number to start from (use 0 for localhost)
   * @returns {Promise<{ participants: Array, messages: Array }>}
   */
  const pollEvents = useCallback(async (roomCode, fromBlock) => {
    if (!window.ethereum) return { participants: [], messages: [] };
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const iface    = new ethers.Interface(contractData.abi);

      // Indexed strings are stored as keccak256(toUtf8Bytes(value)) in event topics
      const roomCodeHash = ethers.id(roomCode);

      const logs = await provider.getLogs({
        address: contractData.address,
        topics: [
          // topic[0]: OR-filter for either event signature
          [
            iface.getEvent('ParticipantJoined').topicHash,
            iface.getEvent('MessageSent').topicHash,
          ],
          // topic[1]: first indexed param = meetingId (keccak256 of string)
          roomCodeHash,
        ],
        fromBlock,
        toBlock: 'latest',
      });

      const participants = [];
      const messages     = [];

      for (const log of logs) {
        const parsed = iface.parseLog(log);
        if (parsed.name === 'ParticipantJoined') {
          participants.push({
            address:     parsed.args.participant,
            blockNumber: log.blockNumber,
          });
        } else if (parsed.name === 'MessageSent') {
          const content = await fetchJSON(parsed.args.contentCID);
          messages.push({
            sender:      parsed.args.sender,
            cid:         parsed.args.contentCID,
            text:        content?.text ?? '[content unavailable]',
            timestamp:   content?.timestamp ?? log.blockNumber,
            blockNumber: log.blockNumber,
          });
        }
      }

      return { participants, messages };
    } catch (err) {
      setError(err.message || 'pollEvents failed');
      return { participants: [], messages: [] };
    }
  }, []);

  // ── Read functions ────────────────────────────────────────────────────────

  const getMeeting = useCallback(async (meetingId) => {
    try {
      const contract = getReadOnlyContract();
      const raw      = await contract.getMeeting(meetingId);
      return {
        meetingId:        raw.meetingId,
        host:             raw.host,
        startTime:        Number(raw.startTime),
        endTime:          Number(raw.endTime),
        participantCount: Number(raw.participantCount),
        notesHash:        raw.notesHash,
        metadataCID:      raw.metadataCID,
      };
    } catch (err) {
      setError(err.message || 'Failed to read meeting data');
      return null;
    }
  }, [getReadOnlyContract]);

  const getMeetingsByHost = useCallback(async (hostAddress) => {
    try {
      const contract = getReadOnlyContract();
      return [...(await contract.getMeetingsByHost(hostAddress))];
    } catch (err) {
      setError(err.message || 'Failed to read host meetings');
      return [];
    }
  }, [getReadOnlyContract]);

  const hashNotes = useCallback((notesString) => {
    if (!notesString || notesString.trim() === '') return ethers.ZeroHash;
    return ethers.keccak256(ethers.toUtf8Bytes(notesString));
  }, []);

  return {
    walletAddress, isTxPending, txHash, error,
    createMeeting,
    joinMeeting,
    sendMessage,
    endMeeting,
    pollEvents,
    getMeeting,
    getMeetingsByHost,
    hashNotes,
  };
}
