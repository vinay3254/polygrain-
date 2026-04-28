export type Styles = {
  'connection-quality': string;
  'focus-toggle-button': string;
  'participant-metadata': string;
  'participant-metadata-item': string;
  'participant-placeholder': string;
  'participant-tile': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
