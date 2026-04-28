import type { Participant } from 'livekit-client';
export declare function setupParticipantName(participant: Participant): {
    className: string;
    infoObserver: import("rxjs").Observable<{
        name: string | undefined;
        identity: string;
        metadata: string | undefined;
    } | {
        name: string | undefined;
        identity: string;
        metadata: string | undefined;
    }> | undefined;
};
//# sourceMappingURL=participantName.d.ts.map