'use client'
import SignInForm from "@/components/auth/sign-in/signInForm";
import React from "react";

export default function page() {

  return (
    <div className="block card flex justify-center items-center  flex-col mt-8">
        <SignInForm />
    </div>
  );
};