"use client"
import type {Ingredient} from "../types";

type RecipePageProps = {
    id: number,
    name: string,
    description: string,
    difficulty: string,
    instructions: string[],
    meal_type: string,
    cook_time: number,
    calories_per_serving: number,
    protein: number,
    ingredients: Ingredient[],
    cuisine: string,
    dietary_tags: string[],
    servings: number,
    prep_time: number,
}

export default function RecipePage(
    {
        id,
        name,
        description,
        difficulty,
        instructions,
        meal_type,
        cuisine,
        dietary_tags,
        servings,
        prep_time,
        cook_time,
        calories_per_serving,
        protein,
        ingredients
    }: RecipePageProps){
    return(
        <div className={"flex w-full h-full items-center justify-center "}>
            <div className={"flex w-fit flex-row-reverse h-full border-2 border-amber-400 p-10"}>
                {/*--------------------------------------------- Start Right side-------------------------------------------*/}
                <div className={"flex flex-col"}>
                    <div className={"w-full justify-center text-3xl text-center"}>{"Nutrition"}</div>  {/* Nutrition*/}

                    <div className={"border-white border-2 px-2"}>
                        <div>
                            {"Servings: " + servings} <br/>
                            {"Prep time: " + prep_time + " min"} <br/>
                            {"Cook time: " + cook_time + " min"} <br/>
                            {"Calories: " + calories_per_serving} <br/>
                            {"Protein: " + protein + " g"} <br/>
                        </div>
                        <div>{dietary_tags.map((item) => (
                            <div key={item} className={"flex w-full"}>
                                {item.replace('_', " ")}
                            </div>
                        ))}
                        </div>
                    </div>
                    <br />
                    <div className={"w-full justify-center text-3xl text-center"}>{"Ingredients"}</div> {/* Ingredients*/}
                    <div className={"flex w-50 flex-col justify-center border-2 border-white "}>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className={"flex w-full justify-center pl-2"}>
                                <Ingredient {...ingredient}/>
                            </div>
                        ))}
                        <div>
                            {"* = optional"}
                        </div>
                    </div>
                </div>
                {/* ---------------------------------------------Sart Left side-------------------------------------*/}
                <div className={"flex w-full flex-col px-5"}>
                    <div className={"flex w-full justify-center text-5xl "}>{name}</div>  {/* Food name*/}
                    <br />
                    <div className={"w-full justify-center text-md italic"}>{description}</div>    {/* Description*/}
                    <br/>
                    <div className={"border-rose-400 border-2 px-2"}>
                        <div className={"flex justify-center w-full text-4xl "}>{"Instructions"}</div> {/* Instructions*/}
                        <div>{instructions.map((item, index) => (
                            <div key={index} className={"flex w-full justify-start"}>
                                {index + 1}. {item}
                                <br/>
                                <br/>
                            </div>
                        ))}
                        </div> {/*end of instructions*/}
                    </div> {/*end of border*/}
                </div> {/*end of left side*/}
            </div> {/*end of columns flex box*/}
        </div>
    )
}

function Ingredient(props: Ingredient) {
    return (
        <div className={`grid grid-cols-2 w-full justify-center ${props.optional ? "italic" : ""}`}>
            <div className={"px-1"}>{props.name}</div>
            <div className={"px-1"}>{props.quantity} {props.unit} {props.optional && "*"}</div>
        </div>
    )
}
