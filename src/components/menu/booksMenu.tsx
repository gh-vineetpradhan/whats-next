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

export default function BooksMenu(props: Props) {
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
          `${process.env.NEXT_PUBLIC_CORS_ANYWHERE_URL}/https://www.googleapis.com/books/v1/volumes?q=${debouncedTitle}&maxResults=20`
        );
        const data = await res.json();
        setItems(data.items);
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
                  title: item.volumeInfo.title,
                  date: `${item.volumeInfo.publishedDate?.slice(0, 4)})`,
                  description: item.volumeInfo.description,
                  image: item.volumeInfo.imageLinks?.thumbnail
                    ? item.volumeInfo.imageLinks.thumbnail
                    : "",
                })
              );
              props.setTitle("");
            }}
          >
            <Image
              src={
                item.volumeInfo.imageLinks?.smallThumbnail
                  ? item.volumeInfo.imageLinks.smallThumbnail
                  : "/placeholder.jpg"
              }
              width={30}
              height={30}
              alt="Item"
            />
            <span>
              {item.volumeInfo.title} (
              {item.volumeInfo.publishedDate?.slice(0, 4)})
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
