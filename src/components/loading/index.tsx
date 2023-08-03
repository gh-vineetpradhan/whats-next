import { CircularProgress } from "@mui/material";
import styles from "./index.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <CircularProgress />
    </div>
  );
}
