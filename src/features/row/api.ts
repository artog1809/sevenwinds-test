import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Row } from "./types";
import { eID } from "../../config";
import { setRowList } from "./rowSlice";


export const rowApi = createApi({
    reducerPath: 'rowApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://185.244.172.108:8081'}),
    tagTypes: ['RowList'],
    endpoints: (builder) => ({
        getRowList: builder.query<Row[], void>({
            query: () => `/v1/outlay-rows/entity/${eID}/row/list`,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                  const data = await queryFulfilled;
                  dispatch(setRowList(data.data));
                } catch (error) {
                  console.error('ERROR', error);
                }
              },
              providesTags: ['RowList']
        }),
        createRow: builder.mutation<{current: Row}, Row>({
            query: (credentials) => ({
                url: `/v1/outlay-rows/entity/${eID}/row/create`,
                method: 'POST',
                body: credentials
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error('ERROR', error);
                }
            },
            invalidatesTags: ['RowList']
        }),
        updateRow: builder.mutation<{current: Row}, Row>({
            query: (credentials) => ({
                url: `/v1/outlay-rows/entity/${eID}/row/${credentials.id}/update`,
                method: 'POST',
                body: credentials
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error('ERROR', error);
                }
            }
        }),
        deleteRow: builder.mutation<void, {id: number}>({
            query: ({id}) => ({
                url: `/v1/outlay-rows/entity/${eID}/row/${id}/delete`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error('ERROR', error);
                }
            }
        })
    })
})

export const { useGetRowListQuery, useCreateRowMutation, useUpdateRowMutation, useDeleteRowMutation } = rowApi