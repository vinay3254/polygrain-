/**
 * @public
 * Represents the user's choices for video and audio input devices,
 * as well as their username.
 */
export type LocalUserChoices = {
    /**
     * Whether video input is enabled.
     * @defaultValue `true`
     */
    videoEnabled: boolean;
    /**
     * Whether audio input is enabled.
     * @defaultValue `true`
     */
    audioEnabled: boolean;
    /**
     * The device ID of the video input device to use.
     * @defaultValue `''`
     */
    videoDeviceId: string;
    /**
     * The device ID of the audio input device to use.
     * @defaultValue `''`
     */
    audioDeviceId: string;
    /**
     * The username to use.
     * @defaultValue `''`
     */
    username: string;
};
export declare const defaultUserChoices: LocalUserChoices;
/**
 * Saves user choices to local storage.
 * @alpha
 */
export declare function saveUserChoices(userChoices: LocalUserChoices, 
/**
 * Whether to prevent saving user choices to local storage.
 */
preventSave?: boolean): void;
/**
 * Reads the user choices from local storage, or returns the default settings if none are found.
 * @remarks
 * The deprecated parameters `e2ee` and `sharedPassphrase` are not read from local storage
 * and always return the value from the passed `defaults` or internal defaults.
 * @alpha
 */
export declare function loadUserChoices(defaults?: Partial<LocalUserChoices>, 
/**
 * Whether to prevent loading from local storage and return default values instead.
 * @defaultValue false
 */
preventLoad?: boolean): LocalUserChoices;
//# sourceMappingURL=user-choices.d.ts.map