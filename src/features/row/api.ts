import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Row } from "./types";
import { eID } from "../../config";
import { setRowList } from "./rowSlice";


export const rowApi = createApi({
    reducerPath: 'rowApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://185.244.172.108:8081'}),
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
        })
    })
})

export const { useGetRowListQuery } = rowApi