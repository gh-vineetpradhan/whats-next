import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "@/store";
import { setModal } from "@/store/appSlice";
import { signOut } from "next-auth/react";
import { useDeletePlaylistMutation } from "@/store/playlistApi";
import { useDeleteItemMutation } from "@/store/itemApi";

import styles from "./index.module.css";
import cStyles from "./confirmation.module.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ConfirmationModal() {
  const { modal, activePlaylist, nav, modalItem } = useSelector(
    (state: RootState) => state.app
  );
  const dispatch = useAppDispatch();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [deleteItem] = useDeleteItemMutation();

  return (
    <div className={styles.playlistForm}>
      <div className={styles.header}>
        Are you sure?
        <IconButton
          onClick={() => dispatch(setModal(""))}
          className="mui-icon-btn"
        >
          <CloseIcon htmlColor="grey" fontSize="small" />
        </IconButton>
      </div>
      {modal === "Logout" ? (
        <span className="fs-small">Do you want to Logout?</span>
      ) : null}
      {modal === "Delete Playlist" ? (
        <span className="fs-small">Do you want to delete this playlist?</span>
      ) : null}
      {modal === "Remove Item" ? (
        <span className="fs-small">Do you want to remove this item?</span>
      ) : null}
      <div className={cStyles.btnGrp}>
        <button
          className="contained-btn"
          onClick={() => dispatch(setModal(""))}
        >
          No
        </button>
        {modal === "Logout" ? (
          <button className="contained-btn" onClick={() => signOut()}>
            Yes
          </button>
        ) : null}
        {modal === "Delete Playlist" ? (
          <button
            className="contained-btn"
            onClick={() => {
              deletePlaylist({ id: activePlaylist._id, type: nav });
              dispatch(setModal(""));
            }}
          >
            Yes
          </button>
        ) : null}
        {modal === "Remove Item" ? (
          <button
            className="contained-btn"
            onClick={() => {
              deleteItem({ id: modalItem._id, playlistId: activePlaylist._id });
              dispatch(setModal(""));
            }}
          >
            Yes
          </button>
        ) : null}
      </div>
    </div>
  );
}
