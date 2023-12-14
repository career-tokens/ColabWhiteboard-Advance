"use client"
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import MarqueeComponent from "../components/MarqueeComponent"
import Features from '../components/Features';
import Parallax from '../components/Parallax';
import Ending from '../components/Ending';
//#635DFF

const Home = () => {
  const router = useRouter();
  const mid = useMediaQuery("(max-width:1000px)");
  const small = useMediaQuery("(max-width:600px)");
 
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user)
      router.push("/authenticate");
  })
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
}

export default Home;
