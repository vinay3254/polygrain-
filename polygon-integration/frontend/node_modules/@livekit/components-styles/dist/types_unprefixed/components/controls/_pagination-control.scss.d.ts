export type Styles = {
  button: string;
  'pagination-control': string;
  'pagination-count': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
