import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../base-query/baseQueryWithAuth";
import { IResponse } from "@/app/types/responseType";
import { SecurityFormValues } from "@/app/shared/Profile-security/types";

export const updateSecurity = createApi({
  reducerPath: "updateProfile",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["UpdateProfile", "Auth", "User"],
  endpoints: (builder) => ({
    // ** Update user profile
    updateProfile: builder.mutation<IResponse, FormData>({
      query: (formData) => ({
        url: "/user/profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // ** Change password
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

    // ** Update profile security (2FA, etc.)
    updateSecurity: builder.mutation<IResponse, SecurityFormValues>({
      query: (data) => ({
        url: "/profile/security",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useSetNewPasswordMutation,
  useUpdateSecurityMutation,
} = updateSecurity;
