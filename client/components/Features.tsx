import React from 'react';
import SyncIcon from '@mui/icons-material/Sync';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ShareIcon from '@mui/icons-material/Share';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PublicIcon from '@mui/icons-material/Public';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { motion } from "framer-motion";

const cardData = [
  {
    span: "Realtime",
    p: "Changes you make are broadcasted to other participants immediately.",
    Icon: SyncIcon,
  },
  {
    span: "Save Your Work",
    p: "No need to take a photo of the whiteboard anymore! Create as many boards as you need.",
    Icon: SaveAsIcon,
  },
  {
    span: "Sharing",
    p: "Share with anyone! Invite your teammates or friends to your boards to share ideas.",
    Icon: ShareIcon,
  },
  {
    span: "Fast",
    p: "Lightning-fast communication.",
    Icon: ElectricBoltIcon,
  },
  {
    span: "No Installation",
    p: "All you need is a modern browser. It works on desktop, tablet, or mobile.",
    Icon: PublicIcon,
  },
  {
    span: "What's Next",
    p: "We continuously add new features.",
    Icon: QuestionMarkIcon,
  },
];

const Features = () => {
  return (
    <>
      <div
        className="second-topic text-center text-white text-[32px] sm:text-[7vh] mb-[4vh]"
        style={{
          background:
            "linear-gradient(106.9deg,#943985 20.44%,#490f84 133.1%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        }}
      >
        Online Mulitplayer Whiteboard
      </div>
      <div
        className="second flex  flex-wrap justify-center items-center gap-x-4 gap-y-4 mb-[8vh]"
        style={{ padding: "0 5vw 5vh 5vw" }}
      >
        {cardData.map((card, index) => (
          <Card index={index} {...card} />
        ))}
      </div>
    </>
  );
};

const Card = ({ span, p, Icon ,index}) => {
  return (
    <motion.div
    initial={{
      opacity: 0,
       translateX: index % 2 === 0 ? -50 : 50,
       translateY: -50,
      }}
    variants={{
         animate:{opacity: 1, translateX: 0, translateY: 0}
      }}
    transition={{ duration: 0.3, delay: index * 0.2 }}
    whileInView="animate"
      className="card flex flex-col justify-evenly items-center text-center text-[#c4c4c4] bg-white bg-opacity-[0.1] p-4 rounded-lg"
      style={{
        minWidth: "250px",
        width: "25vw",
        fontSize: "3vh",
        height: "240px",
      }}
    >
      <Icon className="bg-white text-white rounded bg-opacity-[0.15] text-[8vh] font-extrabold p-2" />
      <span style={{ fontSize: "4vh", padding: "0.5vh 0" }}>{span}</span>
      <p style={{ marginBlockStart: "0", marginBlockEnd: "0" }}>{p}</p>
    </motion.div>
  );
};

export default Features;
