import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthData, Nullable } from "../../interface/user.interface";

interface IUserState {
	user: Nullable<IAuthData>;
}

const initialState: IUserState  = {
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<Nullable<IAuthData>>) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions
export default userSlice.reducer;
