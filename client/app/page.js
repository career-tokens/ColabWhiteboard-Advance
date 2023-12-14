"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@mui/material'
import { useRouter } from 'next/navigation';
import { useStytch, useStytchUser } from "@stytch/nextjs";
import Login from "../components/Login";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import MarqueeComponent from "../components/MarqueeComponent"
import Features from '../components/Features';
import Parallax from '../components/Parallax';
import Ending from '../components/Ending';
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
      <Features />
      <Parallax />
      <Ending/>
    </div>
    )
  // else
  //   return <Login/>
}

export default Home;
