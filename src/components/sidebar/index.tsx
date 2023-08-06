"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, type RootState } from "@/store";
import { useSelector } from "react-redux";
import { useGetPlaylistsQuery } from "@/store/playlistApi";
import { useSession } from "next-auth/react";
import { setActivePlaylist, setModal, setShowSidebar } from "@/store/appSlice";
import Loading from "../loading";

import styles from "./index.module.css";
import PlaylistPlayRoundedIcon from "@mui/icons-material/PlaylistPlayRounded";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { activePlaylist, nav } = useSelector((state: RootState) => state.app);
  const playlists = useGetPlaylistsQuery(nav);
  const { data: session } = useSession();

  useEffect(() => {
    if (playlists.currentData) {
      if (playlists.currentData?.[0])
        dispatch(setActivePlaylist(playlists.currentData[0]));
      else {
        if (session?.user.id)
          dispatch(
            setActivePlaylist({
              title: "",
              type: nav,
              userId: session.user.id,
              _id: "",
            })
          );
      }
    }
  }, [Boolean(playlists.currentData), nav]);

  return (
    <>
      <motion.div
        className={styles.wrapper}
        onClick={() => dispatch(setShowSidebar(false))}
        initial={{ backgroundColor: "rgba(0,0,0,0)" }}
        animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        exit={{ backgroundColor: "rgba(0,0,0,0)" }}
      ></motion.div>
      <motion.div
        className={styles.sidebar}
        initial={{ width: "0px", x: -355 }}
        animate={{ width: "100%", x: 0 }}
        exit={{
          width: "0px",
          x: -355,
          transition: { type: "just" },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {playlists.isLoading || playlists.isFetching ? <Loading /> : null}
        <button
          className={styles.createBtn}
          onClick={() => dispatch(setModal("Create Playlist"))}
        >
          + Add Playlist
        </button>
        <div className={styles.playlists}>
          {playlists.data?.map((playlist, index) => (
            <button
              key={index}
              className={`${styles.playlist} ${
                playlist._id === activePlaylist._id ? styles.activePlaylist : ""
              }`}
              onClick={() => dispatch(setActivePlaylist(playlist))}
            >
              <PlaylistPlayRoundedIcon />
              <span>{playlist.title}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
