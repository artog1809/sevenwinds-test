import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Row, RowState } from "./types";

const initialState: RowState ={
    rowList: []
}

const rowSlice = createSlice({
    name: 'row',
    initialState: initialState,
    reducers: { 
        setRowList: (state, action: PayloadAction<Row[]>) => {
            state.rowList = action.payload;
        }
    }
})

export const { setRowList } = rowSlice.actions;
export default rowSlice.reducer;