"use client";

import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "@/store";

import styles from "./index.module.css";
import itemStyles from "./item.module.css";
import Rating from "@mui/material/Rating";
import { setModal } from "@/store/appSlice";

export default function ItemModal() {
  const [itemTitle, setItemTitle] = useState("");
  const [itemRating, setItemRating] = useState(0);
  const { modal, nav } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.playlistForm}>
      <div className={styles.header}>
        {modal === "Add Item"
          ? `Add ${nav.slice(0, nav.length - 1)}`
          : `Edit ${nav}`}
      </div>
      <div className={styles.itemForm}>
        <div className={itemStyles.left}>
          <input
            type="text"
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            placeholder={`Search ${nav}`}
          />
          <Image src="/oppenheimer.jpg" width={200} height={190} alt="Item" />
        </div>
        <div className={styles.vertLine}></div>
        <div className={itemStyles.right}>
          <div className={styles.ratingWrapper}>
            <Rating
              name="simple-controlled"
              value={itemRating}
              precision={0.5}
              onChange={(_event, newValue) => {
                if (typeof newValue === "number" && newValue >= 0)
                  setItemRating(newValue);
              }}
              className={styles.rating}
            />
            <span>{itemRating}/5</span>
          </div>
          <div className={itemStyles.btnGrp}>
            <button className="contained-btn">
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
