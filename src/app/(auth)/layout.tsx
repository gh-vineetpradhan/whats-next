import LayoutClient from "./layoutClient";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutClient>{children}</LayoutClient>;
}
