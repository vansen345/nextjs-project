// export interface Message {
//   roomId: string;
//   message: string;
//   sender: string;
// }

export interface IMessage {
  _id?: string;
  conversationId?:number;
  roomId?: string;
  message?: string;
  senderId?: string;
  senderEmail?: string;
  senderAvatar?: string;
  receiverId?: string;
  receiverEmail?: string;
  receiverAvatar?: string;
  createdAt: string;
}