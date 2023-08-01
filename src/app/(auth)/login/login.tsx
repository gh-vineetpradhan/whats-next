"use client";

import { useState, type FormEvent } from "react";
import { Nosifer } from "next/font/google";
import Link from "next/link";

import styles from "../signup/auth.module.css";

const nosifier = Nosifer({ subsets: ["latin"], weight: "400" });

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={`${styles.logo} ${nosifier.className}`}>WN</div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button className="contained-btn">Login</button>
      <span className="fs-small">
        Doesn't have an account? <Link href="/signup">Signup</Link>
      </span>
    </form>
  );
}
