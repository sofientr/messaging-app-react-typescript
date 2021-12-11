export interface User {
  id: string;
  username: string;
}

interface BaseMessage {
  id: string;
  senderId: string;
  createdAt: number;
  type: 'text' | 'image';
}

export interface TextMessage extends BaseMessage {
  type: 'text';
  content: string;
}

export interface ImageMessage extends BaseMessage {
  type: 'image';
  url: string;
  caption: string;
}
 

export type Message = TextMessage | ImageMessage;
