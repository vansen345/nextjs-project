import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
    isScrolled: boolean;
    isSearchOpen: boolean;
    searchQuery: string;
    isModalRegister: boolean;
    isModalLogin: boolean;
    isModelCreatePiep: boolean;
   

}

const initialState: HeaderState = {
    isScrolled: false,
    isSearchOpen: false,
    searchQuery: "",
    isModalRegister: false,
    isModalLogin: false,
    isModelCreatePiep: false,
    
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
        setIsModalOpenRegiser: (state, action: PayloadAction<boolean>) => {
            state.isModalRegister = action.payload;
        },
        setIsModalOpenLogin: (state, action: PayloadAction<boolean>) => {
            state.isModalLogin = action.payload;
        },
        setIsModalCreatePiep: (state, action: PayloadAction<boolean>) => {
            state.isModelCreatePiep = action.payload;
        },
     
    },
});

export const { setIsScrolled, setIsSearchOpen, setSearchQuery, setIsModalOpenRegiser, setIsModalOpenLogin, setIsModalCreatePiep,  } = headerSlice.actions;
export default headerSlice.reducer;