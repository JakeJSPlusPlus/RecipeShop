const instructions = [
    'Cook the white rice according to package instructions and let it cool completely, preferably refrigerate for at least an hour.',
    'Heat vegetable oil in a large skillet or wok over medium-high heat.',
    'Add the diced chicken and cook until it is no longer pink and slightly browned, then remove from the skillet and set aside.',
    'In the same skillet, add more oil if necessary and sauté the chopped onion and garlic until fragrant and translucent.',
    'Add the mixed vegetables to the skillet and cook until tender.',
    'Push the vegetables to one side of the skillet and scramble the beaten eggs on the other side until cooked through.',
    'Combine the eggs with the vegetables and add the cooked rice and chicken back into the skillet, stirring well to mix all ingredients.',
    'Pour soy sauce and a dash of oyster sauce over the rice mixture and stir fry for several minutes until everything is heated through and well combined.',
    'Season with salt and pepper to taste, garnish with sliced green onions, and serve hot.'
]

const tags = ['dairy_free', 'nut_free']
const servings = 4
const prep_time = 15
const cook_time = 15
const calories_per_serving = 400
const protein = 25
const ingredients: Ingredient[] = [
    {id: 6, name: 'Salt', category: 'condiment', quantity: 1, unit: 'pinch', optional: false},
    {id: 7, name: 'Black pepper', category: 'condiment', quantity: 1, unit: 'pinch', optional: false},
    {id: 11, name: 'Onion', category: 'vegetable', quantity: 1, unit: 'piece', optional: false},
    {id: 29, name: 'Egg', category: 'egg', quantity: 2, unit: 'piece', optional: false},
    {id: 30, name: 'Vegetable oil', category: 'oil', quantity: 3, unit: 'tbsp', optional: false},
    {id: 37, name: 'Garlic', category: 'vegetable', quantity: 2, unit: 'clove', optional: false},
    {id: 68, name: 'Chicken breast', category: 'poultry', quantity: 300, unit: 'g', optional: false},
    {id: 111, name: 'Scallion', category: 'herb', quantity: 2, unit: 'piece', optional: true},
    {id: 177, name: 'Soy sauce', category: 'condiment', quantity: 3, unit: 'tbsp', optional: false},
    {id: 299, name: 'Oyster sauce', category: 'condiment', quantity: 1, unit: 'tbsp', optional: true},
    {id: 325, name: 'White rice', category: 'grain', quantity: 2, unit: 'cup', optional: false},
    {id: 326, name: 'Mixed vegetable', category: 'vegetable', quantity: 1, unit: 'cup', optional: false}
]

const description = "American chicken fried rice is a quick and flavorful dish that combines cooked rice with chicken, scrambled eggs, and vegetables, seasoned with soy and oyster sauces for a classic take on a popular Asian-American favorite."

type Ingredient = {
    id: number,
    name: string,
    category: string,
    quantity: number,
    unit: string,
    optional: boolean,
}