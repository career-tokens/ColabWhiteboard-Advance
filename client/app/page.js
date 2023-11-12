"use client"
import React, { useState } from 'react'
import logo1 from "../../images/logo1.png"
import image from "../../images/homeimage.jpg"
import Image from 'next/image'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material'
import { uuid } from 'uuidv4';
import { useRouter } from 'next/navigation';
import SyncIcon from '@mui/icons-material/Sync';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ShareIcon from '@mui/icons-material/Share';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PublicIcon from '@mui/icons-material/Public';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
//#635DFF
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#3C41C2"),
    backgroundColor: "#3C41C2",
    '&:hover': {
      backgroundColor: "#635DFF",
    },
}));
const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#dc3545"),
    backgroundColor: "#dc3545",
    '&:hover': {
      backgroundColor: "rgb(220,53,69,0.7)",
    },
}));
  
const Home = () => {
    const router = useRouter();
    const mid = useMediaQuery("(max-width:1000px)");
  const small = useMediaQuery("(max-width:600px)");
  const [joinRoom, setJoinRoom] = useState("");
   

    const handleCreateRoom = async () => {
        const roomId = uuid();
      
        try {
          const response = await fetch(`http://localhost:3001/rooms/${roomId}`, {
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
      <div className="home  bg-black" style={{minHeight:"100vh"}}>
          <div className="navbar flex justify-between pl-3 pr-10 items-center">
              <div className="image">
                  <Image src={logo1} alt="" style={{  width:"250px",height: "150px",borderRadius:200 }} />
              </div>
              <div className="login-button">
                  <ColorButton variant="contained" sx={{backgroundColor: "#3C41C2",boxShadow:" 4px 4px 1px 0px rgba(255,255,66,1)"}}>Login</ColorButton>
              </div>
          </div>
          <div className={`first flex ${mid||small?"flex-col-reverse jusitfy-center items-center text-center":""}`}>
          <div className="first1 flex flex-col" style={{gap:"6vh",padding:"0vh 8vw",width:small?"":"50vw"}}>
          <div className="describer text-cyan-400" style={{ fontSize: "8vh" }}>
          <style>
           {`
           .describer::selection {
              background-color: rgb(34, 211, 238);
              color: black;
               }
          `}
          </style>
                  Your collaborative visual workspace
              </div>
              <div className="addon text-green-400" style={{ fontSize: "4vh" }}>
           <style>
           {`
           .addon::selection {
              background-color: rgb(74, 222, 128);
              color: black;
               }
          `}
          </style>
          Free forever
             </div>

              <div className="btn" >
                      <ColorButton2 variant="contained" sx={{ backgroundColor: "#dc3545", boxShadow: " 4px 4px 1px 0px rgba(255,255,255,1)" }} onClick={handleCreateRoom}>
                          Start Whiteboarding!</ColorButton2>
                  </div>
          <div className="or text-white" style={{ fontSize: "3.5vh" }}>
          <style>
           {`
           .or::selection {
              background-color: white;
              color: black;
               }
          `}
          </style>
                      Or
                  </div>
                  <div className={`join flex gap-5 ${mid||small?"justify-center":""}`}>
            <input
               onChange={(e)=>setJoinRoom(e.target.value)}
              style={{ borderRadius: "5px", fontSize: "17px", width: "200px", height: "30px", backgroundColor: "white", color: "black", outline: "none", padding: "10px" }} placeholder="Enter room code to join" />
            <ColorButton variant="contained" sx={{ padding: "0 20px", backgroundColor: "#3C41C2", boxShadow: " 4px 4px 1px 0px rgba(255,255,66,1)" }}
              onClick={(e) => {
              router.push(`/board/${joinRoom}`)
            }}>Join</ColorButton>
                  </div>
              </div>
              <div className="first2" style={{paddingRight:"2vw"}}>
                  <Image src={image}
                     style={{ width: small?"80vw":"48vw", height: small?"35vh":"58vh" ,borderRadius:"20px" }} />
              </div>
      </div>
      <div className="second flex  flex-wrap justify-center items-center gap-x-4 gap-y-4" style={{padding:"5vh 5vw"}}>
        <Card p={"Changes you make are broadcasted to other participants immediately."} span={"Realtime"} Icon={SyncIcon} />
        <Card p={"No need to take photo of whiteboard anymore! Create as many boards as you need."} span={"Save Your Work"} Icon={SaveAsIcon} />
        <Card p={"Share with anyone! Invite your team mates or friends to your boards to share ideas."} span={"Sharing"} Icon={ShareIcon} />
        <Card p={"Lightning fast communication."} span={"Fast"} Icon={ElectricBoltIcon} />
        <Card p={"All you need is a modern browser. It works on desktop, tablet or mobile."} span={"No installation"} Icon={PublicIcon} />
        <Card p={"We continuously add new features."} span={"What's Next"} Icon={QuestionMarkIcon}/>
      </div>
    </div>
  )
}

export default Home

const Card = ({span,p,Icon}) => {
  return (
    <div className="card flex flex-col justify-center items-center text-center text-black bg-white p-4" style={{width:"25vw",fontSize:"3vh",height:"150px"}}>
    <Icon sx={{ color: "purple", fontSize: "8vh", fontWeight: "900" }} />
    <span style={{fontSize:"4vh",padding:"0.5vh 0"}}>{span}</span>
    <p style={{marginBlockStart:"0",marginBlockEnd:"0"}}>
    {p}
    </p>
  </div>
  )
}