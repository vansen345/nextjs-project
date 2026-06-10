import { HomeItem } from "@/model/home_type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreatePostBody } from "../create_piep/create_piep_services";

interface DetailState {
    selectedItem: HomeItem | null;
    isModalOpen: boolean;
    likeUpdate: { PP300: number, ISLIKED: number, TOTALLIKES: number } | null;
    commentUpdate: { PP300: number, TOTALCOMMENTS: number } | null;
    isEditMode: boolean,
    editPostData: CreatePostBody | null,
    refreshDetail: boolean,
}

const initialState: DetailState = {
    selectedItem: null,
    isModalOpen: false,
    likeUpdate: null,
    commentUpdate: null,
    isEditMode: false,
    editPostData: null,
    refreshDetail: false

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
        setLikeUpdate: (state, action: PayloadAction<{ PP300: number, ISLIKED: number, TOTALLIKES: number } | null>) => {
            state.likeUpdate = action.payload;
        },
        setCommentUpdate: (state, action: PayloadAction<{ PP300: number, TOTALCOMMENTS: number } | null>) => {
            state.commentUpdate = action.payload;
        },
        setIsEditMode: (state, action) => {
            state.isEditMode = action.payload;
        },
        setEditPostData: (state, action) => {
            state.editPostData = action.payload;
        },
        setRefreshDetail: (state) => {
            state.refreshDetail = !state.refreshDetail;
        }
    },

});

export const { setSelectedItem, setIsModalOpen, setLikeUpdate, setCommentUpdate, setIsEditMode, setEditPostData,setRefreshDetail } = detailSlice.actions;
export default detailSlice.reducer;