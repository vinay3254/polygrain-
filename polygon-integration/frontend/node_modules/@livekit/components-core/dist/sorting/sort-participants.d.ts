import type { Participant } from 'livekit-client';
/**
 * Default sort for participants, it'll order participants by:
 * 1. local participant
 * 2. dominant speaker (speaker with the loudest audio level)
 * 3. other speakers that are recently active
 * 4. participants with video on
 * 5. by joinedAt
 */
export declare function sortParticipants(participants: Participant[]): Participant[];
//# sourceMappingURL=sort-participants.d.ts.map