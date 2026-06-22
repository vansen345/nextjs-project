export interface UserType {
    _id: string,
    FO100: number,
    email: string,
    NV126: string,
    lastMessage: string,
    lastMessageAt: string | null,
    NV106: string,
    FRIEND_STATUS?: "none" | "pending" | "accepted";
    FO100S?: number | null;
}

export type ConversationType = UserType & {
    // conversationId: number | null;
    // lastMessage: string;
    // lastMessageType?: "text" | "sticker" | "image",
    // lastMessageAt: string | null;
    // isUnread?: boolean;

    conversationId: number | null;
    lastMessage: string;
    lastMessageAt: string | null;
    isUnread?: boolean;
    lastMessageType?: "text" | "sticker" | "image",
    lastMessageSenderId?: string;
    lastMessageSenderName?: string;
}