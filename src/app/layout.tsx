import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tx Payment",
  description: "Tx Payment by MessageKit",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
