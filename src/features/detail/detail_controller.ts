"use client"

import { useAuth } from "@/lib/hook/useAuth"
import { useSocket } from "@/lib/hook/useSocket"
import { HomeItem } from "@/model/home_type"
import { RootState } from "@/store"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDetailPieperMutation } from "./detail_api"
import { setIsModalOpen, setLikeUpdate, setSelectedItem } from "./detail_redux_slice"

export const useDetailPageController = () => {
    const { likePost } = useSocket();
    const selectedItem = useSelector((state: RootState) => state.detail.selectedItem);
    const [triggerAPI] = useDetailPieperMutation();
    const [detail, setDetail] = useState<HomeItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {  isLoggedIn,FO100 } = useAuth();
    const isModalOpen = useSelector(
        (state: RootState) => state.detail.isModalOpen,
    );
    const hasFetchedRef = useRef<number | null>(null);

    useEffect(() => {
        console.log(`selectedItem?.PP300--${selectedItem?.PP300}`);

        if (!selectedItem?.PP300) return;
        if (hasFetchedRef.current === selectedItem.PP300) return;
        hasFetchedRef.current = selectedItem.PP300;

        const fetch = async () => {
            setDetail(null);
            setIsLoading(true);
            const rs = await triggerAPI({
                PV325: selectedItem.PV325 || '',
                PP300: selectedItem.PP300 || 0,
                FT300: selectedItem.FT300 || 0,
                FO100: FO100 || 0,
            }).unwrap();
            if (rs.elements != null) {
                setDetail(rs.elements);
            }
            setIsLoading(false);
        };

        fetch();
    }, [selectedItem?.PP300]);

    const handleCancel = () => {
        if (dropdownOpen) {
            setDropdownOpen(false);
            return;
        }
        dispatch(setIsModalOpen(false));
        dispatch(setSelectedItem(null));
        window.history.pushState(null, "", "/");
    };

    const handleLike = () => {
        likePost(detail?.PP300 || 0, FO100 || 0, detail?.ISLIKED === 1);
        setDetail((prevDetail) => prevDetail
            ? { ...prevDetail, ISLIKED: prevDetail.ISLIKED ? 0 : 1, TOTALLIKES: (prevDetail.TOTALLIKES || 0) + (prevDetail.ISLIKED ? -1 : 1) }
            : prevDetail);
        dispatch(setLikeUpdate({PP300: detail?.PP300 || 0, ISLIKED: detail?.ISLIKED === 1 ? 0 : 1, TOTALLIKES: (detail?.TOTALLIKES || 0) + (detail?.ISLIKED === 1 ? -1 : 1)}));
        // prevList.map((item) => {
        //     if (item.PP300 === PP300) {
        //         return {
        //             ...item,
        //             ISLIKED: isLiked ? 0 : 1,
        //             TOTALLIKES: (item.TOTALLIKES || 0) + (isLiked ? -1 : 1),
        //         };
        //     }
        //     return item;
        // })

    };

    return { detail, isLoading, isModalOpen, isLoggedIn,dropdownOpen,dispatch, setDropdownOpen, handleCancel,handleLike };

}