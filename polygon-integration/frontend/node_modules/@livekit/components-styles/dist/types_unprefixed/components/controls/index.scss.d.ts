export type Styles = {
  button: string;
  'button-group': string;
  'button-group-menu': string;
  'button-menu': string;
  'chat-toggle': string;
  'device-menu': string;
  'device-menu-heading': string;
  'disconnect-button': string;
  'media-device-select': string;
  'pagination-control': string;
  'pagination-count': string;
  'pagination-indicator': string;
  'start-audio-button': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
