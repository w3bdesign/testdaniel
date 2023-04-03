import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { ReactNode } from "react";

import Navbar from "@/components/Header/Navbar";
import Footer from "./Footer";
import Information from "@/components/Header/Information";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const user = useUser();
  return (
    <>
      <Head>
        <title>Earth Doom - www.earthdoom.com</title>
        <meta name="description" content="Generated by Earth Doom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        // Only show navbar when logged in
      }
      {user.isSignedIn && (
        <>
          <Navbar />
          <Information />
        </>
      )}

      {
        // Do this while developing
      }
      <Navbar />
      <Information />
      <main className="flex min-h-[70vh] items-center justify-center xl:min-h-[73vh]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
