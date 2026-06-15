import i18n from "@/i18n";
import { useAuth } from "@/lib/hook/useAuth";
import { useSocket } from "@/lib/hook/useSocket";
import { getDateName } from "@/lib/util";
import { IMessage } from "@/model/message_type";
import { ConversationType, UserType } from "@/model/user_type";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLazyGetListCoversationQuery, useLazyGetMessagesQuery, useSaveMessageMutation } from "./inbox.service";

export const useInboxController = (conversationId: number) => {
    const {
        isConnected,
        joinRoom,
        onReceiveMessage,
    } = useSocket();

    const { session, userId, userEmail, NV126, NV106 } = useAuth();

    const { t } = useTranslation(undefined, { i18n });

    const bottomRef = useRef<HTMLDivElement>(null);

    const [inputMessage, setInputMessage] = useState("");

    const [realtimeMessages, setRealtimeMessages] = useState<IMessage[]>([]);
    // const [selectedUserId, setSelectedUserId] = useState<UserType | null>(null);
    const [saveMessage] = useSaveMessageMutation();

    const selectedConversationId = conversationId
        ? conversationId
        : null;

    const [listConversation, setListConversation] = useState<ConversationType[]>([])
    const [hasMore, setHasMore] = useState(true)
    const isLoadingRef = useRef(false)
    const isLoadingRefDetailList = useRef(false)
    const offsetRef = useRef(0)
    const hasMoreRef = useRef(true)
    const hasFetchedRef = useRef(false)
    const listRef = useRef<HTMLDivElement>(null)

    const [trigger, { isFetching }] = useLazyGetListCoversationQuery()

    const [triggerDetailConversation] = useLazyGetMessagesQuery();
    const [historyMessages, setHistoryMessages] = useState<IMessage[]>([]);
    const offsetRefDetail = useRef(0);
    const hasMoreRefDetail = useRef(true);
    const LIMIT = 20;

    const chatListRef = useRef<HTMLDivElement>(null);
    const selectedUserRef = useRef<UserType | null>(null);

    useEffect(() => {
        if (isConnected && userId) {
            joinRoom(userId);
        }
    }, [isConnected, userId]);

    const fetchDetailConversation = useCallback(async (newOffset: number, isInitial = false) => {

        if (!selectedConversationId || isLoadingRefDetailList.current || (!isInitial && !hasMoreRefDetail.current)) return;
        isLoadingRefDetailList.current = true;

        if (isInitial) {
            setHistoryMessages([]);
        }

        const { data } = await triggerDetailConversation({
            conversationId: selectedConversationId,
            limit: LIMIT,
            offset: newOffset,
        })
        if (data?.elements) {
            const newItems = data.elements;
            setHistoryMessages(prev => isInitial ? newItems : [...newItems, ...prev]);
            offsetRefDetail.current = newOffset + LIMIT;
            hasMoreRefDetail.current = newItems.length === LIMIT;
        }
        isLoadingRefDetailList.current = false;
    }, [triggerDetailConversation, selectedConversationId]);

    const allMessages = useMemo(() => {
        const map = new Map<string, IMessage>();
        [...historyMessages, ...realtimeMessages].forEach((msg) => {
            map.set(msg?._id || '', msg);
        });
        const messages = Array.from(map.values());

        return messages.map((msg, index) => {
            const prev = index === 0 ? null : messages[index - 1];
            const isShowDateTitle = prev === null ||
                new Date(msg.createdAt).getDate() !== new Date(prev.createdAt).getDate();
            const rs = getDateName(msg.createdAt);
            const timeHead = rs.label.length > 0 ? t(rs.label) : rs.val;
            return { ...msg, isShowDateTitle, timeHead };
        });
    }, [historyMessages, realtimeMessages, t]);

    useEffect(() => {
        if (offsetRefDetail.current > LIMIT) return;

        bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    }, [allMessages]);

    useEffect(() => {
        if (!selectedConversationId) return;
        offsetRef.current = 0;
        hasMoreRef.current = true;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHistoryMessages([]);
        fetchDetailConversation(0, true);
    }, [selectedConversationId]);



    useEffect(() => {
    if (!selectedConversationId || !listConversation.length) return;

    const found = listConversation.find(
        (c) => c.conversationId === selectedConversationId
    );
    if (found) {
        selectedUserRef.current = found;
    }
}, [selectedConversationId, listConversation]);

    const fetchListConversation = useCallback(async (newOffset: number, isInitial = false) => {
        if (isLoadingRef.current || (!isInitial && !hasMoreRef.current)) return
        isLoadingRef.current = true

        try {
            const { data } = await trigger({ limit: LIMIT, offset: newOffset, email: userEmail || "" })
            isLoadingRef.current = false
            if (data?.elements) {
                const newItems = data.elements.filter( 
                    (item) => item.email !== userEmail
                )


                setListConversation(prev =>
                    isInitial ? newItems : [...prev, ...newItems]
                )


                offsetRef.current = newOffset + LIMIT
                hasMoreRef.current = newItems.length === LIMIT
                setHasMore(newItems.length === LIMIT)
            }
        } catch (error) {
            console.log(error);

        }
    }, [trigger, userEmail]);

    useEffect(() => {
        if (!userId || !userEmail || hasFetchedRef.current) return
        hasFetchedRef.current = true
        offsetRef.current = 0
        hasMoreRef.current = true
        fetchListConversation(0, true)
    }, [userId, userEmail, fetchListConversation])

    useEffect(() => {
        const el = listRef.current
        if (!el) return

        const handleScroll = () => {
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
                if (hasMoreRef.current && !isLoadingRef.current) {
                    fetchListConversation(offsetRef.current)
                }
            }
        }

        el.addEventListener("scroll", handleScroll)
        return () => el.removeEventListener("scroll", handleScroll)
    }, [fetchListConversation])

    useEffect(() => {
        const el = chatListRef.current;
        if (!el) return;

        const handleScrollDetailListConversation = () => {
            if (el.scrollTop === 0 && hasMoreRefDetail.current && !isLoadingRefDetailList.current) {
                fetchDetailConversation(offsetRefDetail.current);
            }
        }
        el.addEventListener("scroll", handleScrollDetailListConversation);
        return () => el.removeEventListener("scroll", handleScrollDetailListConversation)
    }, [fetchDetailConversation]);

    useEffect(() => {
        const cleanup = onReceiveMessage((data) => {
            console.log("📩 receive:", data);
            setListConversation((prev) =>
                prev.map((conversation) =>
                    conversation.conversationId === data.conversationId
                        ? { ...conversation, lastMessage: data.message || "", lastMessageAt: data.createdAt }
                        : conversation
                )
            );
            if (data.conversationId !== selectedConversationId) return;
            setRealtimeMessages((prev) => {
                const exists = prev.some((item) => item._id === data._id);
                if (exists) return prev;
                return [...prev, data];
            });
        });
        return () => { cleanup?.(); };
    }, [selectedConversationId, onReceiveMessage]);

    const handleSend = async () => {
        if (!inputMessage.trim()) return;
        if (!selectedUserRef.current) return;

        try {
            await saveMessage({
                conversationId: selectedConversationId || 0,
                message: inputMessage,
                senderId: userId || "",
                senderEmail: userEmail || "",
                senderAvatar: NV126 || "",
                receiverId: selectedUserRef.current._id,
                receiverAvatar: selectedUserRef.current.NV126,
                senderName: NV106 || "",
                receiverName: selectedUserRef.current.NV106 || ''
            }).unwrap();
            setInputMessage("");
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            console.log(error);
        }
    };
    return {
        listConversation, isFetching, hasMore, listRef,
        inputMessage,
        setInputMessage,
        handleSend,
        allMessages,
        chatListRef,
        bottomRef,
        isConnected,
        session,
        selectedUserRef,
        // selectedUserId,
        // setSelectedUserId,
        selectedConversationId
    };

}