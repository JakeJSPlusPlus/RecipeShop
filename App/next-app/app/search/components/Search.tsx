"use client"
import Image from 'next/image'
import {FaSearch} from "react-icons/fa";
import {RecipeShopLogo} from "./RecipeShopLogo";
import {AdvancedOptions} from "./AdvancedOptions";
import {useState} from "react";

type SearchProps = {
    //search bar value
    name: string,
    setNameAction: (name: string) => void,
    //advanced options values
    difficulty: string,
    cuisine: string,
    dietary_tag: string,
    meal_type: string,
    //advance option dispatch
    setDifficultyAction: (difficulty: string) => void,
    setCuisineAction: (cuisine: string) => void,
    setDietaryTagAction: (dietary_tag: string) => void,
    setMealTypeAction: (meal_type: string) => void,
    //submit action
    handleSubmitAction: () => void,
}

export default function Search(
    {
        difficulty,
        cuisine,
        dietary_tag,
        meal_type,
        setDifficultyAction,
        setCuisineAction,
        setDietaryTagAction,
        setMealTypeAction,
        setNameAction,
        handleSubmitAction,
    }: SearchProps) {
    const [isShowAdvancedOptions, setIsShowAdvancedOptions] = useState<boolean>(false)

    return (
        <>
            <div className={"block flex-col w-full h-full "}>
                {/*============================== Search Bar ==============================*/}
                <div className={"flex justify-center w-full "}>
                    <div className={"flex justify-center w-1/2 flex-col"}>
                        <RecipeShopLogo/>
                        <div className={"col-span-1"}></div>
                        <div className={"flex justify-center w-full h-13 mb-10"}>
                            <input type="text" id="name"
                                   autoComplete={"off"}
                                   className="bg-white block w-full rounded-3xl border-0 text-black py-0.5 px-3 placeholder:text-gray-500"
                                   placeholder="Name"
                                   onChange={(e) => setNameAction(e.currentTarget.value)}
                            />
                            <div
                                className={"relative right-12 top-0 bg-emerald-500 rounded-4xl w-11 my-1 flex justify-center items-center hover:cursor-pointer"}
                                onClick={handleSubmitAction}
                            >
                                <FaSearch/>
                            </div>
                        </div>
                        <div className={"flex justify-center w-full"}>
                            <button
                                onClick={() => {setIsShowAdvancedOptions(true)}}
                                className={"underline text-amber-500 rounded-4xl w-fit h-fit flex justify-center items-center hover:cursor-pointer"}>
                                Advanced Search
                            </button>
                        </div>
                    </div>

                </div>

                {/*============================== Advanced Options ==============================*/}
                {isShowAdvancedOptions && <div className={"flex absolute w-full h-full justify-center items-center top-0 left-0"}>
                    <AdvancedOptions
                        cuisine={cuisine}
                        dietary_tag={dietary_tag}
                        meal_type={meal_type}
                        difficulty={difficulty}
                        setDifficultyAction={setDifficultyAction}
                        setCuisineAction={setCuisineAction}
                        setDietaryTagAction={setDietaryTagAction}
                        setMealTypeAction={setMealTypeAction}
                        setSaveAction={() => {
                            setIsShowAdvancedOptions(false)
                        }}
                    />
                </div>}
            </div>
        </>
    )
}