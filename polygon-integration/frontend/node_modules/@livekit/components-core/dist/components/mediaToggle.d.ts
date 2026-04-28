import type { AudioCaptureOptions, Room, ScreenShareCaptureOptions, TrackPublishOptions, VideoCaptureOptions } from 'livekit-client';
import { Track } from 'livekit-client';
import type { Observable } from 'rxjs';
export type CaptureOptionsBySource<T extends ToggleSource> = T extends Track.Source.Camera ? VideoCaptureOptions : T extends Track.Source.Microphone ? AudioCaptureOptions : T extends Track.Source.ScreenShare ? ScreenShareCaptureOptions : never;
export type MediaToggleType<T extends ToggleSource> = {
    pendingObserver: Observable<boolean>;
    toggle: (forceState?: boolean, captureOptions?: CaptureOptionsBySource<T>) => Promise<boolean | undefined>;
    className: string;
    enabledObserver: Observable<boolean>;
};
export type ToggleSource = Exclude<Track.Source, Track.Source.ScreenShareAudio | Track.Source.Unknown>;
export declare function setupMediaToggle<T extends ToggleSource>(source: T, room: Room, options?: CaptureOptionsBySource<T>, publishOptions?: TrackPublishOptions, onError?: (error: Error) => void): MediaToggleType<T>;
export declare function setupManualToggle(): {
    className: string;
    toggle: (forceState?: boolean) => Promise<void>;
    enabledObserver: Observable<boolean>;
    pendingObserver: Observable<boolean>;
};
//# sourceMappingURL=mediaToggle.d.ts.map