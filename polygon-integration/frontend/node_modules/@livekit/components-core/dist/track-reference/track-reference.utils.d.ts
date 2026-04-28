import type { Track } from 'livekit-client';
import type { PinState } from '../types';
import type { TrackReferenceOrPlaceholder } from './track-reference.types';
/**
 * Returns a id to identify the `TrackReference` or `TrackReferencePlaceholder` based on
 * participant, track source and trackSid.
 * @remarks
 * The id pattern is: `${participantIdentity}_${trackSource}_${trackSid}` for `TrackReference`
 * and `${participantIdentity}_${trackSource}_placeholder` for `TrackReferencePlaceholder`.
 */
export declare function getTrackReferenceId(trackReference: TrackReferenceOrPlaceholder | number): string;
export type TrackReferenceId = ReturnType<typeof getTrackReferenceId>;
/** Returns the Source of the TrackReference. */
export declare function getTrackReferenceSource(trackReference: TrackReferenceOrPlaceholder): Track.Source;
export declare function isEqualTrackRef(a?: TrackReferenceOrPlaceholder, b?: TrackReferenceOrPlaceholder): boolean;
/**
 * Check if the `TrackReference` is pinned.
 */
export declare function isTrackReferencePinned(trackReference: TrackReferenceOrPlaceholder, pinState: PinState | undefined): boolean;
/**
 * Check if the current `currentTrackRef` is the placeholder for next `nextTrackRef`.
 * Based on the participant identity and the source.
 * @internal
 */
export declare function isPlaceholderReplacement(currentTrackRef: TrackReferenceOrPlaceholder, nextTrackRef: TrackReferenceOrPlaceholder): boolean;
//# sourceMappingURL=track-reference.utils.d.ts.map