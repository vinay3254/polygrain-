export type Styles = {
  'lk-button': string;
  'lk-button-group': string;
  'lk-button-group-menu': string;
  'lk-button-menu': string;
  'lk-chat-toggle': string;
  'lk-device-menu': string;
  'lk-device-menu-heading': string;
  'lk-disconnect-button': string;
  'lk-media-device-select': string;
  'lk-pagination-control': string;
  'lk-pagination-count': string;
  'lk-pagination-indicator': string;
  'lk-start-audio-button': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
