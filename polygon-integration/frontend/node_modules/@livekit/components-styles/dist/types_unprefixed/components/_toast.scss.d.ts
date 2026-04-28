export type Styles = {
  'lk-rotate': string;
  spinner: string;
  toast: string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
