"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

import styles from "./index.module.css";

export default function PlaylistModal() {
  const [playlistTitle, setPlaylistTitle] = useState("");
  const modal = useSelector((state: RootState) => state.app.modal);

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles.playlistForm}>
      <div className={styles.header}>
        {modal === "Create Playlist" ? "Create Playlist" : "Edit Playlist"}
      </div>
      <input
        type="text"
        value={playlistTitle}
        onChange={(e) => setPlaylistTitle(e.target.value)}
        placeholder="Title"
      />
      <button className="contained-btn">
        {modal === "Create Playlist" ? "Create" : "Update"}
      </button>
    </form>
  );
}
