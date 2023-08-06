import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import appReducer from "./appSlice";
import { playlistApi } from "./playlistApi";
import { itemApi } from "./itemApi";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playlistApi.middleware, itemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
