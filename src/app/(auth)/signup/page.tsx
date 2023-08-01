import { Metadata } from "next";
import Signup from "./signup";

export const metadata: Metadata = {
  title: "What's Next | Signup",
};

export default function SignupPage() {
  return (
    <>
      <Signup />
    </>
  );
}
