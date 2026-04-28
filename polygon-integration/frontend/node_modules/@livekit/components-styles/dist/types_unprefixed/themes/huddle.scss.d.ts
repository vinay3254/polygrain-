export type Styles = {
  button: string;
  'disconnect-button': string;
  'join-button': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
