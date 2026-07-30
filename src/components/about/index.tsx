import { RefObject } from "react";
import { Certificates, Education } from "./index.data";

const About: React.FC<{ aboutRef: RefObject<HTMLDivElement | null> }> = ({
  aboutRef,
}) => {

  return (
    <div
      ref={aboutRef}
      className="flex flex-col gap-10 sm:gap-15 w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto items-start px-4 sm:px-5 pb-10"
    >
      <h2 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl border-b-3 border-[#d8a013] w-fit self-center">
        About
      </h2>
      <div className="w-full grid grid-cols-1 gap-12 sm:gap-20">

        <div className="flex flex-col w-full gap-4 2xl:gap-6">
          <h2 className="text-start text-[24px] 2xl:text-[30px] font-semibold">Education</h2>
          {Education.map((item, index) => (
            <div key={index} className="info-card flex flex-col gap-3 2xl:gap-4 p-4 sm:p-5 2xl:p-7 text-start bg-[#25282B] rounded-sm border-l-4 border-[#d8a013]">
              <div className="flex items-center gap-4 2xl:gap-6">
                <img src={item.image} alt={item.title} className="w-14 h-14 2xl:w-20 2xl:h-20 flex-shrink-0 rounded-md object-contain" />
                <div className="flex-1 flex flex-col gap-1">
                  <p className="font-semibold text-lg 2xl:text-xl leading-tight">{item.title}</p>
                  <span className="text-sm 2xl:text-base text-white/60">{item.date}</span>
                </div>
              </div>
              <p className="text-sm 2xl:text-base text-[#d8a013] font-semibold pl-18 2xl:pl-26">{item.institution}</p>
              <p className="text-sm 2xl:text-base text-white/70 leading-relaxed pl-18 2xl:pl-26">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-4 2xl:gap-6">
          <h2 className="text-start text-[24px] 2xl:text-[30px] font-semibold">Certificates</h2>
          {Certificates.map((item, index) => (
            <div key={index} className="info-card flex flex-col gap-3 2xl:gap-4 p-4 sm:p-5 2xl:p-7 text-start bg-[#25282B] rounded-sm border-l-4 border-[#d8a013]">
              <div className="flex items-center gap-4 2xl:gap-6">
                <img src={item.image} alt={item.title} className="w-14 h-14 2xl:w-20 2xl:h-20 flex-shrink-0 rounded-md object-contain" />
                <div className="flex-1 flex flex-col gap-1">
                  <p className="font-semibold text-lg 2xl:text-xl leading-tight">{item.title}</p>
                  <span className="text-sm 2xl:text-base text-white/60">{item.date}</span>
                </div>
              </div>
              <p className="text-sm 2xl:text-base text-[#d8a013] font-semibold pl-18 2xl:pl-26">{item.institution}</p>
              <p className="text-sm 2xl:text-base text-white/70 leading-relaxed pl-18 2xl:pl-26">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
