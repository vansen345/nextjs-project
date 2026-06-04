import { HomeItem } from "@/model/home_type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailState {
    selectedItem: HomeItem | null;
    isModalOpen: boolean;
    likeUpdate:{PP300:number,ISLIKED:number,TOTALLIKES:number} | null;
}

const initialState: DetailState = {
    selectedItem: null,
    isModalOpen: false,
    likeUpdate: null,
};

const detailSlice = createSlice({
    name: "detail",
    initialState,
    reducers: {
        setSelectedItem: (state, action: PayloadAction<HomeItem | null>) => {
            state.selectedItem = action.payload;
        },
        setIsModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload;
        },
        setLikeUpdate: (state, action: PayloadAction<{PP300:number,ISLIKED:number,TOTALLIKES:number} | null>) => {
            state.likeUpdate = action.payload;
        }
    },
    
});

export const { setSelectedItem, setIsModalOpen, setLikeUpdate    } = detailSlice.actions;
export default detailSlice.reducer;