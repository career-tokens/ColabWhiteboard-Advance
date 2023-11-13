"use client"
import Error from 'next/error'
import { useEffect, useState } from "react";
import { useDraw } from '../../../hooks/useDraw';
import { ChromePicker } from 'react-color';
import { io } from 'socket.io-client';
import { drawLine } from '../../../utils/drawLine';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import { Drawer } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';//very imp to use rsuite stuff


const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

const Page = ({ params }) => {
  const roomId = params.roomId;
  const [isValid, setIsValid] = useState("true");
  const [color, setColor] = useState('#000');
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    var c = document.getElementById("myCanvas");
    c.width = 0;
    c.height = 0;
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${roomId}`);
        console.log(response.status)
        if (response.status === 200) {
          setIsValid("true");
        } else {
          setIsValid("false");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    socket.emit('join-room', roomId);//keeping it in the initial useEffect made it execute later(due to the fetch process) than this useEffect , the hell can you recieve state emitted from one room if you havent yet joined the room?

    socket.emit('client-ready', roomId);
    console.log("emitted client ready ",roomId);

    socket.on('get-canvas-state', () => {
      if (canvasRef.current?.toDataURL().length < 10)//practically no drawing(its just data:(and nothing ofc)) 
      {
        console.log("filling")
        var c = document.getElementById("myCanvas");
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        var ctx = c.getContext("2d");
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, c.width, c.height);
        //see when I download the image background is transparent which I want as white so I am initially filling the
        //background as white (just once not every time when I am creating a point) but again if I used the previous useEffect
        //what would have happened is say isntance 1 (you do whatever you want ) but as soon as instance 2 is done it gets an intial
        //background white image so it sends that ot server which broadcasts it and instance 1 also gets that white file(practically empty)
        //so for intial case we cant let it get the white background image , first it shouldnt be allowed to send anything and then let it get 
        // white which will be eventually substituted by the instance 1's broadcasted image  and anyways the first instance 
        //will also be working
        //had to make intial height and width zero for dataURL to not work and accordingly fill it with height adn width
        return;
      }
      console.log('sending canvas state');
      console.log(canvasRef.current.toDataURL().length);
      socket.emit('canvas-state', { roomId, state: canvasRef.current.toDataURL() });
    });

    socket.on('canvas-state-from-server', ({ room, state }) => {
      if (room === roomId) {
        console.log('I received the state which is ',state);
        const img = new Image();
        img.src = state;
        img.onload = () => {
          ctx?.drawImage(img, 0, 0);
        };
      }
    });

    socket.on('draw-line', ({ room, prevPoint, currentPoint, color }) => {
      if (room === roomId && ctx) {
        drawLine({ prevPoint, currentPoint, ctx, color });
      }
    });

    socket.on('clear', ({ room }) => {
      console.log("got the note to clear")
      if (room === roomId) {
        clear();
      }
    });

    return () => {
      socket.off('draw-line');
      socket.off('get-canvas-state');
      socket.off('canvas-state-from-server');
      socket.off('clear');
      // Leave the room on disconnection
      socket.emit('leave-room', roomId);
    };
  }, [socket,canvasRef,isValid]);//this works even if the dependency array is null or contains canvasRef ,why?

  function createLine({ prevPoint, currentPoint, ctx }) {
    socket.emit('draw-line', { room: roomId, prevPoint, currentPoint, color });
    drawLine({ prevPoint, currentPoint, ctx, color });
  }

  const handleSaveImage = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = url;
      link.click();
    }
    };

  return (
    <div>
      {isValid === "true" ? (
        <div className='w-screen h-screen bg-white flex justify-center items-center'>
          <Button variant="contained" sx={{position:"absolute",left:"2%",top:"5%"}} onClick={()=>{setOpen(true)}}>Options</Button>
          <Drawer placement="left" open={open} onClose={() => setOpen(false)}>
          <style>
           {`
           .rs-drawer-left.rs-drawer-sm {
            width:fit-content;
               }
          `}
          </style>
        <div className='flex flex-col gap-10 items-center justify-center bg-black' style={{width:"280px",height:"100vh",position:"absolute",left:"0"}}>
            <div className="colorpickerwithtitle">
              <p style={{color:"cyan"}}>Choose Color:</p>
              <div className="color-picker" style={{border:"1px solid green"}}>
            <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
            </div>
            </div>
            <button
              type='button'
              className='p-2 rounded-md border border-black'
              onClick={() => {
                socket.emit('clear', { room: roomId })
              }}>
              Clear canvas
            </button>
            <div className="share" style={{width:"250px"}}>
              <p style={{ color: "cyan" }}>Share Room Code:</p>
              <div className="copy-code flex ">
              <div className="value bg-white p-2" >
                {roomId}
              </div>
            <CopyToClipboard text={roomId}>
                <Button className="bg-sky-500 hover:bg-sky-700 transition-all text-white" sx={{borderRadius:"0px"}} ><ContentCopyIcon  /></Button>
              </CopyToClipboard>
              </div>
              </div>
              <Button variant="contained" color="success" onClick={handleSaveImage}>Save Image</Button>
          </div>
        
          </Drawer>
          <canvas //canvas height is set in the useEffect since directly using styling it breaks
            id="myCanvas"
            ref={canvasRef}
            onMouseDown={onMouseDown}
            className='border border-black rounded-md'
          />
        </div>
      ) : (
        <Error statusCode={404} />
      )}
    </div>
  );  
};

export default Page;
