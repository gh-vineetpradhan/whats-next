"use client";

import { useState } from "react";
import { useAppDispatch, type RootState } from "@/store";
import { setModal } from "@/store/appSlice";
import { useSelector } from "react-redux";

import Image from "next/image";
import styles from "./page.module.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";

export default function Home() {
  const [check, setCheck] = useState([...Array(20).fill(false)]);
  const { activePlaylist } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div className={styles.hTitle}>{activePlaylist.title}</div>
        <div className={styles.hBtnGrp}>
          <IconButton
            className="mui-icon-btn"
            onClick={() => dispatch(setModal("Edit Playlist"))}
          >
            <EditRoundedIcon htmlColor="rgb(234, 234, 234)" fontSize="small" />
          </IconButton>
          <IconButton
            className="mui-icon-btn"
            onClick={() => dispatch(setModal("Delete Playlist"))}
          >
            <DeleteRoundedIcon
              htmlColor="rgb(234, 234, 234)"
              fontSize="small"
            />
          </IconButton>
        </div>
      </div>
      <div className={styles.items}>
        <div
          className={`${styles.create} ${styles.card}`}
          onClick={() => dispatch(setModal("Add Item"))}
        >
          <AddRoundedIcon sx={{ fontSize: "4rem" }} />
          <span>Add Projects</span>
        </div>
        {[...Array(20)].map((_d, index) => (
          <div className={`${styles.item} ${styles.card}`} key={index}>
            {check[index] ? (
              <CheckCircleRoundedIcon className={styles.muiCheckIcon} />
            ) : null}
            <Image src="/oppenheimer.jpg" width={148} height={190} alt="Item" />
            <span className={styles.title}>Oppenheimer</span>
            <div className={styles.hovered}>
              <span className={styles.rating}>
                <StarRoundedIcon />
                <span>4.7/5</span>
              </span>
              <div className={styles.btnGrp}>
                <IconButton
                  className={`${styles.muiIconBtn} mui-icon-btn`}
                  onClick={() =>
                    setCheck((prev) => [
                      ...prev.slice(0, index),
                      !prev[index],
                      ...prev.slice(index + 1),
                    ])
                  }
                >
                  {check[index] ? (
                    <CheckCircleRoundedIcon />
                  ) : (
                    <CheckCircleOutlineRoundedIcon />
                  )}
                </IconButton>
                <IconButton
                  className={`${styles.muiIconBtn} mui-icon-btn`}
                  onClick={() => dispatch(setModal("Edit Item"))}
                >
                  <EditRoundedIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
