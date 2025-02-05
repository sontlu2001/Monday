import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SidebarState = {
  isCollapsed: boolean;
};

const initialState: SidebarState = {
  isCollapsed: false
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    }
  }
});

export const {
  setSidebarCollapsed
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
