export interface UserType {
    _id:string,
    email: string,
    NV126: string,
    lastMessage: string,
    lastMessageAt: string | null,
    NV106:string,
}

export type ConversationType = UserType & {
    conversationId: number | null;
    lastMessage: string;
    lastMessageAt: string | null;
}