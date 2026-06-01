"use client"
import {useState, MouseEvent, useEffect} from "react";
import type {Recipe} from "./types";
import RecipePage from "./components/RecipePage";
import Search from "./components/Search";
import Results from "./components/ResultGrid"

export default function Home() {
    const [difficulty, setDifficulty] = useState<string>("")
    const [cuisine, setCuisine] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [search_results, setSearchResults] = useState<Recipe[]>([])
    const [is_show_recipes, setIsShowRecipes] = useState<boolean>(false)
    const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null)

    useEffect(() => {
        console.log(search_results)
    }, [search_results])

    const handleSubmit = async () => {
        console.log("submitting")
        const headers = new Headers()
        const body = JSON.stringify({difficulty, cuisine, name})
        headers.append("Content-Type", "application/json")
        const response = await fetch("https://backend:8000/search", {
            method: "POST",
            headers: headers,
            body: body
        })
        const data = await response.json()
        console.log(data.data)
        if (data.data.length === 0) {
            alert("No recipes found")
            return
        }
        const arr_recipes: Recipe[] = data.data
        setSearchResults(arr_recipes)
        setIsShowRecipes(true)
    }

    return (
      <main className="flex w-full xs:w-1/2 items-center py-10 bg-white dark:bg-black">
          {is_show_recipes ?
              !selectedRecipeIndex ?
                  <Results items={search_results} setItemIndex={setSelectedRecipeIndex}/>
          :

              <RecipePage
                  id={search_results[selectedRecipeIndex]?.id}
                  name={search_results[selectedRecipeIndex]?.name ?? ""}
                  description={search_results[selectedRecipeIndex]?.description ?? ""}
                  difficulty={search_results[selectedRecipeIndex]?.difficulty ?? ""}
                  instructions={search_results[selectedRecipeIndex]?.instructions ?? [""]}
                  meal_type={search_results[selectedRecipeIndex]?.meal_type ?? ""}
                  cook_time={search_results[selectedRecipeIndex]?.cook_time ?? 0}
                  calories_per_serving={search_results[selectedRecipeIndex]?.calories_per_serving ?? 0}
                  protein={search_results[selectedRecipeIndex]?.protein ?? 0}
                  ingredients={search_results[selectedRecipeIndex]?.ingredients ?? []}
                  cuisine={search_results[selectedRecipeIndex]?.cuisine ?? ""}
                  dietary_tags={search_results[selectedRecipeIndex]?.dietary_tags ?? []}
                  servings={search_results[selectedRecipeIndex]?.servings ?? 0}
                  prep_time={search_results[selectedRecipeIndex]?.prep_time ?? 0}
              />
              :
              <Search
              difficulty={difficulty}
              cuisine={cuisine}
              name={name}
              setDifficulty={setDifficulty}
              setCuisine={setCuisine}
              setName={setName}
              handleSubmit={handleSubmit}/>

          }
      </main>
  );
}


