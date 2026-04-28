export type Styles = {
  button: string;
  'device-menu': string;
  'device-menu-heading': string;
  'media-device-select': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
