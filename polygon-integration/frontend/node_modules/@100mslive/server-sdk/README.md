<a href="https://100ms.live/">
  <img src="https://user-images.githubusercontent.com/93931528/205858417-8c0a0d1b-2d46-4710-9316-7418092fd3d6.svg" width="200" />
</a>

[![Documentation](https://img.shields.io/badge/Read-Documentation-blue)](https://www.100ms.live/docs/server-side/v2/introduction/basics)
[![Discord](https://img.shields.io/discord/843749923060711464?label=Join%20on%20Discord)](https://100ms.live/discord)
![MIT License](https://img.shields.io/badge/license-MIT-blue)
[![Register](https://img.shields.io/badge/Contact-Know%20More-blue)](https://dashboard.100ms.live/register)

# Node.js Server Side SDK

The 100ms Node.js SDK provides an easy-to-use wrapper around [100ms REST APIs](https://www.100ms.live/docs/server-side/v2/introduction/request-and-response) to be used on the server side.

🔧 **This is beta, APIs might change**

## Documentation

Checkout the [`examples/nodejs`](https://github.com/100mslive/server-sdks/tree/main/examples/nodejs) folder on root of the repository has some examples on how to use the SDK.

## Installation

Install the package with:

```
# via NPM:
npm install --save @100mslive/server-sdk

# via Yarn:
yarn add @100mslive/server-sdk
```

## Usage

First import the library,

```js
import HMS from "@100mslive/server-sdk";
// OR
import * as HMS from "@100mslive/server-sdk";
```

Then, the SDK needs to be configured with the **Access Key** and **App Secret** from the [100ms Dashboard's Developer Section](https://dashboard.100ms.live/developer). This can be done in 2 ways:

1. Passing in the credentials when initializing the SDK.
2. Configuring Environment variables with the credentials, then initializing the SDK.

```js
const hms = new HMS.SDK(accessKey, secret);
// OR
const hms = new HMS.SDK(); // Credentials are in env variables
```

**Environment Variables**

```
HMS_ACCESS_KEY=accessKey123 // access key
HMS_SECRET=secret456 // app secret
```

### Usage with TypeScript

The SDK supports `ts`, `esm` and `cjs` completely. Here's how you can import the types from the SDK and use them.

```ts
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// create a room with options -
let roomWithOptions: HMS.Room;
const roomCreateOptions: HMS.Room.CreateOptions = {
  name,
  description,
  template_id,
  recording_info,
  region,
};
roomWithOptions = await hms.rooms.create(roomCreateOptions);
```

### Auth token

You can generate [auth token](https://www.100ms.live/docs/concepts/v2/concepts/security-and-tokens#auth-token-for-client-sdks) for client SDKs to join a room.

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
const tokenConfig = { roomId, role, userId };
console.log(await hms.auth.getAuthToken());
// with additional token options -
const additionalTokenConfig = {
  roomId,
  role,
  userId,
  issuedAt,
  notValidBefore,
  validForSeconds,
};
console.log(await hms.auth.getAuthToken(additionalTokenConfig));
```

### Active room APIs

Here's an example of listing the peers in an active room and then sending a broadcast message to that room, using [the active room APIs](https://www.100ms.live/docs/server-side/v2/api-reference/active-rooms/object).

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// list peers in active room -
const peers = await hms.activeRooms.retrieveActivePeers(roomId);
console.log(peers);

// send broadcast message to all peers -
await hms.activeRooms.sendMessage(roomId, { message: "test" });
```

### Analytics APIs

Here's an example of listing track events and recording events, using [the analytics APIs](https://www.100ms.live/docs/server-side/v2/api-reference/analytics/overview).

```js
// list track events by room id and type -
const trackEventFilters: HMS.Analytics.TrackEvent.FilterParams = {
  room_id: "roomId",
  type: ["track.add.success", "track.remove.success"],
};
const trackEventsIterable = hms.analytics.listTrackEvents(trackEventFilters);
for await (const trackEvent of trackEventsIterable) {
  console.log(trackEvent);
}

// list recording events by room id and type -
const recordingEventFilters: HMS.Analytics.RecordingEvent.FilterParams = {
  room_id: "roomId",
  type: "beam.recording.success",
};
const recordingEventsIterable = hms.analytics.listRecordingEvents(recordingEventFilters);
for await (const recordingEvent of recordingEventsIterable) {
  console.log(recordingEvent);
}
```

### External Stream APIs

Here's an example of starting a new external stream in a room and stopping it, using [the external stream APIs](https://www.100ms.live/docs/server-side/v2/api-reference/external-streams/overview).

```js
// start a new external stream -
const externalStreamStartParams: HMS.ExternalStream.StartParams = {
  meeting_url: "meetingURL",
  rtmp_urls: ["rtmpURL1", "rtmpURL2"],
};
const newExternalStream = await hms.externalStreams.start("roomId", externalStreamStartParams);

// stop an external stream by id -
const stoppedExternalStream = await hms.externalStreams.stop(newExternalStream.id);
console.log(newExternalStream, stoppedExternalStream);
```

### Live Stream APIs

Here's an example of getting a live stream object and then sending timed metadata to that live stream, using [the live stream APIs](https://www.100ms.live/docs/server-side/v2/api-reference/live-streams/overview).

```js
// get a live stream object by its stream id -
const liveStream = await hms.liveStreams.retrieve("streamID");

// send timed metadata to that live stream -
const timedMetadataParams: HMS.LiveStream.TimedMetadataParams = {
  payload: "Hello, this is the message",
  duration: 5000,
};
const sameLiveStream = await hms.liveStreams.sendTimedMetadata(liveStream.id, timedMetadataParams);

console.log(liveStream, sameLiveStream);
```

### Recording Asset APIs

Here's an example of getting a recording asset object and then generating a pre-signed URL to access it, using [the recording asset APIs](https://www.100ms.live/docs/server-side/v2/api-reference/recording-assets/overview).

```js
// get a recording asset by id -
const recordingAsset = await hms.recordingAssets.retrieve("assetId");

// generate a pre-signed URL to access that -
const preSignedURL = await hms.recordingAssets.generatePreSignedURL(recordingAsset.id);
console.log("URL: " + preSignedURL.url);
console.log("Path: " + preSignedURL.path);
```

### Recording APIs

Here's an example of checking a room's recording and stopping it, using [the recording APIs](https://www.100ms.live/docs/server-side/v2/api-reference/recordings/overview).

```js
// check a recording's room id and stop it -
const recording = await hms.recordings.retrieve("objectID");
if (recording.room_id == "roomID") {
  hms.recordings.stop(recording.id);
} else {
  // stop all recordings in that room -
  const stoppedRecordings = await hms.recordings.stopAll("roomID");
  console.log(stoppedRecordings);
}
```

### Room code APIs

Here's an example of creating room codes for a room and then disabling one of them, using [the room code APIs](https://www.100ms.live/docs/server-side/v2/api-reference/room-codes/room-code-object).

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// create room codes -
const roomCodesForRoom = await hms.roomCodes.create(roomId);
console.log(roomCodesForRoom);

// disable a room code -
const disabledRoomCode = await hms.roomCodes.enableOrDisable(roomCodesForRoom[0].code, false);
console.log(disabledRoomCode);
```

### Room APIs

Here's an example for creating and updating a room, using [the room APIs](https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/object) in the SDK.

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// creating a room -
const room = await hms.rooms.create();
// with room options -
const roomCreateOptions = {
  name,
  description,
  template_id,
  recording_info,
  region,
};
const roomWithOptions = await hms.rooms.create(roomCreateOptions);

// updating a room -
const roomUpdateOptions = { name };
const updatedRoom = await hms.rooms.update(room.id, roomUpdateOptions);
console.log(room, roomWithOptions, updatedRoom);
```

### Session APIs

Here's an example of listing all the sessions and sessions for a particular room using [the session APIs](https://www.100ms.live/docs/server-side/v2/api-reference/Sessions/object).

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// list sessions associated with a specific room -
const sessionFilters = {
  room_id: "test_room_id",
  limit: 10, // specifies the max no. of objects in one page
  // this means `iterable.isNextCached` will be `false` once every 10 times
};
const sessionsByRoomIterable = hms.sessions.list(sessionFilters);
for await (const session of sessionsByRoomIterable) {
  console.log(session);
  if (!allSessionsIterable.isNextCached) {
    console.log("the next loop is gonna take some time");
  }
}

// get the active session in a room -
try {
  const activeSessionInRoom = hms.sessions.retrieveActiveByRoom("roomId");
  console.log(activeSessionInRoom);
} catch (error) {
  console.log("No active session found in the room!");
}
```

### Errors

Errors will follow the below interface, code is HTTP Status Code.

```ts
interface SDKException {
  code?: number;
  name: string;
  message: string;
}
```

e.g.

```js
const hlsErr = {
  code: 404,
  name: "Not Found",
  message: "hls not running",
};
```

## Currently Supported Endpoints

1. [Active Rooms APIs](https://www.100ms.live/docs/server-side/v2/api-reference/active-rooms/object)
2. [Analytics APIs](https://www.100ms.live/docs/server-side/v2/api-reference/analytics/overview)
3. [External Streams APIs](https://www.100ms.live/docs/server-side/v2/api-reference/external-streams/overview)
4. [Live Streams APIs](https://www.100ms.live/docs/server-side/v2/api-reference/live-streams/overview)
5. [Recording Assets APIs](https://www.100ms.live/docs/server-side/v2/api-reference/recording-assets/overview)
6. [Recordings APIs](https://www.100ms.live/docs/server-side/v2/api-reference/recordings/overview)
7. [Room Codes APIs](https://www.100ms.live/docs/server-side/v2/api-reference/room-codes/room-code-object)
8. [Rooms APIs](https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/object)
9. [Sessions APIs](https://www.100ms.live/docs/server-side/v2/api-reference/Sessions/object)

### Make calls to 100ms APIs that the SDK doesn't support yet

If you want to consume an endpoint before it's available in the SDK, feel free to use the `api` property to make the API calls:

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
const hmsObject = await hms.api.get(path, params);
console.log(hmsObject);
```

Here's an example of listing the enabled room codes for a room:

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
/**
 * cURL call:
 * `curl --location --request GET 'https://api.100ms.live/v2/rooms/<room_id>' --header 'Authorization: Bearer <management_token>'`
 */
const params = {}; // the request's body goes here
// appropriate header configuration (incl. management token authorization) is handled internally
const room = await hms.api.get(`rooms/${roomId}`, params);
// `room` contains the room object, mapped from response's body
console.log(room);
```

### Management token

If you want to make 100ms API calls on your own without using the `api` property of SDK, you can generate just the [management token](https://www.100ms.live/docs/concepts/v2/concepts/security-and-tokens#management-token-for-rest-api) to be used for authorization.

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
console.log(await hms.auth.getManagementToken());
// with token options -
const tokenConfig = {
  issuedAt,
  notValidBefore,
  validForSeconds,
};
console.log(await hms.auth.getManagementToken(tokenConfig));
```
