"use client"
import {Cuisine, Difficulty, DietaryTags, MealType} from "@/app/enums";

type AdvancedOptionsProps = {
    //values
    difficulty: string,
    cuisine: string,
    dietary_tag: string,
    meal_type: string,
    //dispatch
    setDifficultyAction: (difficulty: string) => void,
    setCuisineAction: (cuisine: string) => void,
    setDietaryTagAction: (dietary_tag: string) => void,
    setMealTypeAction: (meal_type: string) => void,

    setSaveAction: () => void,
}



export function AdvancedOptions(
    {
        difficulty,
        cuisine,
        dietary_tag,
        meal_type,
        setDifficultyAction,
        setCuisineAction,
        setDietaryTagAction,
        setMealTypeAction,
        setSaveAction

    } : AdvancedOptionsProps) {
    return (
        <div className={"flex justify-center items-center w-full h-full backdrop-blur-md"}>
        <div className={"flex bg-stone-200 dark:bg-[#171e36] w-[44svw] h-[55svh] rounded-3xl flex-col p-10"}>
            <div className={"flex justify-center text-3xl pb-5"}>Advanced Search</div>
            <div className={"grid my-2 items-center gap-y-10 gap-x-3 grid-cols-[auto_1fr] mx-auto w-full max-w-125 text-black"}>

                <label htmlFor="Cuisine" className="flex justify-end dark:text-white">Cuisine</label>
                <select
                    id="Cuisine"
                    onChange={(e) => setCuisineAction(e.currentTarget.value)}
                    className="bg-white block w-full rounded-md border-0 py-0.5">
                    <option className={"text-gray-500"} value={""}>--Select Option--</option>
                    {Cuisine.map((item) =>
                        <option key={item} value={item}>{item.replace('_', ' ')}</option>)}
                </select>
                <label htmlFor="DietaryTags" className="flex justify-end dark:text-white">DietaryTags</label>
                <select
                    id="DietaryTags"
                    onChange={(e) => setDietaryTagAction(e.currentTarget.value)}
                    className="bg-white block w-full rounded-md border-0 py-0.5">
                    <option className={"text-gray-500"} value={""}>--Select Option--</option>
                    {DietaryTags.map((item) =>
                        <option key={item} value={item}>{item.replace('_', ' ')}</option>)}
                </select>
                <label htmlFor="MealType" className="flex justify-end dark:text-white">MealType</label>
                <select
                    id="MealType"
                    onChange={(e) => setMealTypeAction(e.currentTarget.value)}
                    className="bg-white block w-full rounded-md border-0 py-0.5">
                    <option className={"text-gray-500"} value={""}>--Select Option--</option>
                    {MealType.map((item) =>
                        <option key={item} value={item}>{item.replace('_', ' ')}</option>)}
                </select>
                <label htmlFor="Difficulty" className="flex justify-end dark:text-white">Difficulty</label>
                <select
                    id="Difficulty"
                    onChange={(e) => setDifficultyAction(e.currentTarget.value)}
                    className="bg-white block w-full rounded-md border-0 py-0.5">
                    <option className={"text-gray-500"} value={""}>--Select Option--</option>
                    {Difficulty.map((item) =>
                        <option key={item} value={item}>{item}</option>)}
                </select>


            </div>
            <div className={"flex justify-end h-full items-end"}>
                <button className={"bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full"}
                onClick={() => {setSaveAction()}}
                >
                    Save
                </button>
            </div>
        </div>
        </div>
    )
}