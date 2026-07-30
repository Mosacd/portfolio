import { RefObject } from "react";
import { techstackData } from "./techstackData";
import WindParticles from "./particles"
const TechStack:React.FC<{techstackRef: RefObject<HTMLDivElement | null>}>= ({techstackRef}) => {

    return (
        <div ref={techstackRef} className="flex flex-col gap-15">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-extrabold border-b-3 border-[#d8a013] w-fit self-center">Tech Stack</h2>
      
        <div className="relative">
            <WindParticles/>
            <ul className="grid  w-full grid-cols-2 sm:grid-cols-4  md:grid-cols-5 gap-y-10 gap-x-4 text-lg font-medium place-items-center"
            >
                {techstackData.map((tech, index) => (
                    <li
                    style={{ animationDelay: `${index * 0.3}s` }}
                    key={index} className="flex breathing group flex-col items-center gap-2 w-20 sm:w-30 sm:text-2xl 2xl:w-36 2xl:text-3xl hover:-translate-y-2 duration-300 cursor-pointer hover:scale-105 *:duration-300">
                       {tech.svg}
                        <span className="text-center">{tech.name}</span>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
    }

export default TechStack;