export type Styles = {
  'lk-chat': string;
  'lk-chat-entry': string;
  'lk-chat-form': string;
  'lk-chat-form-input': string;
  'lk-chat-header': string;
  'lk-chat-messages': string;
  'lk-close-button': string;
  'lk-edit-button': string;
  'lk-message-body': string;
  'lk-meta-data': string;
  'lk-participant-name': string;
  'lk-timestamp': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
