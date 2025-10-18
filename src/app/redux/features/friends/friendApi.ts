import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const friendApi = createApi({
  reducerPath: "friendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include", // send cookies automatically
    prepareHeaders: (headers) => {
      // No need to read cookie manually
      return headers;
    },
  }),

  tagTypes: ["Friends"],

  endpoints: (builder) => ({
    // ✅ 1. Get all friends
    getFriends: builder.query<any, void>({
      query: () => `/friend/all-friends`,
      providesTags: ["Friends"],
    }),

    // ✅ 2. Add a friend with mutation
    addFriend: builder.mutation({
      query: ({
        senderId,
        receiverId,
      }: {
        senderId: string;
        receiverId: string;
      }) => ({
        url: `/friend/send-request`,
        method: "PUT",
        body: { senderId, receiverId },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Friends"], // 👈 auto refetch list after add
    }),

    // ✅ 3. Remove a friend with mutation
    removeFriend: builder.mutation({
      query: (friendId: string) => ({
        url: `/friend/remove/${friendId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends"], // 👈 auto refetch list after remove
    }),
  }),
});

// 🚀 Export React hooks
export const {
  useGetFriendsQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} = friendApi;
