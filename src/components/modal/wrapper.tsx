"use client";

import { useRef, type ReactNode } from "react";
import useCloseOnOutsideClick from "@/hooks/useCloseOnOutsideClick";
import { useAppDispatch } from "@/store";
import { setModal } from "@/store/appSlice";
import { motion } from "framer-motion";

import styles from "./index.module.css";

type Props = {
  children: ReactNode;
};

export default function Wrapper(props: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useCloseOnOutsideClick(modalRef, () => dispatch(setModal("")));

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modal}
        ref={modalRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {props.children}
      </motion.div>
    </motion.div>
  );
}
