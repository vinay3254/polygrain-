import type { Room } from 'livekit-client';
import { roomAudioPlaybackAllowedObservable } from '../observables/room';
export declare function setupStartAudio(): {
    className: string;
    roomAudioPlaybackAllowedObservable: typeof roomAudioPlaybackAllowedObservable;
    handleStartAudioPlayback: (room: Room) => Promise<void>;
};
//# sourceMappingURL=startAudio.d.ts.map