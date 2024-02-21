import React, { CSSProperties } from "react";
import Head from "next/head";

import Providers from "../pages/providers";
import "@rainbow-me/rainbowkit/styles.css";

import Header from "./Header";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const path = usePathname();
  const styleBg =
    path === "/"
      ? {
          backgroundImage: `url('/images/bg.svg')`,
          height: "full",
          backgroundPosition: "center",
        }
      : undefined;

  return (
    <div
      className="flex-col items-center md:m-8 md:p-1  border-[#252525]  md:border md:rounded-3xl overflow-hidden"
      style={styleBg}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Header />

      <Providers>{children}</Providers>
      {/* {showFooter && <Footer />} */}
    </div>
  );
};

export default Layout;
