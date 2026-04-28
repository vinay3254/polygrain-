export type Styles = {
  'focus-layout-wrapper': string;
  'grid-layout-wrapper': string;
  'settings-menu-modal': string;
  'video-conference': string;
  'video-conference-inner': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
