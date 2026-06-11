import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationMessageState {
    hasNewMessage: boolean;
    senderName: string;
}

const initialState: NotificationMessageState = {
    hasNewMessage: false,
    senderName: ""
};

const notificationMessageSlice = createSlice({
    name:"notificationMessage",
    initialState,
    reducers:{
        setHasNewMessage:(state, action: PayloadAction<boolean>)=>{
            state.hasNewMessage = action.payload;
        },
        setSenderName:(state, action: PayloadAction<string>)=>{
            state.senderName = action.payload;
        }
    }
});

export const {setHasNewMessage,setSenderName}= notificationMessageSlice.actions;
export default notificationMessageSlice.reducer;