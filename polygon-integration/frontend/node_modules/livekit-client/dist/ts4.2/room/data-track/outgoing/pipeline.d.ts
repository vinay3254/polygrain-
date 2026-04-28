import type { Throws } from '@livekit/throws-transformer/throws';
import type { BaseE2EEManager } from '../../../e2ee/E2eeManager';
import type { DataTrackFrameInternal } from '../frame';
import { DataTrackPacket } from '../packet';
import type { DataTrackInfo } from '../types';
import { DataTrackOutgoingPipelineError, DataTrackOutgoingPipelineErrorReason } from './errors';
type Options = {
    info: DataTrackInfo;
    e2eeManager: BaseE2EEManager | null;
};
/** Processes outgoing frames into final packets for distribution to the SFU. */
export default class DataTrackOutgoingPipeline {
    private e2eeManager;
    private packetizer;
    /** Maximum transmission unit (MTU) of the transport. */
    private static TRANSPORT_MTU_BYTES;
    constructor(options: Options);
    updateE2eeManager(e2eeManager: BaseE2EEManager | null): void;
    processFrame(frame: DataTrackFrameInternal): Throws<AsyncGenerator<DataTrackPacket>, DataTrackOutgoingPipelineError>;
    encryptIfNeeded(frame: DataTrackFrameInternal): Promise<Throws<DataTrackFrameInternal, DataTrackOutgoingPipelineError<DataTrackOutgoingPipelineErrorReason.Encryption>>>;
}
export {};
//# sourceMappingURL=pipeline.d.ts.map
