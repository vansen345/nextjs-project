"use client"

import { HomeItem } from "@/model/home_type"
import { RootState } from "@/store"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDetailPieperMutation } from "./detail_api"
import { setIsModalOpen, setSelectedItem } from "./detail_redux_slice"

export const useDetailPageController = () => {
    const selectedItem = useSelector((state: RootState) => state.detail.selectedItem);
    const [triggerAPI] = useDetailPieperMutation();
    const [detail, setDetail] = useState<HomeItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
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
                FT300: selectedItem.FT300 || 0
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

    return { detail, isLoading, isModalOpen, dropdownOpen, setDropdownOpen, handleCancel };

}