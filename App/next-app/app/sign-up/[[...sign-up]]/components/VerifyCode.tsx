"use client"

import {JSX, useState} from "react";
import { SignUpFutureResource} from "@clerk/nextjs/types"
import {useAuth, useUser} from "@clerk/nextjs";

interface VerifyCodeProps {
    signUp: SignUpFutureResource;
    routerAction : () => void;
    signUpStatus : "fetching" | "idle";

}

export function VerifyCode({signUp, routerAction, signUpStatus}: VerifyCodeProps): JSX.Element {
    const [code, setCode] = useState("");
    const {isSignedIn} = useAuth();
    const {user} = useUser();

    const handleVerify = async (formData: FormData) => {

        await signUp.verifications.verifyEmailCode({
            code,
        });
        if (signUp.status === "complete") {
            await signUp.finalize({
                // Redirect the user to the home page after signing up
                navigate: ({ session, decorateUrl }) => {
                    // Handle session tasks
                    // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                    if (session?.currentTask) {
                        console.log(session?.currentTask);
                        return;
                    }

                    // If no session tasks, navigate the signed-in user to the home page
                    const url = decorateUrl("/");
                    if (url.startsWith("http")) {
                        window.location.href = url;
                    } else {
                        routerAction()
                    }
                },
            });
        } else {
            // Check why the sign-up is not complete
            console.error("Sign-up attempt not complete:", signUp);
        }
    };

    return (
        <>

            <div className="w-[320px] rounded-xl bg-[rgba(17,24,39,1)] p-8 text-[rgba(243,244,246,1)]">
                <p className="text-center text-2xl font-bold leading-8">
                    Verify your account
                </p>
                <form className="my-1" action={handleVerify}>
                    <div className="mt-1 text-sm leading-5 mb-4">
                        <label
                            htmlFor="code"
                            className="block text-[rgba(156,163,175,1)] mb-1"
                        >
                            {"Code"}
                        </label>
                        <input
                            className="w-full rounded-md border-1 border-solid border-[rgba(55,65,81,1)] outline-0 bg-[rgba(17,24,39,1)] py-3 px-4 text-[rgba(243,244,246,1)] focus:border-[rgba(167,139,250,1)]"
                            type={"code"}
                            id={"code"}
                            name={"code"}
                            placeholder=""
                        />
                    </div>
                    <button
                        className="block mb-4 w-full bg-[rgba(167,139,250,1)] p-3 text-center text-[rgba(17, 24, 39, 1)] border-0 rounded-md font-semibold hover:cursor-pointer"
                        type="submit"
                        disabled={signUpStatus === "fetching"}
                    >
                        Verify
                    </button>
                </form>
                <div className={"flex flex-row justify-between"}>
                    <button
                        className="w-30 p-1 rounded-md border items-center justify-center hover:cursor-pointer hover:bg-[rgba(255,255,255,0.2)]"
                        onClick={() => signUp.verifications.sendEmailCode()}
                    >
                        I need a new code
                    </button>
                    <button
                        className=" w-30 p-1 rounded-md border items-center justify-center hover:cursor-pointer hover:bg-[rgba(255,255,255,0.2)]"
                        onClick={() => signUp.reset()}>Start over
                    </button>
                </div>
            </div>
        </>
    )
}