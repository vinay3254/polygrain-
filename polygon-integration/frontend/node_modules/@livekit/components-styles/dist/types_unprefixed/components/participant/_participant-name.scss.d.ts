export type Styles = {
  'participant-name': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
