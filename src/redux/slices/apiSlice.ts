import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import TokenService from "../../config/TokenService";
import { UserProfileType, UserWalletType } from "../../types/userProfileType";

const { baseUrl } = config;
const userToken = TokenService.getLocalAccessToken();
console.log(`UserToken: ${userToken}`);
console.log(baseUrl);
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers: HeadersInit) => {
    const token = userToken;
    console.log("header token", token);

    const updatedHeaders = new Headers(headers);

    if (token) {
      updatedHeaders.set("Authorization", `Bearer ${token}`);
    }

    return updatedHeaders;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `Account/Register`,
        method: "POST",
        body: body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `Account/Authenticate`,
        method: "POST",
        body: body,
      }),
    }),
    activation: builder.mutation({
      query: (body) => ({
        url: `Account/ConfirmActivationCode`,
        method: "POST",
        body: body,
      }),
    }),
    getUserProfile: builder.query<UserProfileType, void>({
      query: () => ({
        url: `User/Profile`,
        method: "GET",
      }),
    }),
    getUserWallet: builder.query<UserWalletType, void>({
      query: () => ({
        url: `Wallet/MyWallet`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useActivationMutation,
  useGetUserProfileQuery,
  useGetUserWalletQuery,
} = apiSlice;
