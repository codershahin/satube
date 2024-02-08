"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
type Props = {};

const SocialLogin = (props: Props) => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Button
        onClick={() => signIn("google")}
        className="hover:scale-105"
        variant={"destructive"}
      >
        Sign in With Google
      </Button>
    </div>
  );
};

export default SocialLogin;
