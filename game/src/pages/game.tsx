import { type NextPage } from "next";
import Head from "next/head";

import { api } from "@/utils/api";

import Navbar from "@/components/Header/Navbar";

const Game: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Earthdoom</title>
        <meta name="description" content="Generated by Earth Doom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex items-center justify-center bg-neutral-900 min-h-screen">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
           
          </div>
        </div>
      </main>
    </>
  );
};

export default Game;