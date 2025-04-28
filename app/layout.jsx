import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footerpage from "./Footer/page";
import Navigationber from "./Navbar/page";
import ScrollToTop from "./Scroolbar/page";
import Transition from "./components/Transition/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "baus-physiotherapie ",
  description: "Holistische Physiotherapie auf dem neusten Stand der Wissenschaft",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Transition>
          <Navigationber />
          {children}
          <ScrollToTop />
          <Footerpage />
        </Transition>
      </body>
    </html>
  );
}
