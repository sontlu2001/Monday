import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalLoadingState {
	isShowGlobalLoading: boolean;
}

const initialState: IGlobalLoadingState = {
	isShowGlobalLoading : false,
};

const globalLoadingSlice = createSlice({
	name: "globalLoading",
	initialState,
	reducers: {
		setGlobalLoading: (state, action: PayloadAction<boolean>) => {
			state.isShowGlobalLoading = action.payload;
		},
	},
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
