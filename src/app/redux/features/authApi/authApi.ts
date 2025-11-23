import { createApi } from "@reduxjs/toolkit/query/react";

import { SignInFormData } from "@/app/lib/schemas/authSchemas";
import { baseQueryWithAuth } from "../../base-query/baseQueryWithAuth";
import { IUser } from "@/app/types/userType";
import { ILoginResponse, IResponse } from "@/app/types/responseType";

interface CurrentUser {
  user: IUser;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    //** Get current user */
    currentUser: builder.query<CurrentUser, void>({
      query: () => "/user/current-user",
      providesTags: ["Auth", "User"],
    }),

    //** Update user profile */
    updateProfile: builder.mutation<IResponse, FormData>({
      query: (formData) => ({
        url: "/user/profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Update user profile second */
    updateProfileSecond: builder.mutation<IResponse, FormData>({
      query: (formData) => ({
        url: "/user/profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Register user */
    registerUser: builder.mutation<IResponse, FormData>({
      query: (formData) => ({
        url: "/user/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Login user */
    login: builder.mutation<ILoginResponse, SignInFormData>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Logout user */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "GET",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Send OTP for password reset */
    sendOtp: builder.mutation<IResponse, { email: string }>({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ** Verify OTP for password reset */
    verifyOtp: builder.mutation<IResponse, { email: string; otpCode: string }>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ** Set new password */
    setNewPassword: builder.mutation<
      IResponse,
      { email: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/change-password",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useSetNewPasswordMutation,
  useUpdateProfileSecondMutation,
} = authApi;
