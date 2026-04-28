export type Styles = {
  'lk-agent-control-bar': string;
  'lk-audio-bar': string;
  'lk-audio-bar-visualizer': string;
  'lk-control-bar': string;
  'lk-highlighted': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
