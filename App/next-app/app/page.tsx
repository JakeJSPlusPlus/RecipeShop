"use client"
import {useState, MouseEvent, useEffect} from "react";
import type {Recipe} from "./types";
import RecipePage from "./components/RecipePage";
import Search from "./components/Search";
import Results from "./components/ResultGrid"

const API_URL = process.env.NEXT_API_URL


export default function Home() {
    const [difficulty, setDifficulty] = useState<string>("")
    const [cuisine, setCuisine] = useState<string>("")
    const [dietary_tag, setDietaryTag] = useState<string>("")
    const [meal_type, setMealType] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [search_results, setSearchResults] = useState<Recipe[]>([])
    const [is_show_recipes, setIsShowRecipes] = useState<boolean>(false)
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [servings, setServings] = useState<string | null>(null)

    useEffect(() => {
        console.log(search_results)
    }, [search_results])

    const handleSubmit = async () => {
        //This network request is awaited in the server, as it requests from another external resource.
        //Since the request could go a bit longer for a response, we need to give it more than the default time
        //We set it below
        if (name === "") {
            setError("Please enter a name")
            throw new Error("Please enter a name")
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort("Timeout"), 5000);


        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        const body = JSON.stringify({difficulty, name, cuisine, dietary_tag, meal_type})

        try {
            const response = await fetch((API_URL ?? "http://localhost:8000") + "/search", {
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
                setError("No response from server")
                throw new Error("No response from server")
            }
            if ( !response.ok) {
                //http response is not 2xx, throw an error to prevent runtime issues
                setError("Bad HTTP response")
                throw new Error("Bad HTTP response")

            }

            const data = await response.json()
            if (data.data?.length === 0) {
                //No recipes found if the array is empty
                setError("No recipes found")
                throw new Error("No recipes found")
            }
            const arr_recipes: Recipe[] = data.data
            setSearchResults(arr_recipes)
            setIsShowRecipes(true)
        } catch (error) {

            clearTimeout(timeoutId);
        }
    }

    return (

      <main className="flex w-full xs:w-1/2 items-center py-10 bg-white dark:bg-black">
          {!error ? is_show_recipes ?
              !selectedRecipeIndex ?

                  //========================================================================================================
                  //
                  //                                     Query Results Page
                  //
                  //========================================================================================================
                  <Results
                      items={search_results}
                      setItemIndex={setSelectedRecipeIndex}
                      backAction={() => {
                          setIsShowRecipes(false)
                          setName("")
                          setDifficulty("")
                          setServings("")
                          setSearchResults([])
                          setCuisine("")
                      }}
                  />
          :
                  //========================================================================================================
                  //
                  //                                     Full Recipe Page
                  //
                  //========================================================================================================
              <RecipePage
                  backAction={() => setSelectedRecipeIndex(null)}
                  recipes={search_results[selectedRecipeIndex]}
              />
              :
                  //========================================================================================================
                  //
                  //                                     Search Page
                  //
                  //========================================================================================================
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
              handleSubmitAction={handleSubmit}/>

          :
              //========================================================================================================
              //
              //                                     Error Page
              //
              //========================================================================================================
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
                              setServings("")
                              setName("")
                              setSearchResults([])
                          }}
                      >Try Again
                      </button>
                  </div>
              </div>
          }
      </main>
  );
}


