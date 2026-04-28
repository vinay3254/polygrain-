import type { Participant } from 'livekit-client';
import type { TrackReferenceOrPlaceholder } from '../track-reference';
export declare function sortParticipantsByAudioLevel(a: Pick<Participant, 'audioLevel'>, b: Pick<Participant, 'audioLevel'>): number;
export declare function sortParticipantsByIsSpeaking(a: Pick<Participant, 'isSpeaking'>, b: Pick<Participant, 'isSpeaking'>): number;
export declare function sortParticipantsByLastSpokenAT(a: Pick<Participant, 'lastSpokeAt'>, b: Pick<Participant, 'lastSpokeAt'>): number;
export declare function sortParticipantsByJoinedAt(a: Pick<Participant, 'joinedAt'>, b: Pick<Participant, 'joinedAt'>): number;
export declare function sortTrackReferencesByType(a: TrackReferenceOrPlaceholder, b: TrackReferenceOrPlaceholder): 0 | 1 | -1;
/** TrackReference with screen share source goes first. */
export declare function sortTrackReferencesByScreenShare(a: TrackReferenceOrPlaceholder, b: TrackReferenceOrPlaceholder): number;
export declare function sortTrackRefsByIsCameraEnabled(a: {
    participant: {
        isCameraEnabled: boolean;
    };
}, b: {
    participant: {
        isCameraEnabled: boolean;
    };
}): 0 | 1 | -1;
//# sourceMappingURL=base-sort-functions.d.ts.map