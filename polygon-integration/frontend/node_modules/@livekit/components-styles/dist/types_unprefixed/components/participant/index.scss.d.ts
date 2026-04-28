export type Styles = {
  'audio-bar': string;
  'audio-bar-visualizer': string;
  'audio-visualizer': string;
  'connection-quality': string;
  'focus-toggle-button': string;
  highlighted: string;
  'participant-media-audio': string;
  'participant-media-video': string;
  'participant-metadata': string;
  'participant-metadata-item': string;
  'participant-name': string;
  'participant-placeholder': string;
  'participant-tile': string;
  'track-muted-indicator-camera': string;
  'track-muted-indicator-microphone': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
