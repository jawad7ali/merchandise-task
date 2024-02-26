'use client'
import React, { Suspense } from "react";
import Loading from "../loading";
import SignUpForm from "@/components/auth/sign-up/SignUpForm";

export default function page() {
 
  return (
    <Suspense fallback={<Loading />}>
      <div className="card flex justify-center items-center  flex-col mt-8">
        <SignUpForm />
      </div>
    </Suspense>
  );
};