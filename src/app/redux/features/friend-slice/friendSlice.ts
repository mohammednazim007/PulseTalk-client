import { IFriend } from "@/app/types/friend.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FriendState {
  activeUser: IFriend | null;
  loading: boolean;
  error: string | null;
}

const initialState: FriendState = {
  activeUser: null,
  loading: false,
  error: null,
};

const friendSlice = createSlice({
  name: "active-user",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<IFriend>) => {
      state.activeUser = action.payload;
      state.error = null;
    },
  },
});

export const { setActiveUser } = friendSlice.actions;
export default friendSlice.reducer;
