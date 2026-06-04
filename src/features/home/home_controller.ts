"use client";

import { setIsModalOpen, setSelectedItem } from "@/features/detail/detail_redux_slice";
import { useAuth } from "@/lib/hook/useAuth";
import { useSocket } from "@/lib/hook/useSocket";
import NProgress from '@/lib/nprogress';
import { getDecryptedTitle, HomeItem } from "@/model/home_type";
import { RootState } from "@/store";
import { useSession } from "next-auth/react";
import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import { setShouldRefreshHome } from "../create_piep/create_piep_redux_slice";
import { useLazyGetHomeListQuery } from "./home_api";



const LIMIT = 10;

export const useHomePageController = () => {
    const { likePost } = useSocket();

    const { status } = useSession();
    const { FO100, isLoggedIn } = useAuth();
    const [list, setList] = useState<HomeItem[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const isLoadingRef = useRef(false);
    const offsetRef = useRef(0);
    const hasMoreRef = useRef(true);
    const bottomRef = useRef<HTMLDivElement>(null);


    const [trigger] = useLazyGetHomeListQuery();
    const hasFetchedRef = useRef(false);
    const dispatch = useDispatch();

    const shouldRefresh = useSelector((state: RootState) => state.createPiep.shouldRefreshHome);
    const likeUpate = useSelector((state: RootState) => state.detail.likeUpdate);


    const fetchList = useCallback(async (newOffset: number, isInitial = false) => {
        console.log('FO100 từ useAuth', FO100);
        if (isLoadingRef.current || (!isInitial && !hasMoreRef.current)) return;

        isLoadingRef.current = true;
        NProgress.start();
        // setIsLoading(true);

        try {
            const { data } = await trigger({ limit: LIMIT, offset: newOffset, FO100: FO100 || 0 });
            console.log('FO100 khi fetchList', FO100);
            if (data) {
                const newItems = data.elements ?? [];
                const newHasMore = newItems.length === LIMIT;

                setList((prev) => {
                    const existingIds = new Set(prev.map(item => item._id));
                    const uniqueItems = newItems.filter(item => !existingIds.has(item._id));
                    return [...prev, ...uniqueItems];
                });

                setHasMore(newHasMore);
                offsetRef.current = newOffset + LIMIT;
                hasMoreRef.current = newHasMore;
            }
        } finally {
            isLoadingRef.current = false;
            NProgress.done();
            // setIsLoading(false);
        }
    }, [trigger, FO100]);

    useEffect(() => {
        if (likeUpate) { 
            startTransition(() => {
                setList((prevList) =>
                    prevList.map((item) => {
                        if (item.PP300 === likeUpate.PP300) {
                            return {
                                ...item,
                                ISLIKED: likeUpate.ISLIKED,
                                TOTALLIKES: likeUpate.TOTALLIKES,
                            };
                        }
                        return item;
                    })
                );
            })

        }
    }, [likeUpate]);

    useEffect(() => {
        if (status === 'loading') return;
        if (!hasFetchedRef.current || shouldRefresh) {
            hasFetchedRef.current = true;
            startTransition(() => {
                setList([]);
                setHasMore(true);
                offsetRef.current = 0;
                hasMoreRef.current = true;
                fetchList(0, true);
                if (shouldRefresh) dispatch(setShouldRefreshHome(false));
            });
        }
    }, [status, FO100, shouldRefresh]);


    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 50
            ) {
                if (hasMoreRef.current && !isLoadingRef.current) {
                    fetchList(offsetRef.current);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchList]);


    const handleItemClick = (item: HomeItem) => {

        dispatch(setSelectedItem(item));
        dispatch(setIsModalOpen(true));
        const slug = `${slugify(getDecryptedTitle(item?.PV301), { lower: true, locale: "vi" })}-${item.PV325}.html`;
        window.history.pushState(null, "", `/${slug}`);
    };

    const handleLike = (PP300: number, isLiked: boolean) => {
        likePost(PP300, FO100 || 0, isLiked);
        setList((prevList) =>
            prevList.map((item) => {
                if (item.PP300 === PP300) {
                    return {
                        ...item,
                        ISLIKED: isLiked ? 0 : 1,
                        TOTALLIKES: (item.TOTALLIKES || 0) + (isLiked ? -1 : 1),
                    };
                }
                return item;
            })
        );
    };

    return {
        list,
        isLoggedIn,
        dispatch,
        handleItemClick,
        handleLike,
        hasMore,
        bottomRef,
    };
};