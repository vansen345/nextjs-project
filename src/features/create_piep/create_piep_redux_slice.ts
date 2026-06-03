import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreatePiepState{
    shouldRefreshHome: boolean,
}

const initialState: CreatePiepState={
    shouldRefreshHome:false,
}

const createPiepSlice = createSlice({
    name:'createPiep',
    initialState,
    reducers:{
        setShouldRefreshHome:(state,action: PayloadAction<boolean>)=>{
            state.shouldRefreshHome = action.payload;
        }

    }
});

export const {setShouldRefreshHome}= createPiepSlice.actions;
export default createPiepSlice.reducer;