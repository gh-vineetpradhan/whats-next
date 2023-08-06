"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "@/store";
import { useCreateItemMutation, useUpdateItemMutation } from "@/store/itemApi";
import { useSession } from "next-auth/react";
import { setModal } from "@/store/appSlice";
import { AnimatePresence } from "framer-motion";

import Loading from "../loading";
import MoviesMenu from "../menu/moviesMenu";
import GamesMenu from "../menu/gamesMenu";
import BooksMenu from "../menu/booksMenu";

import styles from "./index.module.css";
import itemStyles from "./item.module.css";
import Rating from "@mui/material/Rating";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ItemModal() {
  const { modal, nav, activePlaylist, modalItem } = useSelector(
    (state: RootState) => state.app
  );
  const [itemTitle, setItemTitle] = useState("");
  const [itemRating, setItemRating] = useState(
    modal === "Edit Item" ? modalItem.rating : 0
  );
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [errors, setErrors] = useState({ title: "" });

  const [createItem, ciStatus] = useCreateItemMutation();
  const [updateItem, uiStatus] = useUpdateItemMutation();

  useEffect(() => {
    ciStatus.isSuccess && dispatch(setModal(""));
    uiStatus.isSuccess && dispatch(setModal(""));
  }, [ciStatus.isSuccess, uiStatus.isSuccess]);
  useEffect(() => {
    if (ciStatus.isError && "data" in ciStatus.error) {
      setErrors({ ...errors, ...(ciStatus.error.data as {}) });
    } else if (uiStatus.isError && "data" in uiStatus.error) {
      setErrors({ ...errors, ...(uiStatus.error.data as {}) });
    }
  }, [ciStatus.isError || uiStatus.isError]);

  return (
    <div className={styles.playlistForm}>
      {ciStatus.isLoading ? <Loading /> : null}
      <div className={styles.header}>
        {modal === "Add Item"
          ? `Add ${nav.slice(0, nav.length - 1)}`
          : `Edit ${nav}`}
        <IconButton
          onClick={() => dispatch(setModal(""))}
          className="mui-icon-btn"
        >
          <CloseIcon htmlColor="grey" fontSize="small" />
        </IconButton>
      </div>
      {errors.title ? (
        <ul className="errors">
          {errors.title ? <li>{errors.title}</li> : null}
        </ul>
      ) : null}
      <div className={itemStyles.titleWrapper}>
        <div className={itemStyles.inputWrapper}>
          <input
            type="text"
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            placeholder={`Search ${nav}`}
          />
          <CloseIcon
            fontSize="small"
            htmlColor="grey"
            onClick={() => setItemTitle("")}
          />
        </div>
        <AnimatePresence>
          {itemTitle ? (
            nav === "Movies" ? (
              <MoviesMenu title={itemTitle} setTitle={setItemTitle} />
            ) : nav === "Games" ? (
              <GamesMenu title={itemTitle} setTitle={setItemTitle} />
            ) : nav === "Books" ? (
              <BooksMenu title={itemTitle} setTitle={setItemTitle} />
            ) : null
          ) : null}
        </AnimatePresence>
      </div>
      <div className={styles.itemForm}>
        <div className={itemStyles.left}>
          <div className={itemStyles.title}>
            {modalItem.title ? (
              <>
                {modalItem.title} ({modalItem.date})
              </>
            ) : null}
          </div>
          <Image
            src={modalItem.image || "/placeholder.jpg"}
            width={200}
            height={230}
            alt="Item"
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
          />
        </div>
        <div className={styles.vertLine}></div>
        <div className={itemStyles.right}>
          <div className={itemStyles.description}>{modalItem.description}</div>
          <div className={itemStyles.ratingWrapper}>
            <Rating
              name="simple-controlled"
              value={itemRating}
              precision={0.5}
              onChange={(_event, newValue) => {
                if (typeof newValue === "number" && newValue >= 0)
                  setItemRating(newValue);
              }}
              className={itemStyles.rating}
            />
            <span>{itemRating}/5</span>
          </div>
          <div className={itemStyles.btnGrp}>
            <button
              className="contained-btn"
              onClick={() => {
                if (modal === "Add Item") {
                  if (session?.user.id) {
                    createItem({
                      ...modalItem,
                      playlistId: activePlaylist._id,
                      userId: session?.user.id,
                      rating: itemRating,
                    });
                  }
                } else {
                  updateItem({
                    ...modalItem,
                    playlistId: activePlaylist._id,
                    rating: itemRating,
                    id: modalItem._id,
                  });
                }
              }}
            >
              {modal === "Add Item" ? "Add" : "Update"}
            </button>
            {modal === "Edit Item" ? (
              <button
                className="contained-btn"
                onClick={() => dispatch(setModal("Remove Item"))}
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
