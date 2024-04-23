import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Title from "./components/title";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BURNOUT",
  description: "Mini game created for a technical interview at Tricky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Title />
        <div className="w-2/3 mx-auto">{children}</div>
      </body>
    </html>
  );
}
