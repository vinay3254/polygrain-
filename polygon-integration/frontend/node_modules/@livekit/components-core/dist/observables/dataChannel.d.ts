import { type ChatMessage, type DataPublishOptions, type LocalParticipant, type Participant, type Room, type SendTextOptions } from 'livekit-client';
import { Observable } from 'rxjs';
import { ReceivedChatMessage } from '../components/chat';
export declare const DataTopic: {
    readonly CHAT: "lk.chat";
    readonly TRANSCRIPTION: "lk.transcription";
};
/** @deprecated */
export declare const LegacyDataTopic: {
    readonly CHAT: "lk-chat-topic";
};
/** Publish data from the LocalParticipant. */
export declare function sendMessage(localParticipant: LocalParticipant, payload: Uint8Array, options?: DataPublishOptions): Promise<void>;
export interface BaseDataMessage<T extends string | undefined> {
    topic?: T;
    payload: Uint8Array;
}
export interface ReceivedDataMessage<T extends string | undefined = string> extends BaseDataMessage<T> {
    from?: Participant;
}
export declare function setupDataMessageHandler<T extends string>(room: Room, topic?: T | [T, ...T[]], onMessage?: (msg: ReceivedDataMessage<T>) => void): {
    messageObservable: Observable<{
        payload: Uint8Array<ArrayBufferLike>;
        topic: T;
        from: import("livekit-client").RemoteParticipant | undefined;
    }>;
    isSendingObservable: Observable<boolean>;
    send: (payload: Uint8Array, options?: DataPublishOptions) => Promise<void>;
};
export declare function setupChatMessageHandler(room: Room): {
    chatObservable: Observable<[message: ChatMessage, participant?: LocalParticipant | import("livekit-client").RemoteParticipant | undefined]>;
    send: (text: string, options: SendTextOptions) => Promise<ReceivedChatMessage>;
    edit: (text: string, originalMsg: ChatMessage) => Promise<{
        readonly message: string;
        readonly editTimestamp: number;
        readonly id: string;
        readonly timestamp: number;
        readonly attachedFiles?: Array<File>;
    }>;
};
//# sourceMappingURL=dataChannel.d.ts.map