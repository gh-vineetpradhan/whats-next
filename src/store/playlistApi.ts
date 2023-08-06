import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreatePlaylistArgs {
  title: string;
  type: "Games" | "Books" | "Movies";
}
interface UpdatePlaylistArgs {
  id: string;
  title?: string;
  type: string;
}
export interface Playlist extends CreatePlaylistArgs {
  _id: string;
  userId: string;
}

export const playlistApi = createApi({
  reducerPath: "playlist",
  tagTypes: ["Playlists"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/playlist",
  }),
  endpoints: (builder) => ({
    getPlaylists: builder.query<Playlist[], string>({
      query: (type) => ({
        url: "/",
        params: { type },
        credentials: "include",
      }),
      providesTags: (_res, _err, args) => [{ type: "Playlists", id: args }],
    }),
    createPlaylist: builder.mutation<string, CreatePlaylistArgs>({
      query: (body) => ({
        url: "/",
        body,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: (res, _err, _args) => (res ? ["Playlists"] : []),
    }),
    updatePlaylist: builder.mutation<string, UpdatePlaylistArgs>({
      query: ({ id, type, ...body }) => ({
        url: `/${id}`,
        body,
        method: "PATCH",
        credentials: "include",
      }),
      async onQueryStarted(
        { id, type, ...body },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          playlistApi.util.updateQueryData("getPlaylists", type, (draft) =>
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
    deletePlaylist: builder.mutation<string, { id: string; type: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      async onQueryStarted({ id, type }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          playlistApi.util.updateQueryData("getPlaylists", type, (draft) =>
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
  useGetPlaylistsQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistApi;
