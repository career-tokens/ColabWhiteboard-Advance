import { useEffect, useRef, useState } from 'react';

export const useDraw = (onDraw) => {
  const [mouseOrTouchDown, setMouseOrTouchDown] = useState(false);

  const canvasRef = useRef(null);
  const prevPoint = useRef(null);

  const onMouseOrTouchDown = () => setMouseOrTouchDown(true);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      if (!mouseOrTouchDown) return;
      const currentPoint = computePointInCanvas(e);

      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX?e.clientX - rect.left:e.touches[0].clientX-rect.left;
      const y = e.clientY?e.clientY - rect.top:e.touches[0].clientY-rect.left;

      return { x, y };
    };

    const upHandler = () => {
      setMouseOrTouchDown(false);
      prevPoint.current = null;
    };

    // Add event listeners
    canvasRef.current?.addEventListener('mousemove', handler);
    canvasRef.current?.addEventListener('touchmove', handler);
    window.addEventListener('mouseup', upHandler);
    window.addEventListener('touchup', upHandler);

    // Remove event listeners
    return () => {
      canvasRef.current?.removeEventListener('mousemove', handler);
      window.removeEventListener('touchup', upHandler);
    };
  }, [onDraw]);

  return { canvasRef, onMouseOrTouchDown, clear };
};
