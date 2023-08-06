import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Playlist } from "./playlistApi";
import { Item } from "./itemApi";

export interface AppState {
  showSidebar: boolean;
  modal:
    | "Create Playlist"
    | "Edit Playlist"
    | "Add Item"
    | "Delete Playlist"
    | "Remove Item"
    | "Edit Item"
    | "Logout"
    | "";
  nav: "Movies" | "Books" | "Games";
  activePlaylist: Playlist;
  modalItem: Item;
}

export const initialState: AppState = {
  showSidebar: true,
  modal: "",
  nav: "Movies",
  activePlaylist: { title: "", type: "Movies", userId: "", _id: "" },
  modalItem: {
    title: "",
    userId: "",
    _id: "",
    hasChecked: false,
    rating: 0,
    playlistId: "",
    date: "",
    description: "",
  },
};

export const appSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
    setModal: (
      state,
      action: PayloadAction<
        | "Create Playlist"
        | "Edit Playlist"
        | "Add Item"
        | "Edit Item"
        | "Delete Playlist"
        | "Remove Item"
        | "Logout"
        | ""
      >
    ) => {
      state.modal = action.payload;
    },
    setNav: (state, action: PayloadAction<"Movies" | "Books" | "Games">) => {
      state.nav = action.payload;
    },
    setActivePlaylist: (state, action: PayloadAction<Playlist>) => {
      state.activePlaylist = action.payload;
    },
    setModalItem: (state, action: PayloadAction<Item>) => {
      state.modalItem = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowSidebar,
  setModal,
  setNav,
  setActivePlaylist,
  setModalItem,
} = appSlice.actions;

export default appSlice.reducer;
