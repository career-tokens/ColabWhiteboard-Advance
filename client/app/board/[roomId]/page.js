"use client"
import Error from 'next/error'
import { useEffect, useState } from "react";
import { useDraw } from '../../../hooks/useDraw';
import { ChromePicker } from 'react-color';
import { io } from 'socket.io-client';
import { drawLine } from '../../../utils/drawLine';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import  Button  from '@mui/material/Button';


const socket = io('http://localhost:3001');

const Page = ({ params }) => {
  const roomId = params.roomId;
  const [isValid, setIsValid] = useState("true");
  const [color, setColor] = useState('#000');
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  useEffect(() => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/rooms/${roomId}`);
        console.log(response.status)
        if (response.status === 200) {
          setIsValid("true");
          // Join the room on the server
          socket.emit('join-room', roomId);
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

    socket.emit('client-ready', roomId);

    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return;
      console.log('sending canvas state');
      socket.emit('canvas-state', { roomId, state: canvasRef.current.toDataURL() });
    });

    socket.on('canvas-state-from-server', ({ room, state }) => {
      if (room === roomId) {
        console.log('I received the state');
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

    socket.on('clear', ({room}) => {
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
  }, [socket]);

  function createLine({ prevPoint, currentPoint, ctx }) {
    socket.emit('draw-line', { room: roomId, prevPoint, currentPoint, color });
    drawLine({ prevPoint, currentPoint, ctx, color });
  }

  return (
    <div>
      {isValid === "true" ? (
        <div className='w-screen h-screen bg-white flex justify-center items-center'>
          <div className='flex flex-col gap-10 items-center justify-center bg-black' style={{width:"20vw",height:"100vh",position:"absolute",left:"0"}}>
            <div className="colorpickerwithtitle">
              <p style={{color:"cyan"}}>Choose Color:</p>
              <div className="color-picker" style={{border:"1px solid green"}}>
            <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
            </div>
            </div>
            <button
              type='button'
              className='p-2 rounded-md border border-black'
              onClick={() => socket.emit('clear', { room: roomId })}>
              Clear canvas
            </button>
            <div className="share">
              <p style={{ color: "cyan" }}>Share Room Code:</p>
              <div className="copy-code flex ">
              <div className="value bg-white p-2" style={{width:"12vw"}}>
                {roomId}
              </div>
            <CopyToClipboard text={roomId}>
                <Button className="bg-sky-500 hover:bg-sky-700 transition-all text-white" sx={{borderRadius:"0px"}} ><ContentCopyIcon  /></Button>
              </CopyToClipboard>
              </div>
            </div>
          </div>
          <canvas
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
