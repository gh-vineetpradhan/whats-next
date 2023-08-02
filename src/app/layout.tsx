import "./globals.css";
import { Inter } from "next/font/google";
import RootLayoutClient from "./rootLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} root`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
