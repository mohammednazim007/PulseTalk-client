// src/app/redux/features/auth/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@/app/types/auth";

interface CurrentUser {
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    //** Get current user */
    currentUser: builder.query<CurrentUser, void>({
      query: () => "/user/current-user",
      providesTags: ["Auth"],
    }),

    //** Update user profile */
    updateProfile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/user/profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Login user */
    login: builder.mutation<CurrentUser, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Logout user */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = authApi;
// useRefreshUserQuery
