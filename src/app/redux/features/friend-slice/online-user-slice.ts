import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OnlineState } from "./interface";
import api from "@/app/lib/axios";

export const getUser = createAsyncThunk("get/user", async (_, thunkAPI) => {
  try {
    const res = await api.get("/user");
    // connectSocket(res.data.user); //! ** adjust with actual user id

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const initialState: OnlineState = {
  onlineUsers: [],
  activeUser: null,
};

const onlineSlice = createSlice({
  name: "online-users",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },
});

export const { setOnlineUsers, setActiveUser } = onlineSlice.actions;
export default onlineSlice.reducer; // ✅ export reducer, not slice
