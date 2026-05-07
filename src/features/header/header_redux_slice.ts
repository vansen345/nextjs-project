import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
    isScrolled: boolean;
    isSearchOpen: boolean;
    searchQuery: string;
    isModalRegister: boolean;
    isModalLogin: boolean;

}

const initialState: HeaderState = {
    isScrolled: false,
    isSearchOpen: false,
    searchQuery: "",
    isModalRegister:false,
    isModalLogin: false,
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
        setIsModalOpenRegiser:( state,action:PayloadAction<boolean>)=>{
            state.isModalRegister=action.payload;
        },
        setIsModalOpenLogin:(state,action:PayloadAction<boolean>)=>{
            state.isModalLogin = action.payload;
        }
    },
});

export const { setIsScrolled, setIsSearchOpen, setSearchQuery,setIsModalOpenRegiser,setIsModalOpenLogin } = headerSlice.actions;
export default headerSlice.reducer;