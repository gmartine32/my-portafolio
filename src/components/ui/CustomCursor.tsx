import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Posiciones objetivo y actuales
  const mouse = React.useRef({ x: -100, y: -100 });
  const ringPos = React.useRef({ x: -100, y: -100 });
  // Para la estela
  const trail = React.useRef<{x: number, y: number}[]>([]);

  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Actualizar el dot instantáneamente
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const animate = () => {
      // Lerping para el anillo
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0)`;
      }

      // Estela de Neon (Canvas)
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        // Limpiamos el canvas cada frame completamente
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Agregamos la posición actual al array
        trail.current.push({ x: mouse.current.x, y: mouse.current.y });
        
        // Mantenemos solo los últimos N puntos (longitud de la cola)
        if (trail.current.length > 20) {
          trail.current.shift();
        }

        // Dibujar la estela
        if (trail.current.length > 1) {
          ctx.beginPath();
          // Colores neon y resplandor
          ctx.strokeStyle = `hsl(220, 100%, 60%)`; // usando --neon-blue
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsl(220, 100%, 60%)`;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          for (let i = 0; i < trail.current.length - 1; i++) {
            const p1 = trail.current[i];
            const p2 = trail.current[i + 1];
            
            // Grosor y opacidad basados en la posición (más viejo = más fino y transparente)
            const progress = i / trail.current.length;
            ctx.globalAlpha = progress * 0.8; 
            ctx.lineWidth = progress * 4;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
          
          // Resetear alfa
          ctx.globalAlpha = 1;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    handleLinkHoverEvents();
    setTimeout(handleLinkHoverEvents, 1000);

    animate(); // Iniciar loop

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas para la estela de Neon */}
      <canvas 
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
      />
      {/* El anillo que sigue suavemente (Lerp) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference border-2 border-white transition-all duration-200 ease-out flex items-center justify-center ${
          clicked ? 'scale-75 bg-white/20' : linkHovered ? 'scale-[1.8] bg-white/10' : 'scale-100'
        }`}
      />
      {/* El punto instantáneo */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] mix-blend-difference bg-white transition-opacity duration-200 ${
          linkHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </>
  );
};
