import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
import { APP_NAME, APP_DESCRIPTION } from "../../constants/index";

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
        <body
          className={`${montserrat.variable} ${inter.variable}  bg-primary-500 text-light-2`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
