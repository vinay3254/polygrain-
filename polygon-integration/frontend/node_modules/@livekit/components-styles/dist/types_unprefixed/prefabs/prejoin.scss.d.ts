export type Styles = {
  'audio-container': string;
  button: string;
  'button-group': string;
  'button-group-container': string;
  'camera-off-note': string;
  'form-control': string;
  'join-button': string;
  list: string;
  prejoin: string;
  'username-container': string;
  'video-container': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
