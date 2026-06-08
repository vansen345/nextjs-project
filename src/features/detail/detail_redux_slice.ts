import { HomeItem } from "@/model/home_type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailState {
    selectedItem: HomeItem | null;
    isModalOpen: boolean;
    likeUpdate:{PP300:number,ISLIKED:number,TOTALLIKES:number} | null;
    commentUpdate:{PP300:number,TOTALCOMMENTS:number} | null;
}

const initialState: DetailState = {
    selectedItem: null,
    isModalOpen: false,
    likeUpdate: null,
    commentUpdate: null,
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
        },
        setCommentUpdate: (state, action: PayloadAction<{PP300:number,TOTALCOMMENTS:number} | null>) => {
            state.commentUpdate = action.payload;
        }
    },
    
});

export const { setSelectedItem, setIsModalOpen, setLikeUpdate, setCommentUpdate } = detailSlice.actions;
export default detailSlice.reducer;