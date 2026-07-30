import { useNavigate } from "react-router-dom";
import ResponsiveImage from "@/components/imagewrapper";
import { projectData } from "../project.data";

const Project = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 px-5 md:grid-cols-2 gap-15 2xl:gap-20">
      {projectData.map((project) => {
        return (
          <div
            key={project.title}
            className="flex relative bg-[#25282B] flex-col shadow-[4px_4px_0_0_black] hover:shadow-[10px_10px_0_0_black] group hover:translate-y-[-5px] hover:translate-x-[-5px] duration-300 gap-2 items-center border-4 overflow-hidden rounded-lg card-border-animation has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-[#d8a013]"
          >
            <span className="absolute flex bg-[#d8a013] text-[#25282B] px-2 text-2xl top-2/7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 rounded-full p-2 duration-300">
              <svg className="w-7 sm:w-12 fill-black rotate-270" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <defs>
                    <clipPath id="clip-pointer2"><rect width="32" height="32"></rect></clipPath>
                  </defs>
                  <g id="pointer2" clipPath="url(#clip-pointer2)">
                    <g id="Group_2338" data-name="Group 2338" transform="translate(-468 -260)">
                      <g id="Group_2334" data-name="Group 2334">
                        <g id="Group_2333" data-name="Group 2333">
                          <g id="Group_2332" data-name="Group 2332">
                            <path id="Path_3837" data-name="Path 3837" d="M491.8,265.339a5.753,5.753,0,0,0-8.126,0,.5.5,0,0,0,.707.707,4.746,4.746,0,1,1,6.712,6.712.5.5,0,0,0,.707.707A5.753,5.753,0,0,0,491.8,265.339Z" fill="#344952"></path>
                          </g>
                        </g>
                      </g>
                      <g id="Group_2337" data-name="Group 2337">
                        <g id="Group_2336" data-name="Group 2336">
                          <g id="Group_2335" data-name="Group 2335">
                            <path id="Path_3838" data-name="Path 3838" d="M494.347,262.8a9.342,9.342,0,0,0-14.968,10.771l-.6.6a4.462,4.462,0,0,0-2.6.125,8.876,8.876,0,0,0-4.753,5.031,9.766,9.766,0,0,0,.6,7.577,8.609,8.609,0,0,0,5.285,4.77,7.112,7.112,0,0,0,1.938.268,7.2,7.2,0,0,0,3.89-1.142,41.143,41.143,0,0,0,6.372-5.485,2.664,2.664,0,0,0,.778-2.01,2.349,2.349,0,0,0-.85-1.723l-.068-.053a2.592,2.592,0,0,0-.363-2.881,9.327,9.327,0,0,0,5.334-15.848Zm-6.266,21.123a40.074,40.074,0,0,1-6.017,5.194,5.181,5.181,0,0,1-4.206.632,6.47,6.47,0,0,1-4.026-3.716,7.788,7.788,0,0,1-.523-6.029,6.812,6.812,0,0,1,3.345-3.708l-1.161,1.161a1,1,0,1,0,1.414,1.414l2.882-2.881v0l7.3-7.3a.993.993,0,0,1,1.369,0,.968.968,0,0,1,0,1.368l-6.228,6.229a1,1,0,1,0,1.414,1.414l.95-.95a.945.945,0,0,0,.132-.088.831.831,0,0,1,1.148,0,.809.809,0,0,1,.238.574.843.843,0,0,1-.271.607l-.684.751a1,1,0,0,0,1.478,1.347l.009-.009.005,0a.593.593,0,0,1,.866.809l-.939.76a2.9,2.9,0,0,0-.56.466,1,1,0,0,0,1.363,1.456l.376-.3a.366.366,0,0,1,.42.011.355.355,0,0,1,.122.274A.7.7,0,0,1,488.081,283.92Zm-.019-7.19a2.789,2.789,0,0,0-.775-1.484,2.645,2.645,0,0,0-.7-.488l3.288-3.288a2.968,2.968,0,0,0,0-4.2,3.039,3.039,0,0,0-4.2,0l-4.779,4.779a7.35,7.35,0,1,1,7.167,4.678Z" fill="#000000"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <ResponsiveImage src={project.image} webp={project.imageWebp} alt={project.title} className="max-h-65 2xl:max-h-80 w-full" />
            <div className="max-w-6/7 flex flex-col justify-between h-full p-3 2xl:p-5">
              <div className="w-full flex flex-col gap-2 2xl:gap-3 h-full overflow-hidden text-start *:text-white">
                {/* Stretched link: the ::after covers the whole card, so the card is
                    clickable while staying a single focusable, valid anchor. */}
                <a
                  href={project.webLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-center cursor-pointer after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                >
                  <h3 className="text-xl 2xl:text-2xl font-semibold">{project.title}</h3>
                </a>
                <p className="2xl:text-lg flex-1">{project.description}</p>
                <hr className="border-white/20" />
                <div className="flex flex-wrap gap-2">
                  {project.techstack.split(", ").map((tech) => (
                    <span key={tech} className="text-xs 2xl:text-sm font-semibold px-2 py-1 rounded-sm bg-white/10 text-white/80 border border-white/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full mt-4 border-t border-white/10 pt-3 pb-4 h-fit flex justify-between items-center gap-3">
                <button
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className="relative z-10 flex items-center gap-1.5 text-sm 2xl:text-base font-semibold px-4 py-2 rounded-sm border border-white/20 text-white/70 hover:text-white hover:border-white/50 duration-200 cursor-pointer"
                >
                  View Details
                </button>
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 cursor-pointer flex items-center gap-2 text-sm 2xl:text-base font-semibold text-white/70 hover:text-white duration-200"
                  >
                    <svg className="fill-[white] w-7 2xl:w-9 hover:scale-115 duration-300 rounded-full" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                          <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="white">
                            <g id="icons" transform="translate(56.000000, 160.000000)">
                              <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Project;
