"use client"
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";
import { DividerLogin } from "@/app/components/DividerLogin";

import {SignUpForm} from "@/app/sign-up/[[...sign-up]]/components/SignUpForm";

export default function Page() {

    return (
        <div className="w-[330px] rounded-xl bg-[rgba(17,24,39,1)] border-[#56E39F] border-2 p-8 text-[rgba(243,244,246,1)] md:w-[400px]">
            <p className=" text-center text-2xl font-bold leading-8">Sign Up</p>
            <div className="flex w-full flex-col gap-1 leading-5 text-sm items-center text-[rgba(156,163,175,1)] py-4">
                <SignUpForm  />
                <DividerLogin />
            </div>
            <div className="flex justify-center gap-2 p-2">
                <button className="flex h-10 w-30 rounded-md border items-center justify-center hover:cursor-pointer hover:bg-[rgba(255,255,255,0.2)]">
                    <FcGoogle size={25} />
                </button>
                <button className="flex h-10 w-30 rounded-md border items-center justify-center hover:cursor-pointer hover:bg-[rgba(255,255,255,0.2)]">
                    <FaApple size={25} />
                </button>
            </div>
            <p className="text-center text-xs text-[rgba(156,163,175,1)]">
                {"Already have an account? "}
                <span className="hover:decoration-[rgba(167,139,250,1)] font-semibold underline hover:cursor-pointer leading-4">
          <Link href={"/sign-in"}>{"Sign In"}</Link>
        </span>
            </p>
        </div>
    );
}