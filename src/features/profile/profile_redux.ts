import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    isModalEditProfile: boolean;
}

const initialState: ProfileState = {
    isModalEditProfile: false,
}

const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setIsModalEditProfile:(state, action:PayloadAction<boolean>)=>{
            state.isModalEditProfile = action.payload;
        }
    }
});

export const {setIsModalEditProfile}= profileSlice.actions;
const profileReducer= profileSlice.reducer;
export default profileReducer;