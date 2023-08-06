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

export default function MoviesMenu(props: Props) {
  const [items, setItems] = useState([]);
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const to = setTimeout(() => setDebouncedTitle(props.title), 1000);
    return () => {
      clearTimeout(to);
    };
  }, [props.title]);
  useEffect(() => {
    if (debouncedTitle) {
      (async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${debouncedTitle}&include_adult=false&language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_AUTH_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        setItems(data.results);
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
                  title: item.title,
                  date: item.release_date.slice(0, 4),
                  description: item.overview,
                  image: item.poster_path
                    ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
                    : "",
                })
              );
              props.setTitle("");
            }}
          >
            <Image
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
                  : "/placeholder.jpg"
              }
              width={30}
              height={30}
              alt="Item"
            />
            <span>
              {item.title} ({item.release_date.slice(0, 4)})
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
