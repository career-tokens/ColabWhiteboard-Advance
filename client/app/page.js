"use client"
import React from 'react'
import logo1 from "../../images/logo1.png"
import image from "../../images/homeimage.jpg"
import Image from 'next/image'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
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
  return (
      <div className="home h-screen bg-black">
          <div className="navbar flex justify-between pl-3 pr-10 items-center">
              <div className="image">
                  <Image src={logo1} alt="" style={{  width:"250px",height: "150px",borderRadius:200 }} />
              </div>
              <div className="login-button">
                  <ColorButton variant="contained" sx={{backgroundColor: "#3C41C2",boxShadow:" 4px 4px 1px 0px rgba(255,255,66,1)"}}>Login</ColorButton>
              </div>
          </div>
          <div className="first flex ">
          <div className="first1 flex flex-col" style={{gap:"6vh",padding:"0vh 8vw",width:"50vw"}}>
              <div className="describer text-cyan-400" style={{fontSize:"8vh"}}>
                  Your collaborative visual workspace
              </div>
              <div className="addon text-green-400" style={{fontSize:"4vh"}}>
                  Free forever
              </div>
              <div className="btn" >
                      <ColorButton2 variant="contained" sx={{ backgroundColor: "#dc3545", boxShadow: " 4px 4px 1px 0px rgba(255,255,255,1)" }}>
                          Start Whiteboarding!</ColorButton2>
                  </div>
                  <div className="or text-white" style={{fontSize:"3.5vh"}}>
                      Or
                  </div>
                  <div className="join flex gap-5">
                      <input style={{borderRadius:"5px",fontSize:"17px",width:"200px",height:"30px",backgroundColor:"white",color:"black",outline:"none",padding:"10px"}} placeholder="Enter room code to join" />
                      <ColorButton variant="contained" sx={{padding:"0 20px",backgroundColor: "#3C41C2",boxShadow:" 4px 4px 1px 0px rgba(255,255,66,1)"}}>Join</ColorButton>
                  </div>
              </div>
              <div className="first2" style={{paddingRight:"2vw"}}>
                  <Image src={image}
                     style={{ width: "48vw", height: "58vh" ,borderRadius:"20px" }} />
              </div>
          </div>
    </div>
  )
}

export default Home