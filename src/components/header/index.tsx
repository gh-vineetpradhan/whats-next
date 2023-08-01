import { useAppDispatch, type RootState } from "@/store";
import { useSelector } from "react-redux";
import { setModal, setNav, setShowSidebar } from "@/store/appSlice";

import { Nosifer } from "next/font/google";
import styles from "./index.module.css";
import { IconButton } from "@mui/material";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import VideogameAssetRoundedIcon from "@mui/icons-material/VideogameAssetRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const nosifier = Nosifer({ subsets: ["latin"], weight: "400" });

export default function Header() {
  const dispatch = useAppDispatch();
  const { nav, showSidebar } = useSelector((state: RootState) => state.app);

  return (
    <header className={styles.header}>
      <div className={`${styles.logo} ${nosifier.className}`}>
        <IconButton
          className="mui-icon-btn"
          onClick={() => dispatch(setShowSidebar(!showSidebar))}
        >
          <MenuRoundedIcon htmlColor="rgb(234, 234, 234)" />
        </IconButton>
        <span>WN</span>
      </div>
      <nav className={styles.nav}>
        <button
          className={`fs-small ${styles.navItem} ${
            nav === "Movies" ? styles.activeNav : ""
          }`}
          onClick={() => dispatch(setNav("Movies"))}
        >
          <MovieRoundedIcon fontSize="small" />
          <span>Movies</span>
        </button>
        <button
          className={`fs-small ${styles.navItem} ${
            nav === "Games" ? styles.activeNav : ""
          }`}
          onClick={() => dispatch(setNav("Games"))}
        >
          <VideogameAssetRoundedIcon fontSize="small" />
          <span>Games</span>
        </button>
        <button
          className={`fs-small ${styles.navItem} ${
            nav === "Songs" ? styles.activeNav : ""
          }`}
          onClick={() => dispatch(setNav("Songs"))}
        >
          <LibraryMusicRoundedIcon fontSize="small" />
          <span>Songs</span>
        </button>
        <button
          className={`fs-small ${styles.navItem} ${
            nav === "Books" ? styles.activeNav : ""
          }`}
          onClick={() => dispatch(setNav("Books"))}
        >
          <LibraryBooksRoundedIcon fontSize="small" />
          <span>Books</span>
        </button>
      </nav>
      <button
        className={`fs-small ${styles.navItem}`}
        onClick={() => dispatch(setModal("Logout"))}
      >
        <LogoutRoundedIcon fontSize="small" />
        <span className="fs-small">Logout</span>
      </button>
    </header>
  );
}
