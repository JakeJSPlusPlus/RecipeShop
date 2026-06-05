"use client"
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";
import { DividerLogin } from "@/app/components/DividerLogin";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Page() {
    const { signIn, errors, fetchStatus } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [isStart, setIsStart] = useState(true);

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsStart(false);
        const { error } = await signIn.password({
            emailAddress,
            password,
        });
        if (error) {
            console.error(JSON.stringify(error, null, 2));
            return;
        }

        if (signIn.status === "complete") {
            await signIn.finalize({
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
                        router.push(url);
                    }
                },
            });
        } else if (signIn.status === "needs_second_factor") {
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
        } else if (signIn.status === "needs_client_trust") {
            // For other second factor strategies,
            // see https://clerk.com/docs/guides/development/custom-flows/authentication/client-trust
            const emailCodeFactor = signIn.supportedSecondFactors.find(
                (factor) => factor.strategy === "email_code",
            );

            if (emailCodeFactor) {
                await signIn.mfa.sendEmailCode();
            }
        } else {
            // Check why the sign-in is not complete
            console.error("Sign-in attempt not complete:", signIn);
        }

    };

    const handleVerify = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn.mfa.verifyEmailCode({ code });

        if (signIn.status === "complete") {
            await signIn.finalize({
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
                        router.push(url);
                    }
                },
            });
        } else {
            // Check why the sign-in is not complete
            console.error("Sign-in attempt not complete:", signIn);
        }
    };

    if (signIn.status === "needs_client_trust") {
        return (
            <>
                <div className="w-[320px] rounded-xl bg-[rgba(17,24,39,1)] p-8 text-[rgba(243,244,246,1)]">
                    <p className="text-center text-2xl font-bold leading-8">
                        Verify your account
                    </p>
                    <form className="my-1" onSubmit={handleVerify}>
                        <div className="mt-1 text-sm leading-5">
                            <label
                                htmlFor="code"
                                className="block text-[rgba(156,163,175,1)] mb-1"
                            >
                                {"Code"}
                            </label>
                            <input
                                className="w-full rounded-md border border-solid border-[rgba(55,65,81,1)] outline-0 bg-[rgba(17,24,39,1)] py-3 px-4 text-[rgba(243,244,246,1)] focus:accent-amber-500"
                                type={"code"}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                id={"code"}
                                name={"code"}
                                placeholder=""
                            />
                        </div>
                        <button
                            className="block w-full bg-amber-500 p-3 text-center text-[rgba(17, 24, 39, 1)] border-0 rounded-md font-semibold hover:cursor-pointer"
                            type="submit"
                            disabled={fetchStatus === "fetching"}
                        >
                            Verify
                        </button>
                    </form>
                    <button
                        className="flex h-10 w-20 rounded-md border items-center justify-center hover:cursor-pointer hover:bg-[rgba(255,255,255,0.2)]"
                        onClick={() => signIn.mfa.sendEmailCode()}
                    >
                        I need a new code
                    </button>
                    <button onClick={() => signIn.reset()}>Start over</button>
                </div>
            </>
        );
    }

    return (
        <div className="w-[330px] rounded-xl bg-[rgba(17,24,39,1)] border-amber-700 border-2 p-8 text-[rgba(243,244,246,1)] md:w-[400px]">
            <p className=" text-center text-2xl font-bold leading-8">Sign In</p>
            <div className="flex w-full flex-col gap-1 leading-5 text-sm items-center text-[rgba(156,163,175,1)] py-4">
                <form className="my-1 w-full md:w-4/5 " onSubmit={handleSubmit}>
                    {/*TODO add custom function to turn clerk error into a readable string*/}
                    {errors && <p>{errors.raw?.map((e) => JSON.stringify((e as { longMessage?: string })?.longMessage, null, 2))}</p>}
                    <div>
                        <div className="mt-1 text-sm leading-5">
                            <label
                                htmlFor="email"
                                className="block text-[rgba(156,163,175,1)] mb-1"
                            >
                                {"Email"}
                            </label>
                            <input
                                className="w-full rounded-md border border-solid border-[rgba(55,65,81,1)] outline-0 bg-[rgba(17,24,39,1)] py-3 px-4 text-[rgba(243,244,246,1)] focus:border-amber-500"
                                type={"email"}
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.currentTarget.value)}
                                id={"email"}
                                name={"email"}
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
                                className="w-full rounded-md border-1 border-solid border-[rgba(55,65,81,1)] outline-0 bg-[rgba(17,24,39,1)] py-3 px-4 text-[rgba(243,244,246,1)] focus:border-amber-500"
                                type={"text"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id={"password"}
                                name={"password"}
                                placeholder=""
                            />
                            {errors.fields.password && (
                                <p>{errors.fields.password.message}</p>
                            )}
                        </div>
                    </div>
                    <div id="clerk-captcha" />
                    {errors.fields.code && <p>{errors.fields.code.longMessage}</p>}
                    <button
                        type="submit"
                        disabled={fetchStatus === "fetching"}
                        className="block w-full mt-6 text-white bg-amber-500 p-3 text-center text-[rgba(17, 24, 39, 1)] border-0 rounded-md font-semibold hover:cursor-pointer"
                    >
                        {"Sign In"}
                    </button>
                </form>
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
          <Link href={"/sign-up"}>{"Sign Up"}</Link>
        </span>
            </p>
        </div>
    );
}