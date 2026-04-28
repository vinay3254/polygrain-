import type { ParticipantPermission } from '@livekit/protocol';
import { Participant, RemoteParticipant, Room, TrackPublication, ParticipantEvent, RoomEvent, type ParticipantEventCallbacks } from 'livekit-client';
import { Observable } from 'rxjs';
import type { TrackReferenceOrPlaceholder } from '../track-reference';
import type { ParticipantIdentifier, TrackIdentifier } from '../types';
export declare function observeParticipantEvents<T extends Participant>(participant: T, ...events: ParticipantEvent[]): Observable<T>;
export interface ParticipantMedia<T extends Participant = Participant> {
    isCameraEnabled: boolean;
    isMicrophoneEnabled: boolean;
    isScreenShareEnabled: boolean;
    microphoneTrack?: TrackPublication;
    cameraTrack?: TrackPublication;
    participant: T;
}
export declare function observeParticipantMedia<T extends Participant>(participant: T): Observable<ParticipantMedia<T>>;
export declare function createTrackObserver(participant: Participant, options: TrackIdentifier): Observable<{
    publication: TrackPublication | undefined;
}>;
export declare function participantInfoObserver(participant?: Participant): Observable<{
    name: string | undefined;
    identity: string;
    metadata: string | undefined;
} | {
    name: string | undefined;
    identity: string;
    metadata: string | undefined;
}> | undefined;
export declare function createConnectionQualityObserver(participant: Participant): Observable<import("livekit-client").ConnectionQuality>;
export declare function participantEventSelector<T extends ParticipantEvent>(participant: Participant, event: T): Observable<Parameters<ParticipantEventCallbacks[Extract<T, keyof ParticipantEventCallbacks>]>>;
export declare function mutedObserver(trackRef: TrackReferenceOrPlaceholder): Observable<boolean>;
export declare function createIsSpeakingObserver(participant: Participant): Observable<boolean>;
type ConnectedParticipantsObserverOptions = {
    additionalRoomEvents?: RoomEvent[];
};
export declare function connectedParticipantsObserver(room: Room, options?: ConnectedParticipantsObserverOptions): Observable<RemoteParticipant[]>;
export type ConnectedParticipantObserverOptions = {
    additionalEvents?: ParticipantEvent[];
};
export declare function connectedParticipantObserver(room: Room, identity: string, options?: ConnectedParticipantObserverOptions): Observable<RemoteParticipant | undefined>;
export declare function participantPermissionObserver(participant: Participant): Observable<ParticipantPermission | undefined>;
export declare function participantByIdentifierObserver(room: Room, { kind, identity }: ParticipantIdentifier, options?: ConnectedParticipantObserverOptions): Observable<RemoteParticipant | undefined>;
export declare function participantAttributesObserver(participant: Participant): Observable<{
    changed: Readonly<Record<string, string>>;
    attributes: Readonly<Record<string, string>>;
}>;
export declare function participantAttributesObserver(participant: undefined): Observable<{
    changed: undefined;
    attributes: undefined;
}>;
export {};
//# sourceMappingURL=participant.d.ts.map