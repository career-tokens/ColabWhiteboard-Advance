import Image from 'next/image';
import React from 'react';
import drawing from "../../images/drawing.jpg"
import education from "../../images/education.jpg"

const Parallax = () => {
  return (
    <div className="parallax-topics flex flex-col gap-y-[6vh] px-[10vw]">
      <div
        className="image1 h-[80vh] w-full relative text-center rounded-xl"
        style={{
          backgroundImage: `url(${drawing.src})`, 
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute bottom-[12px] w-fit     left-0 right-0 ml-auto mr-auto    text-[24px] sm:text-[35px] backdrop-blur-md backdrop-saturate-150 bg-white bg-opacity-[0.6] px-3 py-2 rounded font-[Montserrat] font-bold uppercase">
          <span style={{background:"linear-gradient(106.9deg,#943985 20.44%,#490f84 133.1%)","-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent"}}>Don&apos;t let your creativity die!</span>
        </div>
      </div>
            <div
        className="image1 h-[80vh] w-full relative rounded-xl"
        style={{
          backgroundImage: `url(${education.src})`, 
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute bottom-[12px] w-fit     left-0 right-0 ml-auto mr-auto    text-[24px] sm:text-[35px] backdrop-blur-md backdrop-saturate-150 bg-white bg-opacity-[0.6] px-3 py-2 rounded font-[Montserrat] font-bold uppercase">
          <span style={{background:"linear-gradient(106.9deg,#943985 20.44%,#490f84 133.1%)","-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent"}}>Don&apos;t let the light of education die !</span>
        </div>
      </div>
    </div>
  );
};

export default Parallax;
