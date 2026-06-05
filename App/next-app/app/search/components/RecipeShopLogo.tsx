"use client"

import Image from "next/image"

export function RecipeShopLogo() {
    return (
        <div className={"flex justify-center w-full mb-5"}>
            <Image className={"flex"}
                  src={"/Logo.png"}
                  alt={"Recipe Finder logo"}
                  width={600} height={118}
                   style={{height: "auto", width: "40rem"}}
            />
        </div>
    )
}