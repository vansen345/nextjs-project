import { HomeItem } from "@/model/home_type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailState {
    selectedItem: HomeItem | null;
    isModalOpen: boolean;
}

const initialState: DetailState = {
    selectedItem: null,
    isModalOpen: false,
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
    },
});

export const { setSelectedItem, setIsModalOpen } = detailSlice.actions;
export default detailSlice.reducer;