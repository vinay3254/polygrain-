export type Styles = {
  'lk-audio-container': string;
  'lk-button': string;
  'lk-button-group': string;
  'lk-button-group-container': string;
  'lk-camera-off-note': string;
  'lk-form-control': string;
  'lk-join-button': string;
  'lk-list': string;
  'lk-prejoin': string;
  'lk-username-container': string;
  'lk-video-container': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
