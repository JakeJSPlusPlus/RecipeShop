export type Ingredient = {
    id: number,
    name: string,
    category: string,
    quantity: number,
    unit: string,
    optional: boolean,
}

export type Recipe = {
    id: number,
    name: string,
    description: string,
    difficulty: string,
    meal_type: string,
    cuisine: string,
    dietary_tags: string[],
    servings: number,
    prep_time: number,
    cook_time: number,
    calories_per_serving: number,
    protein: number,
    instructions: string[],
    ingredients: Ingredient[],
    meta: object

}
