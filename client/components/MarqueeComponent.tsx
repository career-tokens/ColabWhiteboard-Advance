import React from 'react'
import adidas from "../../images/adidas.png"
import puma from "../../images/puma.png"
import uber from "../../images/uber.png"
import gucci from "../../images/gucci.png"
import aveda from "../../images/aveda.png"
import bbc from "../../images/bbc.png"
import lexus from "../../images/lexus.png"
import clinique from "../../images/clinique.png"
import sony from "../../images/sony.png"
import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import { motion } from "framer-motion";

const MarqueeComponent = () => {
  return (
    <motion.div className="marquee"
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
        viewport={{once:true}}>
      <p className="text-[32px] sm:text-[7vh] text-center text-white mb-[5vh] font-bold"
          style={{background:"linear-gradient(106.9deg,#943985 20.44%,#490f84 133.1%)","-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent"}}
      >Used by Leading Companies </p>
          <Marquee className="gap-x-[5vw]">
              <Image src={adidas} alt="" />
              <Image src={sony} alt="" />
              <Image src={puma} alt="" />
              <Image src={uber} alt="" />
              <Image src={gucci } alt="" />
              <Image src={clinique } alt="" />
              <Image src={aveda} alt="" />
              <Image src={bbc} alt="" />
              <Image src={lexus } alt="" />
         </Marquee>
    </motion.div>
  )
}

export default MarqueeComponent