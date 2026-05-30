# Recipe Shop

This app is for those who like to cook 
but don't know what to make or how to plan 
ahead for their groceries. You can filter recipes 
by difficulty, ingredients, cuisine, and name
to find meal ideas.

The app is built with a custom backend using FastAPI that calls 
the https://recipeapi.io/ API to fetch recipes. 
The backend processes the information, validates the shape
of the data, and returns a JSON object. The front end is 
a Next.js app that provides a friendly user interface 
that is able to call the fastAPI backend.

This makes the app serverless friendly since there is 
no true database, only a public API.

To start the app, clone the repository, run fastapi run main.py,
then go into App/next-app, and run npm install and npm build/npm run.

### Contact
Report bugs, ask questions, or suggest improvements at
<jake.spivey@scale-proof.com>


