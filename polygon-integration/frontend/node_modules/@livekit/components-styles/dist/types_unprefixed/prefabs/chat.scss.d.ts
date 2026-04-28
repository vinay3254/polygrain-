export type Styles = {
  chat: string;
  'chat-entry': string;
  'chat-form': string;
  'chat-form-input': string;
  'chat-header': string;
  'chat-messages': string;
  'close-button': string;
  'edit-button': string;
  'message-body': string;
  'meta-data': string;
  'participant-name': string;
  timestamp: string;
};

export type UnprefixedClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
