import type { TrackReferenceOrPlaceholder } from '../track-reference';
/**
 * Default sort for `TrackReferenceOrPlaceholder`, it'll order participants by:
 * 1. local camera track (publication.isLocal)
 * 2. remote screen_share track
 * 3. local screen_share track
 * 4. remote dominant speaker camera track (sorted by speaker with the loudest audio level)
 * 5. other remote speakers that are recently active
 * 6. remote unmuted camera tracks
 * 7. remote tracks sorted by joinedAt
 */
export declare function sortTrackReferences(tracks: TrackReferenceOrPlaceholder[]): TrackReferenceOrPlaceholder[];
//# sourceMappingURL=sort-track-bundles.d.ts.map