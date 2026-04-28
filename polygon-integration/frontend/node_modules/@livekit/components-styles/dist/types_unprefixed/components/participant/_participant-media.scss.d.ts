export type Styles = {
  'participant-media-audio': string;
  'participant-media-video': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
