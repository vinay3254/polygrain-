import type { TrackIdentifier } from '../types';
export declare function setupMediaTrack(trackIdentifier: TrackIdentifier): {
    className: string;
    trackObserver: import("rxjs").Observable<import("livekit-client").TrackPublication | undefined>;
};
export declare function getTrackByIdentifier(options: TrackIdentifier): import("livekit-client").TrackPublication | undefined;
//# sourceMappingURL=mediaTrack.d.ts.map