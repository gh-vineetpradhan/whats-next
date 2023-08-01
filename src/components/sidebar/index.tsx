"use client";

import { motion } from "framer-motion";
import { useAppDispatch, type RootState } from "@/store";
import { useSelector } from "react-redux";
import { setActivePlaylist, setModal, setShowSidebar } from "@/store/appSlice";

import styles from "./index.module.css";
import PlaylistPlayRoundedIcon from "@mui/icons-material/PlaylistPlayRounded";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const activePlaylist = useSelector(
    (state: RootState) => state.app.activePlaylist
  );

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
        <button
          className={styles.createBtn}
          onClick={() => dispatch(setModal("Create Playlist"))}
        >
          + Add Playlist
        </button>
        <div className={styles.playlists}>
          {[...Array(20)].map((_d, index) => (
            <button
              key={index}
              className={`${styles.playlist} ${
                index === activePlaylist ? styles.activePlaylist : ""
              }`}
              onClick={() => dispatch(setActivePlaylist(index))}
            >
              <PlaylistPlayRoundedIcon />
              <span>
                Playlist dash dsaiu hdsauid sahuidsah duisah duisah saiuh
                duisahd asuih ad {index}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
