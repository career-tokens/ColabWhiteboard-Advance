"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@mui/material'
import { useRouter } from 'next/navigation';
import SyncIcon from '@mui/icons-material/Sync';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ShareIcon from '@mui/icons-material/Share';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PublicIcon from '@mui/icons-material/Public';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useStytch, useStytchUser } from "@stytch/nextjs";
import Login from "../components/Login";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import MarqueeComponent from "../components/MarqueeComponent"
//#635DFF

const Home = () => {
  const { user, isInitialized } = useStytchUser();
  const router = useRouter();
  const mid = useMediaQuery("(max-width:1000px)");
  const small = useMediaQuery("(max-width:600px)");
  const stytch = useStytch();
   

  // if(user&&isInitialized)
  return (
      <div className="home  bg-black" style={{minHeight:"100vh"}}>
          <Navbar/>
      <Hero />
      <MarqueeComponent/>
      <div className="second-topic text-center text-white " style={{fontSize:"7vh",padding:"7vh 0vw"}}>Online Mulitplayer Whiteboard</div>
      <div className="second flex  flex-wrap justify-center items-center gap-x-4 gap-y-4" style={{padding:"0 5vw 5vh 5vw"}}>
        <Card p={"Changes you make are broadcasted to other participants immediately."} span={"Realtime"} Icon={SyncIcon} />
        <Card p={"No need to take photo of whiteboard anymore! Create as many boards as you need."} span={"Save Your Work"} Icon={SaveAsIcon} />
        <Card p={"Share with anyone! Invite your team mates or friends to your boards to share ideas."} span={"Sharing"} Icon={ShareIcon} />
        <Card p={"Lightning fast communication."} span={"Fast"} Icon={ElectricBoltIcon} />
        <Card p={"All you need is a modern browser. It works on desktop, tablet or mobile."} span={"No installation"} Icon={PublicIcon} />
        <Card p={"We continuously add new features."} span={"What's Next"} Icon={QuestionMarkIcon}/>
      </div>
    </div>
    )
  // else
  //   return <Login/>
}

export default Home

const Card = ({span,p,Icon}) => {
  return (
    <div className="card flex flex-col justify-center items-center text-center text-black bg-white p-4 rounded-lg" style={{minWidth:"250px",width:"25vw",fontSize:"3vh",height:"250px"}}>
    <Icon sx={{ color: "purple", fontSize: "8vh", fontWeight: "900" }} />
    <span style={{fontSize:"4vh",padding:"0.5vh 0"}}>{span}</span>
    <p style={{marginBlockStart:"0",marginBlockEnd:"0"}}>
    {p}
    </p>
  </div>
  )
}