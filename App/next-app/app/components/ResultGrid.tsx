import type {Recipe} from "../types";
import {MdSkipNext, MdSkipPrevious} from "react-icons/md";

type ResultsProps = {
    items: Recipe[],
    setItemIndex: (index:number) => void,
    backAction: () => void,
    page: number,
    setPageAction: (page: number) => void,
}

export default function Results({items, setItemIndex, backAction, setPageAction, page} : ResultsProps) {
    const handleNext = () => {
        console.log("next")
        setPageAction(page + 1)
    }
    const handlePrevious = () => {
        console.log("previous")
        if(page > 1) {
            setPageAction(page - 1)
        }
    }


    return (
        <div className={"flex w-full h-full items-center justify-center flex-col"}>
            <div className={"flex w-full justify-start h-10 mb-10"}>
                <button className={"bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full"}
                        onClick={ backAction}
                >
                    Back
                </button>
            </div>
            <div className={"grid rounded grid-cols-3 w-full h-full border-2 border-amber-400 p-10"}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        id={item.id.toString()}
                        onClick={() => setItemIndex(index)}
                        className={"block overflow-clip m-5 w-auto h-50 border-pink-500 border-2 p-4 rounded-xl hover:scale-110  transition-transform duration-300 hover:cursor-pointer"}
                    >
                        <div className={"flex w-full justify-center text-2xl line-clamp-2"}>
                            {item.name}
                        </div>
                        <div className={"w-full justify-center text-sm line-clamp-3 text-ellipsis italic"}>
                            {item.description}
                        </div>
                    </div>
                ))}
            </div>
            <div className={"flex w-full justify-center"}>
                <div className={"flex flex-row pt-3 justify-items-center items-center align-middle"}>
                    <MdSkipPrevious size={25} className={"hover:cursor-pointer"} onClick={handlePrevious}/>
                    <span className={"mx-2"}>1-9</span>
                    <MdSkipNext size={25} className={"hover:cursor-pointer"} onClick={handleNext}/>
                </div>
            </div>
        </div>
    );
}
