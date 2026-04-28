export type Styles = {
  'audio-bar': string;
  'audio-bar-visualizer': string;
  'audio-visualizer': string;
  button: string;
  'button-group': string;
  'button-group-menu': string;
  'button-menu': string;
  carousel: string;
  'chat-toggle': string;
  'connection-quality': string;
  'device-menu': string;
  'device-menu-heading': string;
  'disconnect-button': string;
  'focus-layout': string;
  'focus-toggle-button': string;
  'focused-participant': string;
  'form-control': string;
  'grid-layout': string;
  highlighted: string;
  list: string;
  'lk-rotate': string;
  'media-device-select': string;
  'pagination-control': string;
  'pagination-count': string;
  'pagination-indicator': string;
  'participant-media-audio': string;
  'participant-media-video': string;
  'participant-metadata': string;
  'participant-metadata-item': string;
  'participant-name': string;
  'participant-placeholder': string;
  'participant-tile': string;
  'pip-track': string;
  'room-container': string;
  spinner: string;
  'start-audio-button': string;
  toast: string;
  'track-muted-indicator-camera': string;
  'track-muted-indicator-microphone': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
