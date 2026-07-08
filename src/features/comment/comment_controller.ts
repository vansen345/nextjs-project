import { firebase } from '@/lib/firebase_config';
import { useAuth } from '@/lib/hook/useAuth';
import { IComment } from "@/model/comment_type";
import { RootState } from "@/store";
import { message } from 'antd';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommentUpdate } from '../detail/detail_redux_slice';
import { useDeleteCommentMutation, useInsertCommentMutation, useLazyGetListCommentQuery } from "./comment_services";

export const useCommentController = () => {
    const selectedItem = useSelector((state: RootState) => state.detail.selectedItem);

    const [listComment, setListComment] = useState<IComment[]>([]);
    const { FO100, NV126, NV106 } = useAuth();
    const dispatch = useDispatch();

    const bottomRef = useRef<HTMLDivElement>(null);
    const [inputComment, setInputComment] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const isLoadingRef = useRef(false);
    const offsetRef = useRef(0);
    const hasMoreRef = useRef(true);
    const hasFetchedRef = useRef(false);
    const [insertComment] = useInsertCommentMutation();
    const [trigger] = useLazyGetListCommentQuery();
    const [deleteComment] = useDeleteCommentMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const LIMIT = 15;
    const [replyComment, setReplyComment] = useState("");
    const [comment, setComment] = useState<IComment | null>(null);



    const fetchList = useCallback(async (newOffset: number, isInitial = false) => {
        if (isLoadingRef.current || (!isInitial && !hasMoreRef.current)) return;
        isLoadingRef.current = true;

        try {
            const { data } = await trigger({ PP300: selectedItem?.PP300 || 0, limit: LIMIT, offset: newOffset })
            if (data?.elements != null) {
                const newItems = data.elements;
                setListComment(prev => isInitial ? newItems : [...prev, ...newItems]);
                offsetRef.current = newOffset + LIMIT;
                hasMoreRef.current = newItems.length === LIMIT;
                setHasMore(newItems.length === LIMIT);
            }
        } catch (error) {
            messageApi.error(`${error}`);
        }
        finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }

    }, [trigger, selectedItem])

    useEffect(() => {
        if (!selectedItem?.PP300) return;
        hasFetchedRef.current = false;
        offsetRef.current = 0;
        hasMoreRef.current = true;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setListComment([]);
        fetchList(0, true);
    }, [selectedItem?.PP300]);

    useEffect(() => {

        if (!selectedItem?.PP300) return;
        console.log("🔥 Subscribe", selectedItem.PP300);

        const q = query(
            collection(firebase, 'comments'),
            where('PP300', '==', selectedItem.PP300),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("📩 Snapshot", snapshot.docs.length);
            snapshot.docChanges().forEach((change) => {
                const data = change.doc.data() as IComment;
                const comment = { ...data, _id: change.doc.id } as IComment;

                snapshot.docs.forEach(doc => {
                    console.log(doc.id, doc.data().PP300);
                });
                if (change.type === 'added') {

                    if (snapshot.metadata.hasPendingWrites) return;

                    setListComment((prev) => {
                        const exists = prev.some((item) => item._id === change.doc.id);
                        if (exists) return prev;

                        setTimeout(() => {
                            dispatch(setCommentUpdate({
                                PP300: selectedItem.PP300 || 0,
                                TOTALCOMMENTS: prev.length + 1
                            }));
                        }, 0);

                        return [...prev, comment];
                    });
                }

                if (change.type === 'modified') {
                    setListComment((prev) =>
                        prev.map((item) =>
                            item._id === change.doc.id ? { ...item, ...comment } : item
                        )
                    );
                }
            });
        });

        return () => {
            console.log("❌ Unsubscribe", selectedItem.PP300);
            unsubscribe();
        }
    }, [selectedItem?.PP300]);

    const handleInsertComment = async (text: string) => {
        if (!text.trim()) return;
        try {
            await insertComment({
                PP300: selectedItem?.PP300,
                comment: comment ? "" : inputComment,
                FO100: FO100 || 0,
                NV106: NV106 || "",
                NV126: NV126 || "",
                reply: comment ? {
                    _id: comment._id,
                    FO100: comment.FO100,
                    NV106: comment.NV106,
                    NV126: comment.NV126,
                    comment: text,
                } : undefined,
            }).unwrap();
            setInputComment("");
            setReplyComment("");
            setComment(null);
            if (!comment) {
                dispatch(setCommentUpdate({
                    PP300: selectedItem?.PP300 || 0,
                    TOTALCOMMENTS: (listComment.length || 0) + 1
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onActionReply = (comment: IComment) => {
        setReplyComment('');
        setComment(comment);
    }

    const onDeleteComment = async (commentId: string) => {
        const result = await deleteComment({ id: commentId }).unwrap();
        if (result.elements > 0) {
            setListComment((prev) =>
                prev.filter((item) => item._id !== commentId)
            );
        } else {
            messageApi.error("Xoá không thành công")
        }
    }

    return {
        listComment,
        inputComment,
        setInputComment,
        handleInsertComment,
        isLoading,
        hasMore,
        onActionReply,
        replyComment, setReplyComment,
        comment, setComment, onDeleteComment
    };

}