export type Styles = {
  'agent-control-bar': string;
  'audio-bar': string;
  'audio-bar-visualizer': string;
  'control-bar': string;
  highlighted: string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
