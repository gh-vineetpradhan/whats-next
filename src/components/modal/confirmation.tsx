import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "@/store";
import { setModal } from "@/store/appSlice";

import styles from "./index.module.css";
import cStyles from "./confirmation.module.css";

export default function ConfirmationModal() {
  const { modal } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.playlistForm}>
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
        <button className="contained-btn">Yes</button>
      </div>
    </div>
  );
}
