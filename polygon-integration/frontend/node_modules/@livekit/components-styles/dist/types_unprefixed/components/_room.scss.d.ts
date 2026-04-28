export type Styles = {
  'form-control': string;
  list: string;
  'room-container': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
