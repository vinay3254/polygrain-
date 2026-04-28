export type Styles = {
  'track-muted-indicator-camera': string;
  'track-muted-indicator-microphone': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
