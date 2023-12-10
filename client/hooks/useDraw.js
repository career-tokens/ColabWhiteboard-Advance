import { useEffect, useRef, useState } from 'react';

export const useDraw = (onDraw) => {
  const [pointerDown, setPointerDown] = useState(false);

  const canvasRef = useRef(null);
  const prevPoint = useRef(null);

  const onPointerDown = () => setPointerDown(true);

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
      if (!pointerDown) return;
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
      setPointerDown(false);
      prevPoint.current = null;
    };

    // Add event listeners
    canvasRef.current?.addEventListener('pointermove', handler);
    window.addEventListener('pointerup', upHandler);

    // Remove event listeners
    return () => {
      canvasRef.current?.removeEventListener('pointermove', handler);
      window.removeEventListener('pointerup', upHandler);
    };
  }, [onDraw]);

  return { canvasRef, onPointerDown, clear };
};
