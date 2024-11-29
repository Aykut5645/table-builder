import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchTables } from '../apis/tablesApi';

export const tablesApi = createApi({
  reducerPath: 'tables',
  baseQuery: async () => ({ data: null }),
  endpoints: (builder) => ({
    fetchTables: builder.query({
      queryFn: async (_, _queryApi, _extraOptions) => {
        try {
          const data = await fetchTables();
          return { data };
        } catch (err) {
          return { error: { status: 'CUSTOM_ERROR', error: err } };
        }
      },
    }),
  }),
});

export const { useFetchTablesQuery } = tablesApi;
