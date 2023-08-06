import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateItemArgs {
  title: string;
  playlistId: string;
  image?: string;
  rating: number;
  userId: string;
  description: string;
  date: string;
}
interface UpdateItemArgs {
  id: string;
  rating?: number;
  hasChecked?: boolean;
  title?: string;
  image?: string;
  playlistId: string;
  description?: string;
  date?: string;
}
interface DeleteItemArgs {
  id: string;
  playlistId: string;
}
export interface Item extends CreateItemArgs {
  _id: string;
  hasChecked: boolean;
}

export const itemApi = createApi({
  reducerPath: "item",
  tagTypes: ["Item"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/item",
  }),
  endpoints: (builder) => ({
    getItems: builder.query<Item[], string>({
      query: (playlistId) => ({
        url: "/",
        params: { playlistId },
        credentials: "include",
      }),
      providesTags: (_res, _err, args) => [{ type: "Item", id: args }],
    }),
    createItem: builder.mutation<string, CreateItemArgs>({
      query: (body) => ({
        url: "/",
        body,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: (res, _err, _args) => (res ? ["Item"] : []),
    }),
    updateItem: builder.mutation<string, UpdateItemArgs>({
      query: ({ id, playlistId, ...body }) => ({
        url: `/${id}`,
        body,
        method: "PATCH",
        credentials: "include",
      }),
      async onQueryStarted(
        { id, playlistId, ...body },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          itemApi.util.updateQueryData("getItems", playlistId, (draft) =>
            draft.map((p) => (p._id === id ? { ...p, ...body } : p))
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteItem: builder.mutation<string, DeleteItemArgs>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      async onQueryStarted({ id, playlistId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          itemApi.util.updateQueryData("getItems", playlistId, (draft) =>
            draft.filter((p) => p._id !== id)
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi;
