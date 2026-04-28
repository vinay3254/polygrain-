/**
 * Internal test function.
 *
 * @internal
 */
import { Track } from 'livekit-client';
import type { UpdatableItem } from '../sorting/tile-array-update';
import type { TrackReference, TrackReferencePlaceholder } from './track-reference.types';
export declare const mockTrackReferencePlaceholder: (id: string, source: Track.Source) => TrackReferencePlaceholder;
export declare const mockTrackReferencePublished: (id: string, source: Track.Source) => TrackReference;
type mockTrackReferenceSubscribedOptions = {
    mockPublication?: boolean;
    mockParticipant?: boolean;
    mockIsLocal?: boolean;
};
export declare const mockTrackReferenceSubscribed: (id: string, source: Track.Source, options?: mockTrackReferenceSubscribedOptions) => TrackReference;
export declare function flatTrackReferenceArray<T extends UpdatableItem>(list: T[]): string[];
export {};
//# sourceMappingURL=test-utils.d.ts.map