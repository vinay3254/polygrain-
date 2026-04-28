import { type LocalAudioTrack, type LocalVideoTrack, type Room } from 'livekit-client';
export type SetMediaDeviceOptions = {
    /**
     *  If true, adds an `exact` constraint to the getUserMedia request.
     *  The request will fail if this option is true and the device specified is not actually available
     */
    exact?: boolean;
};
export declare function setupDeviceSelector(kind: MediaDeviceKind, room: Room, localTrack?: LocalAudioTrack | LocalVideoTrack): {
    className: string;
    activeDeviceObservable: import("rxjs").Observable<string>;
    setActiveMediaDevice: (id: string, options?: SetMediaDeviceOptions) => Promise<void>;
};
//# sourceMappingURL=mediaDeviceSelect.d.ts.map