/**
 * The TrackReference type is a logical grouping of participant publication and/or subscribed track.
 *
 */
import type { Participant, Track, TrackPublication } from 'livekit-client';
/** @public */
export type TrackReferencePlaceholder = {
    participant: Participant;
    publication?: never;
    source: Track.Source;
};
/** @public */
export type TrackReference = {
    participant: Participant;
    publication: TrackPublication;
    source: Track.Source;
};
/** @public */
export type TrackReferenceOrPlaceholder = TrackReference | TrackReferencePlaceholder;
/** @internal */
export declare function isTrackReference(trackReference: unknown): trackReference is TrackReference;
export declare function isTrackReferencePlaceholder(trackReference?: TrackReferenceOrPlaceholder): trackReference is TrackReferencePlaceholder;
//# sourceMappingURL=track-reference.types.d.ts.map