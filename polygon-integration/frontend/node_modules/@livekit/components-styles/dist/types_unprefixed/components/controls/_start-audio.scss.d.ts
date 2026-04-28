export type Styles = {
  button: string;
  'button-group': string;
  'button-group-menu': string;
  'button-menu': string;
  'start-audio-button': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
