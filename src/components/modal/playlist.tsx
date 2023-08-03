"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "@/store";
import {
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
} from "@/store/playlistApi";
import { setModal } from "@/store/appSlice";

import styles from "./index.module.css";
import Loading from "../loading";

export default function PlaylistModal() {
  const [errors, setErrors] = useState({ title: "" });
  const { modal, nav, activePlaylist } = useSelector(
    (state: RootState) => state.app
  );
  const [playlistTitle, setPlaylistTitle] = useState(
    activePlaylist.title || ""
  );
  const [createPlaylist, cpStatus] = useCreatePlaylistMutation();
  const [updatePlaylist, upStatus] = useUpdatePlaylistMutation();
  const dispatch = useAppDispatch();

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!playlistTitle) {
      setErrors((prev) => ({ ...prev, title: "Please enter a title" }));
    }
    if (modal === "Create Playlist") {
      createPlaylist({ title: playlistTitle, type: nav });
    }
    if (modal === "Edit Playlist") {
      updatePlaylist({
        title: playlistTitle,
        id: activePlaylist._id,
        type: nav,
      });
    }
  };

  useEffect(() => {
    cpStatus.isSuccess && dispatch(setModal(""));
    upStatus.isSuccess && dispatch(setModal(""));
  }, [cpStatus.isSuccess, upStatus.isSuccess]);
  useEffect(() => {
    if (cpStatus.isError && "data" in cpStatus.error) {
      setErrors({ ...errors, ...(cpStatus.error.data as {}) });
    } else if (upStatus.isError && "data" in upStatus.error) {
      setErrors({ ...errors, ...(upStatus.error.data as {}) });
    }
  }, [cpStatus.isError || upStatus.isError]);

  return (
    <form onSubmit={formSubmitHandler} className={styles.playlistForm}>
      {cpStatus.isLoading ? <Loading /> : null}
      <div className={styles.header}>
        {modal === "Create Playlist" ? "Create Playlist" : "Edit Playlist"}
      </div>
      {errors.title ? (
        <ul className="errors">
          {errors.title ? <li>{errors.title}</li> : null}
        </ul>
      ) : null}
      <input
        type="text"
        value={playlistTitle}
        onChange={(e) => setPlaylistTitle(e.target.value)}
        placeholder="Title"
        maxLength={40}
      />
      <button className="contained-btn">
        {modal === "Create Playlist" ? "Create" : "Update"}
      </button>
    </form>
  );
}
