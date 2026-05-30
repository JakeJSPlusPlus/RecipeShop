import type {Recipe} from "../types";
import {MdSkipNext, MdSkipPrevious} from "react-icons/md";

type ResultsProps = {
    items: Recipe[],
    setItemIndex: (index:number) => void,
}

export default function Results({items, setItemIndex} : ResultsProps) {
    console.log()
    return (
        <div className={"flex w-full h-full items-center justify-center flex-col"}>
            <div className={"grid rounded grid-cols-3 w-full h-full border-2 border-amber-400 p-10"}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        id={item.id.toString()}
                        onClick={() => setItemIndex(index)}
                        className={"block m-5 w-auto h-50 border-pink-500 border-2 p-4 rounded-xl hover:border-4"}
                    >
                        <div className={"flex w-full justify-center text-2xl line-clamp-2"}>
                            {item.name}
                        </div>
                        <div className={"w-full justify-center text-sm line-clamp-3 text-ellipsis italic"}>
                            {item.description}
                        </div>
                        <div className={"flex w-full justify-center"}>
                            {item.difficulty}
                        </div>
                    </div>
                ))}
            </div>
            <div className={"flex w-full justify-center"}>
                <div className={"flex flex-row pt-3 justify-items-center items-center align-middle"}>
                    <MdSkipPrevious size={25} className={"hover:cursor-pointer"}/>
                    <span className={"mx-2"}>1-9</span>
                    <MdSkipNext size={25} className={"hover:cursor-pointer"}/>
                </div>
            </div>
        </div>
    );
}
