"use client";

import { useAppDispatch, type RootState } from "@/store";
import { initialState, setModal, setModalItem } from "@/store/appSlice";
import { useSelector } from "react-redux";
import { useGetItemsQuery, useUpdateItemMutation } from "@/store/itemApi";

import Loading from "@/components/loading";

import Image from "next/image";
import styles from "./page.module.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton, Rating } from "@mui/material";

export default function Home() {
  const { activePlaylist } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const getItems = useGetItemsQuery(activePlaylist._id);
  const [updateItem] = useUpdateItemMutation();

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
        {getItems.isFetching || getItems.isLoading ? <Loading /> : null}
        <div
          className={`${styles.create} ${styles.card}`}
          onClick={() => {
            dispatch(setModal("Add Item"));
            dispatch(setModalItem(initialState.modalItem));
          }}
        >
          <AddRoundedIcon sx={{ fontSize: "4rem" }} />
          <span>Add Projects</span>
        </div>
        {getItems.data?.map((item, index) => (
          <div className={`${styles.item} ${styles.card}`} key={index}>
            {item.hasChecked ? (
              <CheckCircleRoundedIcon className={styles.muiCheckIcon} />
            ) : null}
            <Image
              src={item.image || "/placeholder.jpg"}
              width={148}
              height={190}
              alt="Item"
              placeholder="blur"
              blurDataURL="/placeholder.jpg"
            />
            <span className={styles.title}>
              {item.title}({item.date})
            </span>
            <div className={styles.hovered}>
              <Rating
                name="read-only"
                value={item.rating}
                readOnly
                className={styles.rating}
              />
              <div className={styles.btnGrp}>
                {item.hasChecked ? (
                  <IconButton
                    className={`${styles.muiIconBtn} mui-icon-btn`}
                    onClick={() =>
                      updateItem({
                        id: item._id,
                        playlistId: activePlaylist._id,
                        hasChecked: false,
                      })
                    }
                  >
                    <CheckCircleRoundedIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    className={`${styles.muiIconBtn} mui-icon-btn`}
                    onClick={() =>
                      updateItem({
                        id: item._id,
                        playlistId: activePlaylist._id,
                        hasChecked: true,
                      })
                    }
                  >
                    <CheckCircleOutlineRoundedIcon />
                  </IconButton>
                )}

                <IconButton
                  className={`${styles.muiIconBtn} mui-icon-btn`}
                  onClick={() => {
                    dispatch(setModal("Edit Item"));
                    dispatch(setModalItem(item));
                  }}
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
