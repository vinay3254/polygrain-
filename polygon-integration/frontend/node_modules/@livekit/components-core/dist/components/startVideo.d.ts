import type { Room } from 'livekit-client';
import { roomVideoPlaybackAllowedObservable } from '../observables/room';
export declare function setupStartVideo(): {
    className: string;
    roomVideoPlaybackAllowedObservable: typeof roomVideoPlaybackAllowedObservable;
    handleStartVideoPlayback: (room: Room) => Promise<void>;
};
//# sourceMappingURL=startVideo.d.ts.map