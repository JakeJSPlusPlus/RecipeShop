"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function SignUpForm() {
    const [otherErrors, setOtherErrors] = useState<string | null>(null);
    const [showCode, setShowCode] = useState(false);
    const { signUp, fetchStatus, errors } = useSignUp();
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const password = formData.get("password") as string;
        const emailAddress = formData.get("email") as string;
        const passwordConfirm = formData.get("passwordConfirm") as string;
        const screenName = formData.get("screenName") as string;

        if (password !== passwordConfirm) {
            setOtherErrors("Passwords don't match");
            return;
        }
        try {
            const { error } = await signUp.password({
                emailAddress,
                password,
                username: screenName,
            });

            if (error) {
                // See https://clerk.com/docs/guides/development/custom-flows/error-handling
                // for more info on error handling
                setOtherErrors(error.message.toString() ?? null);
                console.error(JSON.stringify(error, null, 2));
                setShowCode(false);
                return;
            }

            if (!error) {
                await signUp.verifications.sendEmailCode();
                setShowCode(true);
            }
        } catch (e) {
            console.log(e);
            setShowCode(false);
        }
    };

    const handleVerify = async (formData: FormData) => {
        const code = formData.get("code") as string;

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
                    }

                    // If no session tasks, navigate the signed-in user to the home page
                    const url = decorateUrl("/");
                    if (url.startsWith("http")) {
                        window.location.href = url;
                    } else {
                        router.push("/");
                    }
                },
            });
        } else {
            // Check why the sign-up is not complete
            console.error("Sign-up attempt not complete:", signUp);
        }
    };

    /*if(){
        return (
            <div className="w-full gap-x-2 flex justify-center items-center">
                <div
                    className="w-5 bg-[#d991c2] h-5 rounded-full animate-bounce"
                ></div>
                <div
                    className="w-5 h-5 bg-[#9869b8] rounded-full animate-bounce"
                ></div>
                <div
                    className="w-5 h-5 bg-[#6756cc] rounded-full animate-bounce"
                ></div>
            </div>

        )
    }*/

    if (showCode) {
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
                            disabled={fetchStatus === "fetching"}
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
                            onClick={() => signUp.reset()}
                        >
                            Start over
                        </button>
                    </div>
                    <div id="clerk-captcha" />
                </div>
            </>
        );
    }

    return (
        <>
            <p className={"text-[#ED664E] text-lg font-semibold"}>
                {fetchStatus === "fetching" ? "Submitting..." : otherErrors}
            </p>
            <form className="my-1 w-full md:w-4/5 " action={handleSubmit}>
                <div>
                    <div className="mt-1 text-sm leading-5">
                        <label
                            htmlFor="email"
                            className="block text-[rgba(156,163,175,1)] mb-1"
                        >
                            {"Email"}
                        </label>
                        <input
                            className="w-full rounded-md border-1 border-solid border-[rgba(55,65,81,1)] outline-0 bg-[rgba(17,24,39,1)] py-3 px-4 text-[rgba(243,244,246,1)] focus:border-[rgba(167,139,250,1)]"
                            type={"email"}
                            id={"email"}
                            name={"email"}
                            placeholder=""
                        />
                    </div>
                    <div className="mt-1 text-sm leading-5">
                        <label
                            htmlFor="screenName"
                            className="block text-[rgba(156,163,175,1)] mb-1"
                        >
                            {"Screen name"}
                        </label>
                        <input
                            className="w-full rounded-md border-1 border-solid border-[rgba(55,65,81,1)] outline-0 bg-[rgba(17,24,39,1)] py-3 px-4 text-[rgba(243,244,246,1)] focus:border-[rgba(167,139,250,1)]"
                            type={"text"}
                            id={"screenName"}
                            name={"screenName"}
                            placeholder=""
                        />
                    </div>
                    <div className="mt-1 text-sm leading-5">
                        <label
                            htmlFor="password"
                            className="block text-[rgba(156,163,175,1)] mb-1"
                        >
                            {"Password"}
                        </label>
                        <input
                            className="w-full rounded-md border-1 border-solid border-[rgba(55,65,81,1)] outline-0 bg-[rgba(17,24,39,1)] py-3 px-4 text-[rgba(243,244,246,1)] focus:border-[rgba(167,139,250,1)]"
                            type={"text"}
                            id={"password"}
                            name={"password"}
                            placeholder=""
                        />
                        {errors && <p>{errors.fields.code?.message.toString()}</p>}
                    </div>
                    <div className="mt-1 text-sm leading-5">
                        <label
                            htmlFor={"passwordConfirm"}
                            className="block text-[rgba(156,163,175,1)] mb-1"
                        >
                            {"Confirm Password"}
                        </label>
                        <input
                            className="w-full rounded-md border border-solid border-[rgba(55,65,81,1)] outline-0 bg-[rgba(17,24,39,1)] py-3 px-4 text-[rgba(243,244,246,1)] focus:border-[rgba(167,139,250,1)]"
                            type={"text"}
                            id={"passwordConfirm"}
                            name={"passwordConfirm"}
                            placeholder=""
                        />
                    </div>
                </div>
                {errors && <p>{errors.fields.code?.message.toString()}</p>}
                <button
                    type="submit"
                    disabled={fetchStatus === "fetching"}
                    className="block w-full mt-6 text-white bg-[rgba(167,139,250,1)] p-3 text-center text-[rgba(17, 24, 39, 1)] border-0 rounded-md font-semibold hover:cursor-pointer"
                >
                    {fetchStatus === "fetching" ? (
                        <div className="w-full gap-x-2 flex justify-center items-center">
                            <div className="w-3 h-3 bg-[#d991c2] rounded-full animate-bounce" />
                            <div className="w-3 h-3 bg-[#9869b8] rounded-full animate-bounce" />
                            <div className="w-3 h-3 bg-[#6756cc] rounded-full animate-bounce" />
                        </div>
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </form>
            <div id="clerk-captcha" />
        </>
    );
}