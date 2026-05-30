"use client"

type SearchProps = {
    difficulty: string,
    cuisine: string,
    name: string,
    setDifficulty: (difficulty: string) => void,
    setCuisine: (cuisine: string) => void,
    setName: (name: string) => void,
    handleSubmit: () => void,
}

export default function Search(
    {
        difficulty,
        setDifficulty,
        setCuisine,
        setName,
        handleSubmit,
    }: SearchProps) {
    return (
        <>
            <div className={"block flex-col w-full h-full "}>
                <div
                    className={"grid my-2 items-center gap-y-2 gap-x-3 grid-cols-[auto_1fr] mx-auto w-full max-w-125"}>
                    <label htmlFor="name" className="flex justify-end dark:text-white">Name</label>
                    <input type="text" id="name"
                           className="bg-white block w-full rounded-md border-0 text-black py-0.5 px-1 placeholder:text-gray-500"
                           placeholder="Name"
                           onChange={(e) => setName(e.currentTarget.value)}/>
                    <label htmlFor="difficulty" className="flex justify-end dark:text-white">Difficulty</label>
                    <select
                        style={{color: (difficulty === "") ? "#6a7282" : "black"}}
                        id="Difficulty"
                        onChange={(e) => setDifficulty(e.currentTarget.value)}
                        className="bg-white block w-full rounded-md border-0 py-0.5">
                        <option className={"text-gray-500"} value={""}>--Select Option--</option>
                        <option className={"text-black"} value={"all"}>All</option>
                        <option className={"text-black"} value={"easy"}>Easy</option>
                        <option className={"text-black"} value={"medium"}>Medium</option>
                        <option className={"text-black"} value={"hard"}>Hard</option>
                    </select>
                    <label htmlFor="cuisine" className="flex justify-end dark:text-white">Cuisine</label>
                    <input type="text" id="cuisine"
                           className="bg-white block w-full rounded-md border-0 text-black py-0.5 px-1 placeholder:text-gray-500"
                           placeholder="Cuisine"
                           onChange={(e) => setCuisine(e.currentTarget.value)}/>
                    <div></div>
                    <div className={"flex w-full justify-end"}>
                        <button
                            className={"flex bg-amber-400 w-fit hover:bg-amber-500 text-white font-bold py-2 px-4 rounded"}
                            onClick={handleSubmit}
                        >Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}