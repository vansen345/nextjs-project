import i18n from "@/i18n";
import { useAuth } from "@/lib/hook/useAuth";
import { useSocket } from "@/lib/hook/useSocket";
import { getDateName } from "@/lib/util";
import { IMessage } from "@/model/message_type";
import { ContentImg } from "@/model/upload_media";
import { ConversationType, UserType } from "@/model/user_type";
import imageCompression from "browser-image-compression";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUploadImgVideoMutation } from "../create_piep/create_piep_services";
import { useLazyGetListCoversationQuery, useLazyGetMessagesQuery, useSaveMessageMutation } from "./inbox.service";

export const useInboxController = (conversationId: number) => {
    const {
        isConnected,
        joinRoom,
        onReceiveMessage,
    } = useSocket();

    const { session, userId, userEmail, NV126, NV106, FO100 } = useAuth();

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

    const [images, setImages] = useState<ContentImg[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploadMedia] = useUploadImgVideoMutation();

    // const [checkIsReadMess] = useCheckReadMessMutation();

    useEffect(() => {
        if (isConnected && userId) {
            joinRoom(userId);
        }
    }, [isConnected, userId]);

    useEffect(() => {
        if (!selectedConversationId || !listConversation.length) return;
        const found = listConversation.find(c => c.conversationId === selectedConversationId);
        if (found) {
            document.title = `Tin nhắn: ${found.NV106}`;
        }

    }, [selectedConversationId, listConversation]);


    const fetchDetailConversation = useCallback(async (newOffset: number, isInitial = false) => {
        if (!selectedConversationId || isLoadingRefDetailList.current || (!isInitial && !hasMoreRefDetail.current)) return;
        isLoadingRefDetailList.current = true;

        if (isInitial) {
            setHistoryMessages([]);
            // update isUnread = false ngay khi click vào conversation
            setListConversation(prev => prev.map(c =>
                c.conversationId === selectedConversationId
                    ? { ...c, isUnread: false }
                    : c
            ));
        }

        const { data } = await triggerDetailConversation({
            conversationId: selectedConversationId,
            limit: LIMIT,
            offset: newOffset,
            FO100: FO100 || 0
        });

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
            const { data } = await trigger({ limit: LIMIT, offset: newOffset, email: userEmail || "", FO100: FO100 || 0 })
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
                        ? {
                            ...conversation,
                            lastMessage: data.message || "",
                            lastMessageType: data.type || "text",
                            lastMessageSenderId: data.senderId || "",
                            lastMessageSenderName: data.senderName || "",
                            lastMessageAt: data.createdAt,
                            isUnread: data.conversationId !== selectedConversationId,
                        }
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



    const handleOpenMedia = () => {
        setTimeout(() => {
            inputRef.current?.click();
        }, 200);
    };

    const handleMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const formData = new FormData();

        await Promise.all(
            files.map(async (file) => {
                if (file.type.startsWith('image/')) {
                    const compressed = await imageCompression(file, {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1280,
                    });
                    formData.append('media', compressed, compressed.name);
                } else {
                    formData.append('media', file, file.name);
                }
            })
        );

        // thêm preview tạm
        const tempMedia = files.map((file, index) => ({
            FM600: 0,
            index: images.length + index + 1,
            IMG: URL.createObjectURL(file),
            RATIO: 1,
            THUMB: URL.createObjectURL(file),
            DES: "",
            loading: true,
            progress: 0,
            type: file.type.startsWith('video/') ? 'video' : 'image',
        }));
        setImages((prev) => [...prev, ...tempMedia]);

        const startIndex = images.length;
        const progressInterval = setInterval(() => {
            setImages((prev) => prev.map((img, i) => {
                if (i >= startIndex && img.loading && (img.progress || 0) < 90) {
                    return { ...img, progress: (img.progress || 0) + 10 };
                }
                return img;
            }));
        }, 200);

        try {
            const result = await uploadMedia(formData).unwrap();
            clearInterval(progressInterval);
            setImages((prev) => {
                const newImages = [...prev];
                result.elements.forEach((img, i) => {
                    newImages[startIndex + i] = { ...img, loading: false, progress: 100 };
                });
                return newImages;
            });
            if (inputRef.current) inputRef.current.value = '';
        } catch (error) {
            clearInterval(progressInterval);
            console.log(error);
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };


    const handleSend = async (type: "text" | "sticker" | "image" = "text") => {
        if (type === "text" && !inputMessage.trim() && images.length === 0) return;
        if (!selectedUserRef.current) return;

        try {
            // nếu có hình thì gửi hình trước
            if (images.length > 0) {
                await saveMessage({
                    conversationId: selectedConversationId || 0,
                    message: "",
                    senderId: userId || "",
                    senderEmail: userEmail || "",
                    senderAvatar: NV126 || "",
                    receiverId: selectedUserRef.current._id,
                    receiverAvatar: selectedUserRef.current.NV126,
                    senderName: NV106 || "",
                    receiverName: selectedUserRef.current.NV106 || '',
                    type: "image",
                    media: {
                        image: images.map((img) => ({
                            FM600: img.FM600,
                            index: img.index,
                            DES: img.DES,
                            IMG: img.IMG,
                            RATIO: img.RATIO,
                            THUMB: img.THUMB,
                        }))
                    }
                }).unwrap();
                setImages([]);
            }

            // nếu có text thì gửi text
            if (inputMessage.trim()) {
                await saveMessage({
                    conversationId: selectedConversationId || 0,
                    message: inputMessage,
                    senderId: userId || "",
                    senderEmail: userEmail || "",
                    senderAvatar: NV126 || "",
                    receiverId: selectedUserRef.current._id,
                    receiverAvatar: selectedUserRef.current.NV126,
                    senderName: NV106 || "",
                    receiverName: selectedUserRef.current.NV106 || '',
                    type: "text",
                }).unwrap();
                setInputMessage("");
            }

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
        selectedConversationId,
        handleOpenMedia,
        handleMediaChange,
        removeImage,
        inputRef,
        images,
        userId
    };

}