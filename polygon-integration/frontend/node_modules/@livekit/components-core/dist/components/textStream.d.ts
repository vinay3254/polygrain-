import { type Room, type TextStreamInfo } from 'livekit-client';
import { type Observable } from 'rxjs';
export interface TextStreamData {
    text: string;
    participantInfo: {
        identity: string;
    };
    streamInfo: TextStreamInfo;
}
export declare function setupTextStream(room: Room, topic: string): Observable<TextStreamData[]>;
//# sourceMappingURL=textStream.d.ts.map