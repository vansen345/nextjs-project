import { firebase } from '@/lib/firebase_config';
import { useAuth } from '@/lib/hook/useAuth';
import { IComment } from "@/model/comment_type";
import { RootState } from "@/store";
import { message } from 'antd';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommentUpdate } from '../detail/detail_redux_slice';
import { useInsertCommentMutation, useLazyGetListCommentQuery } from "./comment_services";

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
    const [messageApi, contextHolder] = message.useMessage();
    const LIMIT = 15;

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
        if (!selectedItem?.PP300 || hasFetchedRef.current) return;
        hasFetchedRef.current = true
        offsetRef.current = 0
        hasMoreRef.current = true
        fetchList(0, true);
    }, [selectedItem?.PP300, fetchList]);

    // useEffect(() => {
    //     if (!selectedItem?.PP300) return;

    //     const q = query(
    //         collection(firebase, 'comments'),
    //         where('PP300', '==', selectedItem.PP300),
    //         orderBy('createdAt', 'asc')
    //     );

    //     const unsubscribe = onSnapshot(q, (snapshot) => {
    //         console.log('snapshot triggered', snapshot.docChanges().length);
    //         snapshot.docChanges().forEach((change) => {
    //             if (change.type === 'added') {
    //                 const data = change.doc.data() as IComment;
    //                 setListComment((prev) => {
    //                     const exists = prev.some(item => item._id === change.doc.id);
    //                     if (exists) return prev;
    //                     return [...prev, { ...data, _id: change.doc.id } as IComment];
    //                 });
    //             }
    //         });
    //     });

    //     return () => unsubscribe();
    // }, [selectedItem?.PP300]);

    useEffect(() => {
        if (!selectedItem?.PP300) return;

        const q = query(
            collection(firebase, 'comments'),
            where('PP300', '==', selectedItem.PP300),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type !== 'added') return;

                const data = change.doc.data() as IComment;

                const comment = {
                    ...data,
                    _id: change.doc.id,
                } as IComment;

                setListComment((prev) => {
                    const exists = prev.some(
                        (item) => item._id === change.doc.id
                    );

                    if (exists) return prev;
                    dispatch(setCommentUpdate({
                        PP300: selectedItem.PP300 || 0,
                        TOTALCOMMENTS: prev.length + 1
                    }));

                    return [...prev, comment];
                });
            });
        });

        return () => unsubscribe();
    }, [selectedItem?.PP300]);

    const handleInsertComment = async () => {
        if (!inputComment.trim()) return;
        try {
            await insertComment({
                PP300: selectedItem?.PP300,
                comment: inputComment,
                FO100: FO100 || 0,
                NV106: NV106 || "",
                NV126: NV126 || "",
            }).unwrap();
            setInputComment("");
            dispatch(setCommentUpdate({ PP300: selectedItem?.PP300 || 0, TOTALCOMMENTS: (listComment.length || 0) + 1 }));
        } catch (error) {
            console.log(error);
        }
    };

    return {
        listComment,
        inputComment,
        setInputComment,
        handleInsertComment,
        isLoading,
        hasMore,
    };

}