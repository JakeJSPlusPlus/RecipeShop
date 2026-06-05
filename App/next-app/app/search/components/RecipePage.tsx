"use client"
import type {Ingredient, Recipe} from "../types";


type RecipePageProps = {
    recipes: Recipe,
    backAction: () => void,

}

export default function RecipePage(
    {recipes, backAction}: RecipePageProps){
    return(
        <div className={"flex w-full h-full items-center justify-center flex-col"}>
            <div className={"flex w-full justify-start h-10 mb-10"}>
                <button className={"bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full"}
                        onClick={() => {backAction()}}
                >
                    Back
                </button>
            </div>
            <div className={"flex w-fit flex-row-reverse h-full border-2 border-amber-400 p-10"}>
                {/*--------------------------------------------- Start Right side-------------------------------------------*/}
                <div className={"flex flex-col"}>
                    <div className={"w-full justify-center text-3xl text-center"}>{"Nutrition"}</div>  {/* Nutrition*/}

                    <div className={"border-white border-2 px-2"}>
                        <div>
                            {"Servings: " + recipes.servings} <br/>
                            {"Prep time: " + recipes.prep_time + " min"} <br/>
                            {"Cook time: " + recipes.cook_time + " min"} <br/>
                            {"Calories: " + recipes.calories_per_serving} <br/>
                            {"Protein: " + recipes.protein + " g"} <br/>
                        </div>
                        <div>{recipes.dietary_tags.map((item) => (
                            <div key={item} className={"flex w-full"}>
                                {item.
                                replaceAll('_', " ")
                                    .split(" ")
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ")}
                            </div>
                        ))}
                        </div>
                    </div>
                    <br />
                    <div className={"w-full justify-center text-3xl text-center"}>{"Ingredients"}</div> {/* Ingredients*/}
                    <div className={"flex w-50 flex-col justify-center border-2 border-white "}>
                        {recipes.ingredients.map((ingredient, index) => (
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
                    <div className={"flex w-full justify-center text-5xl "}>{recipes.name}</div>  {/* Food name*/}
                    <br />
                    <div className={"w-full justify-center text-md italic"}>{recipes.description}</div>    {/* Description*/}
                    <br/>
                    <div className={"border-rose-400 border-2 px-2"}>
                        <div className={"flex justify-center w-full text-4xl "}>{"Instructions"}</div> {/* Instructions*/}
                        <div>{recipes.instructions.map((item, index) => (
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
