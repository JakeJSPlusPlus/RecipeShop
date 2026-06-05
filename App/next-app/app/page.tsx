"use client"

import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL
import { Show} from "@clerk/nextjs"
export default function Home() {
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <h1>Welcome</h1>
            <h3>Sign in to get started</h3>
            <Show when={"signed-in"}>
                <Link href={"/search"}>
                    <button className={"bg-amber-500 hover:bg-amber-600 text-white font-bold py-10 px-10 rounded-lg"}>
                        Search<br />Recipes

                    </button>
                </Link>
            </Show>
        </div>
  );
}


