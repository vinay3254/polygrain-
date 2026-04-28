import type { Room, SendTextOptions } from 'livekit-client';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage, ReceivedChatMessage } from '../messages/types';
/** @public */
export type { ChatMessage, ReceivedChatMessage };
export interface LegacyChatMessage extends ChatMessage {
    ignoreLegacy?: boolean;
}
export interface LegacyReceivedChatMessage extends ReceivedChatMessage {
    ignoreLegacy?: boolean;
}
/**
 * @public
 * @deprecated the new chat API doesn't rely on encoders and decoders anymore and uses a dedicated chat API instead
 */
export type MessageEncoder = (message: LegacyChatMessage) => Uint8Array;
/**
 * @public
 * @deprecated the new chat API doesn't rely on encoders and decoders anymore and uses a dedicated chat API instead
 */
export type MessageDecoder = (message: Uint8Array) => LegacyReceivedChatMessage;
/** @public */
export type ChatOptions = {
    /** @deprecated the new chat API doesn't rely on encoders and decoders anymore and uses a dedicated chat API instead */
    messageEncoder?: (message: LegacyChatMessage) => Uint8Array;
    /** @deprecated the new chat API doesn't rely on encoders and decoders anymore and uses a dedicated chat API instead */
    messageDecoder?: (message: Uint8Array) => LegacyReceivedChatMessage;
    channelTopic?: string;
    /** @deprecated the new chat API doesn't rely on update topics anymore and uses a dedicated chat API instead */
    updateChannelTopic?: string;
};
export declare function setupChat(room: Room, options?: ChatOptions): {
    messageObservable: import("rxjs").Observable<ReceivedChatMessage[]>;
    isSendingObservable: BehaviorSubject<boolean>;
    send: (message: string, options?: SendTextOptions) => Promise<ReceivedChatMessage>;
};
//# sourceMappingURL=chat.d.ts.map