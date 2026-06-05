"use client"
import {useState, useEffect, useRef} from "react";
import type {Recipe} from "@/app/types";
import RecipePage from "./components/RecipePage";
import Search from "./components/Search";
import Results from "./components/ResultGrid"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
    const [difficulty, setDifficulty] = useState<string>("")
    const [cuisine, setCuisine] = useState<string>("")
    const [dietary_tag, setDietaryTag] = useState<string>("")
    const [meal_type, setMealType] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [per_page, setPerPage] = useState<number>(9)
    const [page, setPage] = useState<number>(1)
    const [search_results, setSearchResults] = useState<Recipe[]>([])
    const [is_show_recipes, setIsShowRecipes] = useState<boolean>(false)
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isBackRedirect, setIsBackRedirect] = useState<boolean>(false)

    const isFirstRender = useRef(true);
    //const [servings, setServings] = useState<string | null>(null)

    useEffect(() => {
        if (!isBackRedirect){
            return
        }
        handleSubmit()
    }, [page])

    const handleSubmit = async () => {
        //This network request is awaited in the server, as it requests from another external resource.
        //Since the request could go a bit longer for a response, we need to give it more than the default time
        //We set it below
        if (name === "") {
            setError("Please enter a name")
            return
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort("Timeout"), 5000);


        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        const body = JSON.stringify({difficulty, name, cuisine, dietary_tag, meal_type, per_page, page})

        try {
            const response = await fetch((API_URL ?? "https://api.scale-proof.com") + "/search", {
                method: "POST",
                headers: headers,
                body: body,
                signal: controller.signal
            }).catch((error) => {
                //if the promise is rejected, the error is thrown
                //we don't need to throw an error here because the if statements below will handle appropriately
                console.log(error)
            })

            clearTimeout(timeoutId);

            if (!response) {
                //Response is not defined, which means the Promise of the fetch failed
                //Mark it as a server error
                setError("Server Error")
                return
            }
            if (!response.ok) {
                //http response is not 2xx, throw an error to prevent runtime issues
                setError("Bad HTTP response")
                return
            }

            const data = await response.json()
            if (!Array.isArray(data.data) || data.data.length === 0) {
                //No recipes found if the array is empty
                setError("No recipes found")
                return
            }
            const arr_recipes: Recipe[] = data.data
            setSearchResults(arr_recipes)
            setIsShowRecipes(true)
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unknown error occurred")
            }

        }
    }

    const handleBackAction = () => {
        setIsShowRecipes(false)
        setName("")
        setDifficulty("")
        //setServings("")
        setSearchResults([])
        setCuisine("")
        setIsBackRedirect(true)
    }

    if (error) {
        return (
            <div className={"flex flex-col w-full h-full items-center justify-center"}>
                <div className={"text-red-700 text-3xl flex justify-center w-full pb-5"}>{error}</div>
                <div>
                    <button
                        className={"flex bg-amber-400 w-fit hover:bg-amber-500 text-white font-bold py-2 px-4 rounded"}
                        onClick={() => {
                            setError(null)
                            setIsShowRecipes(false)
                            setSelectedRecipeIndex(null)
                            setDifficulty("")
                            //setServings("")
                            setName("")
                            setSearchResults([])
                        }}
                    >Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <main className="flex w-full xs:w-1/2 items-center py-10 bg-white dark:bg-black">
            {selectedRecipeIndex === null ?
                !is_show_recipes ?
                    //======================================
                    //            Search Page
                    //======================================
                    <Search
                        difficulty={difficulty}
                        cuisine={cuisine}
                        dietary_tag={dietary_tag}
                        meal_type={meal_type}
                        name={name}
                        setDifficultyAction={setDifficulty}
                        setCuisineAction={setCuisine}
                        setDietaryTagAction={setDietaryTag}
                        setMealTypeAction={setMealType}
                        setNameAction={setName}
                        handleSubmitAction={handleSubmit}
                    />
                    : //Show recipes = TRUE and selectedRecipeIndex is null

                    //=======================================
                    //            Results Page
                    //=======================================
                    <Results
                        items={search_results}
                        setItemIndex={setSelectedRecipeIndex}
                        backAction={handleBackAction}
                        page={page}
                        setPageAction={setPage}
                    />
                : //Selected Recipe Index is not null

                //=======================================
                //            Single Recipe Page
                //=======================================
                <RecipePage
                    backAction={() => setSelectedRecipeIndex(null)}
                    recipes={search_results[selectedRecipeIndex]}
                />
            }
        </main>
    );
}


