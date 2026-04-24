"use client"

import { HomeItem } from "@/model/home_type"
import { RootState } from "@/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDetailPieperMutation } from "./detail_api"

export const useDetailPageController = () => {
    const selectedItem = useSelector((state: RootState) => state.detail.selectedItem);
    const [triggerAPI] = useDetailPieperMutation();
    const [detail, setDetail] = useState<HomeItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!selectedItem) return;
       
        const fetch = async () => {
             setDetail(null);
            setIsLoading(true);
            const rs = await triggerAPI({
                PV325: selectedItem.PV325,
                PP300: selectedItem.PP300,
                FT300: selectedItem.FT300
            }).unwrap();
            if (rs.elements != null) {
                setDetail(rs.elements);
            }
            setIsLoading(false);
        };

        fetch();
    }, [selectedItem, triggerAPI]);

    return { detail, isLoading };

}