"use client";

import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Wrapper from "@/components/modal/wrapper";
import PlaylistModal from "@/components/modal/playlist";
import ItemModal from "@/components/modal/item";
import ConfirmationModal from "@/components/modal/confirmation";

import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { showSidebar, modal } = useSelector((state: RootState) => state.app);

  return (
    <>
      <Header />
      <div className={styles.main}>
        <AnimatePresence>{showSidebar ? <Sidebar /> : null}</AnimatePresence>
        {children}
      </div>
      <AnimatePresence>
        {modal ? (
          <Wrapper>
            {modal === "Create Playlist" || modal === "Edit Playlist" ? (
              <PlaylistModal />
            ) : null}
            {modal === "Add Item" || modal === "Edit Item" ? (
              <ItemModal />
            ) : null}
            {modal === "Logout" ||
            modal === "Remove Item" ||
            modal === "Delete Playlist" ? (
              <ConfirmationModal />
            ) : null}
          </Wrapper>
        ) : null}
      </AnimatePresence>
    </>
  );
}
