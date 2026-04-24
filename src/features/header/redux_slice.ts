import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
    isScrolled: boolean;
    isSearchOpen: boolean;
    searchQuery: string;
}

const initialState: HeaderState = {
    isScrolled: false,
    isSearchOpen: false,
    searchQuery: "",
};

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setIsScrolled: (state, action: PayloadAction<boolean>) => {
            state.isScrolled = action.payload;
        },
        setIsSearchOpen: (state, action: PayloadAction<boolean>) => {
            state.isSearchOpen = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setIsScrolled, setIsSearchOpen, setSearchQuery } = headerSlice.actions;
export default headerSlice.reducer;