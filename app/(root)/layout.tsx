import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-montserrat",
});
import "../../styles/global.css";
import LeftSidebar from "../../components/shared/leftsidebar";
import Bottombar from "../../components/shared/bottombar";
import RightSidebar from "../../components/shared/rightsidebar";
import Header from "../../components/shared/header";
import { APP_NAME, APP_DESCRIPTION } from "../../constants";
import { dark } from "@clerk/themes";
import Head from "next/head";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#14B8A6" },
      }}
    >
      <html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>

        <body
          className={`${montserrat.variable} ${inter.variable}  bg-primary-500 text-light-2`}
        >
          <Header />
          <main className="flex">
            <LeftSidebar />
            <section className="main-container h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
