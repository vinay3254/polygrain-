export type Styles = {
  'audio-bar': string;
  'audio-bar-visualizer': string;
  'audio-visualizer': string;
  highlighted: string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
