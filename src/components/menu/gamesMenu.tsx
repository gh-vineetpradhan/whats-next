import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store";
import { initialState, setModalItem } from "@/store/appSlice";

import styles from "./index.module.css";

type Props = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
};

export default function GamesMenu(props: Props) {
  const [items, setItems] = useState([]);
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const to = setTimeout(() => setDebouncedTitle(props.title), 500);
    return () => {
      clearTimeout(to);
    };
  }, [props.title]);
  useEffect(() => {
    if (debouncedTitle) {
      (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CORS_ANYWHERE_URL}/https://api.igdb.com/v4/games?search=${debouncedTitle}&fields=name,storyline,first_release_date,cover.url&limit=20`,
          {
            method: "POST",
            headers: {
              "Client-ID": process.env.NEXT_PUBLIC_IGDB_CLIENT_ID || "",
              Authorization: `Bearer ${
                process.env.NEXT_PUBLIC_IGDB_AUTH_TOKEN || ""
              }`,
            },
          }
        );
        const data = await res.json();
        setItems(data);
      })();
    }
  }, [debouncedTitle]);

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0, transition: { type: "just" } }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={styles.list}>
        {items.map((item: any, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => {
              dispatch(
                setModalItem({
                  ...initialState.modalItem,
                  title: item.name,
                  date: `${new Date(item.first_release_date).getFullYear()}`,
                  description: item.storyline,
                  image: item?.cover?.url
                    ? `https:${item.cover.url.replace("t_thumb", "t_720p")}`
                    : "",
                })
              );
              props.setTitle("");
            }}
          >
            <Image
              src={
                item?.cover?.url
                  ? `https:${item.cover.url.replace("t_thumb", "t_logo_med")}`
                  : "/placeholder.jpg"
              }
              width={30}
              height={30}
              alt="Item"
            />
            <span>
              {item.name} ({new Date(item.first_release_date).getFullYear()})
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
