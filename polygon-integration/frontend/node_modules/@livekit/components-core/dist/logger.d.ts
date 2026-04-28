import { setLogLevel as setClientSdkLogLevel } from 'livekit-client';
import loglevel from 'loglevel';
export declare const log: loglevel.Logger;
type LogLevel = Parameters<typeof setClientSdkLogLevel>[0];
type SetLogLevelOptions = {
    liveKitClientLogLevel?: LogLevel;
};
/**
 * Set the log level for both the `@livekit/components-react` package and the `@livekit-client` package.
 * To set the `@livekit-client` log independently, use the `liveKitClientLogLevel` prop on the `options` object.
 * @public
 */
export declare function setLogLevel(level: LogLevel, options?: SetLogLevelOptions): void;
type LogExtension = (level: LogLevel, msg: string, context?: object) => void;
type SetLogExtensionOptions = {
    liveKitClientLogExtension?: LogExtension;
};
/**
 * Set the log extension for both the `@livekit/components-react` package and the `@livekit-client` package.
 * To set the `@livekit-client` log extension, use the `liveKitClientLogExtension` prop on the `options` object.
 * @public
 */
export declare function setLogExtension(extension: LogExtension, options?: SetLogExtensionOptions): void;
export {};
//# sourceMappingURL=logger.d.ts.map