"use client"
import { useEffect } from "react"
import "./globals.css"

export default function Error({
      error,
      unstable_retry,
    }: {
        error: Error & { digest?: string }
        unstable_retry: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <html lang="en">
            <body>
                <div>
                    <h1 className={"text-red-500 text-3xl"}>An error occurred: {error.message}</h1>
                </div>
            </body>
        </html>
    )
}