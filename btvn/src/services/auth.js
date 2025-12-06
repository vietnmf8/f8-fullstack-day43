import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        /* Lấy thông tin người dùng */
        me: builder.query({
            query: () => "/auth/me",
        }),

        devices: builder.query({
            query: () => "/auth/devices",
        }),

        /* Đăng nhập */
        login: builder.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useMeQuery, useDevicesQuery } = authApi;
