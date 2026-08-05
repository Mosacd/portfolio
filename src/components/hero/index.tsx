import { useState } from "react";
import resumeFile from "@/assets/Levan Mosiashvili Resume.pdf";
import BlobPortfolio from "../portfolioImage";

const EMAIL = "levanmosiashvili5@gmail.com";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  // clipboard.writeText rejects on insecure origins and when permission is denied,
  // so fall back to showing the address rather than failing silently.
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 4000);
    }
  };

  return (
    <div className="flex w-full justify-center sm:justify-between items-center mt-30">
      <div className="flex flex-col gap-10 items-center sm:items-start w-full max-w-lg 2xl:max-w-2xl slide-in-left hiddenClass">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-start">
          <div className="flex items-center w-full max-sm:justify-center gap-2">
            <h2 className="text-xl sm:text-xl lg:text-3xl 2xl:text-4xl font-medium">
              Hello, I'm Levan,
            </h2>

            <BlobPortfolio className=" w-full sm:hidden max-w-20 max-h-20" />
          </div>
          <h1 className="leading-tight font-extrabold text-6xl sm:text-6xl lg:text-[92px] 2xl:text-[120px] text-shadow">
            Full-Stack Developer
          </h1>
          <h2 className="text-xl sm:text-xl lg:text-3xl 2xl:text-4xl font-medium mt-3 sm:mt-0">
            based in Georgia.
          </h2>
        </div>
        <div className="flex gap-4 flex-wrap">
          <a href={resumeFile} download>
            <button
              className="flex gap-2 border-2 bg-[#d8a013] text-md lg:text-lg 2xl:text-xl rounded-lg px-6 py-3 w-[140px] lg:w-[160px] 2xl:w-[180px] text-black shadow-[4px_4px_0_0_black] cursor-pointer
               font-semibold text-center no-underline select-none transition-all hover:bg-main-hover hover:shadow-[2px_2px_0_0_black]
                hover:translate-x-[2px] hover:translate-y-[2px] items-center justify-center border-black"
            >
              Resume
              <svg className="w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="black" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="black" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </a>
          <button
            onClick={copyEmail}
            className="flex gap-2 border-2 border-black bg-[#25282B] text-md lg:text-lg 2xl:text-xl rounded-lg px-6 py-3 w-[140px] lg:w-[160px] 2xl:w-[180px] text-white shadow-[4px_4px_0_0_black] cursor-pointer
             font-semibold text-center no-underline select-none transition-all hover:shadow-[2px_2px_0_0_black]
              hover:translate-x-[2px] hover:translate-y-[2px] items-center justify-center"
          >
            {copied ? "Copied!" : copyFailed ? "Copy failed" : "Email"}
            {copied ? (
              <svg className="w-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg className="w-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
            )}
          </button>
          {copyFailed && (
            <p className="w-full text-sm 2xl:text-base select-all text-center sm:text-start">
              {EMAIL}
            </p>
          )}
        </div>
      </div>

      <BlobPortfolio className="hidden w-full h-full sm:block max-w-xs lg:max-w-md 2xl:max-w-lg slide-in-right hiddenClass" />
    </div>
  );
};

export default Hero;
