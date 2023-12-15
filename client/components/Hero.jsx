/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { ColorButton, ColorButton2 } from '../constants/ColorButtons';
import { uuid } from 'uuidv4';
import Image from 'next/image';
import image from "../../images/whiteboard.jpg"
import { useRouter } from 'next/navigation';
const Hero = () => {
    const router = useRouter();
  const [joinRoom, setJoinRoom] = useState("");
  
    const handleCreateRoom = async () => {
        const roomId = uuid();
      
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${roomId}`, {
            method: 'POST', // Change the method to 'POST'
          });
      
          if (!response.ok) {
            console.error('Error creating room:', response.statusText);
            return;
          }
      
          router.push(`/board/${roomId}`);
        } catch (error) {
          console.error('Error creating room:', error.message);
        }
    };
    
  return (
    <div className="hero flex flex-col text-center justify-center pb-[8vh]">
      <motion.div
    className="first1 flex flex-col relative z-20"
    initial={{ marginTop: "100px",opacity:0 }}
    variants={{
      animate: {
      marginTop:"0px",opacity:1
      }
    }}
    transition={{
      duration:1
    }}
        whileInView="animate"
        viewport={{once:true}}
    >
              
        <h1 className="gradient-text font-bold text-[32px] sm:text-[64px]  selection:bg-[#22D3EE] selection:text-black"
        style={{background:"linear-gradient(106.9deg,#943985 20.44%,#490f84 133.1%)","-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent"}}
        >
    Collaborative & Rapid
        </h1>
        <div className="addon font-bold text-[32px] sm:text-[64px] text-white mb-[2vh]">
       Drawing and Teaching
        </div>
        <div className="text-[16px] sm:text-[24px] text-white mb-[8vh]">
        Purpose built platform to help people convey ideas in high quality visual format
        </div>
        <div className="join-new-or-old flex flex-col sm:flex-row gap-[5vw] justify-center">
        <div className="btn mb-[2vh] sm:mb-0" >
                  <ColorButton2
                      variant="contained"
                      sx={{ backgroundColor: "#dc3545", boxShadow: " 4px 4px 1px 0px rgba(255,255,255,1)" }}
                      onClick={handleCreateRoom}>
                    New Board</ColorButton2>
            </div>

            <div className={`join flex gap-5 justify-center`}>
      <input
         onChange={(e)=>setJoinRoom(e.target.value)}
         className="rounded text-[17px] w-[200px] h-[30px] bg-[white] text-white outline-none px-[10px] py-2  bg-opacity-10 border-none"
         placeholder="Enter room code to join"
        />
                  
      <ColorButton variant="contained" sx={{ padding: "0 20px", backgroundColor: "#3C41C2", boxShadow: " 4px 4px 1px 0px rgba(255,255,66,1)" }}
        onClick={() => {
        router.push(`/board/${joinRoom}`)
                      }}>Join</ColorButton>
                  
              </div>
         </div>
              
          </motion.div>
          
      <div className="first2 mt-[5vh] sm:mt-[10vh] relative flex justify-center">
        <img
          className='absolute z-0 m-auto top-[-70vh] w-[80vw] left-[15vw]'
          src="https://redbrickai.com/images/bg-mesh.svg" alt="" />
              
        <div className="image-wrapper w-[73vw] place-content-center py-[1.5vw] rounded" style={{
          border: "1px solid",
          "border-image-slice": "1",
          "border-image-source":"linear-gradient(87deg,rgba(90,19,108,0) -1.3%,rgba(90,19,108,.61) 32.97%,rgba(109,18,51,.6) 57.76%,rgba(109,18,51,0) 99.94%)",
          backgroundColor: "rgba(21,28,37,.79)",
        }}>
                  <Image         
          src={image}        
          className="w-[70vw]  h-auto  rounded-xl relative z-10"
              />
        </div>
        </div>
    </div>
  )
}

export default Hero