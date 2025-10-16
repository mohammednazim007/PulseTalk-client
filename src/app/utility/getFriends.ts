import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";

export const getFriends = createAsyncThunk(
  "friends",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(`/friend/all-friends`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load chat history"
      );
    }
  }
);
