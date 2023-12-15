"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import ToggleButton from "./ToggleButton";

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(30px at 50px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
const Sidebar = () => {
  const [open, setOpen] = useState(false);

    return (
        <div className="h-screen w-screen bg-[red]">
                  <motion.div className="sidebar flex flex-col items-center justify-center bg-black  text-black"
          animate={open ? "open" : "closed"}>
          <motion.div className="bg z-[999] fixed top-0 left-0 bottom-0 w-[200px] sm:w-[400px] bg-black"
              variants={variants}>
        Hello World
      </motion.div>
      <ToggleButton setOpen={setOpen} />
    </motion.div>
      </div>

  );
};

export default Sidebar;