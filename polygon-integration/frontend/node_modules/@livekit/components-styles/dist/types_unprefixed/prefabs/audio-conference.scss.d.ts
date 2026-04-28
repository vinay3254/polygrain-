export type Styles = {
  'audio-conference': string;
  'audio-conference-stage': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
