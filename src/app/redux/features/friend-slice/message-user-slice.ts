import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatMessage, OnlineState } from "./interface";
import api from "@/app/lib/axios";
import { IFriend } from "@/app/types/friend.types";

const initialState: OnlineState = {
  onlineUsers: [],
  activeUser: null,
  chat: [],
};

const onlineSlice = createSlice({
  name: "online-users",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    setActiveUser: (state, action: PayloadAction<IFriend>) => {
      state.activeUser = action.payload;
    },
    addMessage: (state, action: PayloadAction<IChatMessage>) => {
      state.chat.push(action.payload);
    },
    setChatHistory: (state, action: PayloadAction<IChatMessage[]>) => {
      state.chat = action.payload;
    },
  },
});

export const { setOnlineUsers, setActiveUser, addMessage, setChatHistory } =
  onlineSlice.actions;
export default onlineSlice.reducer; // ✅ export reducer, not slice
