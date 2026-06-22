// export interface Message {
//   roomId: string;
//   message: string;
//   sender: string;
// }

import { ContentImg } from "./upload_media";

export interface IMessage {
  _id?: string;
  conversationId?: number;
  roomId?: string;
  message?: string;
  senderId?: string;
  senderEmail?: string;
  senderAvatar?: string;
  receiverId?: string;
  receiverEmail?: string;
  receiverAvatar?: string;
  senderName?: string;
  receiverName?: string;
  createdAt: string;
  isRead?: boolean;
  type?: "text" | "sticker" | "image";
  media?: {
    image: ContentImg[];
  }
}