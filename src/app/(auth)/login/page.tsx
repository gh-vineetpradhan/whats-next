import { Metadata } from "next";
import Login from "./login";

export const metadata: Metadata = {
  title: "What's Next | Login",
};

export default function LoginPage() {
  return (
    <>
      <Login />
    </>
  );
}
