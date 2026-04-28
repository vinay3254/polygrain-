export type Styles = {
  'agent-control-bar': string;
  'audio-bar': string;
  'audio-bar-visualizer': string;
  'audio-conference': string;
  'audio-conference-stage': string;
  'audio-container': string;
  button: string;
  'button-group': string;
  'button-group-container': string;
  'camera-off-note': string;
  chat: string;
  'chat-entry': string;
  'chat-form': string;
  'chat-form-input': string;
  'chat-header': string;
  'chat-messages': string;
  'close-button': string;
  'control-bar': string;
  'edit-button': string;
  'focus-layout-wrapper': string;
  'form-control': string;
  'grid-layout-wrapper': string;
  highlighted: string;
  'join-button': string;
  list: string;
  'message-body': string;
  'meta-data': string;
  'participant-name': string;
  prejoin: string;
  'settings-menu-modal': string;
  timestamp: string;
  'username-container': string;
  'video-conference': string;
  'video-conference-inner': string;
  'video-container': string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
