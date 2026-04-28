export type Styles = {
  'lk-audio-bar': string;
  'lk-audio-bar-visualizer': string;
  'lk-audio-visualizer': string;
  'lk-connection-quality': string;
  'lk-focus-toggle-button': string;
  'lk-highlighted': string;
  'lk-participant-media-audio': string;
  'lk-participant-media-video': string;
  'lk-participant-metadata': string;
  'lk-participant-metadata-item': string;
  'lk-participant-name': string;
  'lk-participant-placeholder': string;
  'lk-participant-tile': string;
  'lk-track-muted-indicator-camera': string;
  'lk-track-muted-indicator-microphone': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
