import { type NextPage } from "next";
import Head from "next/head";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";

import SignOutButton from "@/components/Auth/SignOut";

const Register: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Earthdoom</title>
        <meta name="description" content="Generated by Earth Doom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {!user.isSignedIn && (
                <SignIn path="/login" routing="path" signUpUrl="/login" />
              )}
              {user.isSignedIn && <SignOutButton />}
              <br />
              <SignUp path="/register" routing="path" signInUrl="/register" />
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
