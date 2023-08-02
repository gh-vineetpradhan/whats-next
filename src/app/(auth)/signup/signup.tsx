"use client";

import { useState, type FormEvent } from "react";
import { Nosifer } from "next/font/google";
import Link from "next/link";
import { signIn } from "next-auth/react";

import styles from "./auth.module.css";

const nosifier = Nosifer({ subsets: ["latin"], weight: "400" });

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (username.length < 6) {
      return setErrors((prev) => ({
        ...prev,
        username: "Minimum username length is 6 characters",
      }));
    } else if (username.length > 20) {
      return setErrors((prev) => ({
        ...prev,
        username: "Maximum username length is 20 characters",
      }));
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return setErrors((prev) => ({
        ...prev,
        username: "Username can only contains alphabets and numbers",
      }));
    } else if (password.length < 6) {
      return setErrors((prev) => ({
        ...prev,
        password: "Minimum password length is 6 characters",
      }));
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      signIn("credentials", {
        username,
        password,
        redirect: false,
      });
    } else {
      const errors = await res.json();
      setErrors(errors);
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={`${styles.logo} ${nosifier.className}`}>WN</div>
      {errors.username || errors.password ? (
        <ul className={styles.errors}>
          {errors.username ? <li>{errors.username}</li> : null}
          {errors.password ? <li>{errors.password}</li> : null}
        </ul>
      ) : null}
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          errors.username && setErrors((prev) => ({ ...prev, username: "" }));
        }}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          errors.password && setErrors((prev) => ({ ...prev, password: "" }));
        }}
        placeholder="password"
      />
      <button className="contained-btn">Signup</button>
      <span className="fs-small">
        Already have an account? <Link href="/login">Login</Link>
      </span>
    </form>
  );
}
