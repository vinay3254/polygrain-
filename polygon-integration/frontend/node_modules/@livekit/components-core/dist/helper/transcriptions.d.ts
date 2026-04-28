import type { TranscriptionSegment } from 'livekit-client';
export type ReceivedTranscriptionSegment = TranscriptionSegment & {
    receivedAtMediaTimestamp: number;
    receivedAt: number;
};
export declare function getActiveTranscriptionSegments(segments: ReceivedTranscriptionSegment[], syncTimes: {
    timestamp: number;
    rtpTimestamp?: number;
}, maxAge?: number): ReceivedTranscriptionSegment[];
export declare function addMediaTimestampToTranscription(segment: TranscriptionSegment, timestamps: {
    timestamp: number;
    rtpTimestamp?: number;
}): ReceivedTranscriptionSegment;
/**
 * @returns An array of unique (by id) `TranscriptionSegment`s. Latest wins. If the resulting array would be longer than `windowSize`, the array will be reduced to `windowSize` length
 */
export declare function dedupeSegments<T extends TranscriptionSegment>(prevSegments: T[], newSegments: T[], windowSize: number): T[];
export declare function didActiveSegmentsChange<T extends TranscriptionSegment>(prevActive: T[], newActive: T[]): boolean;
//# sourceMappingURL=transcriptions.d.ts.map