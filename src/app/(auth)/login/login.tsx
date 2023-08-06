"use client";

import { useState, type FormEvent } from "react";
import { Nosifer } from "next/font/google";
import Link from "next/link";
import { signIn } from "next-auth/react";

import styles from "../signup/auth.module.css";

const nosifier = Nosifer({ subsets: ["latin"], weight: "400" });

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (username.length < 6 || username.length > 20) {
      return setErrors((prev) => ({
        ...prev,
        username: "Username is not registered",
      }));
    } else if (password.length < 6) {
      return setErrors((prev) => ({
        ...prev,
        password: "Incorrect Password",
      }));
    }
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.error) {
      setErrors(JSON.parse(res.error));
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={`${styles.logo} ${nosifier.className}`}>WN</div>
      {errors.username || errors.password ? (
        <ul className="errors">
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
      <button className="contained-btn">Login</button>
      <span className="fs-small">
        Doesn&apos;t have an account? <Link href="/signup">Signup</Link>
      </span>
    </form>
  );
}
