export type Styles = {
  'grid-layout': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
