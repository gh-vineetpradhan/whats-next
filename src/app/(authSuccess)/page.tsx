import { Metadata } from "next";
import Home from "./home";

export const metadata: Metadata = {
  title: "What's Next",
};

export default function Homepage() {
  return (
    <>
      <Home />
    </>
  );
}
