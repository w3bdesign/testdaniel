import Head from "next/head";
import { SignedIn } from "@clerk/nextjs";

import type { ReactNode } from "react";
import type { PaPlayer } from "@/components/features/Production/Production";

import Navbar from "@/components/common/Header/Navbar";
import Information from "@/components/common/Header/Information";
import Footer from "./Footer";

interface ILayoutProps {
  paPlayer?: PaPlayer;
  children: ReactNode;
}

const Layout = ({ paPlayer, children }: ILayoutProps) => {
  return (
    <>
      <Head>
        <title>Earth Doom - www.earthdoom.com</title>
        <meta name="description" content="Generated by Earth Doom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SignedIn>
        <Information paPlayer={paPlayer} />
      </SignedIn>
      <main className="mb-8 flex items-center justify-center md:mb-0 lg:px-[5rem] 2xl:px-0">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
