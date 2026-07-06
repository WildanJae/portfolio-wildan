"use client";
import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  alpha: number;
  targetAlpha: number;
  delay: number;
  color: string;
  word: string;
}

export default function LoveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    
    const words = ["<Code />", "Passion", "Design", "Wildan", "Next.js", "Love"];
    const fontSize = 12;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      points = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) / 50; 

      const addLayer = (s: number, density: number) => {
        for (let t = 0; t < Math.PI * 2; t += density) {
          const x = 16 * Math.pow(Math.sin(t), 3);
          const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
          
          const targetX = centerX + x * scale * s;
          const targetY = centerY + y * scale * s;
          
          const hue = 340 + (x * 2); 
          
          points.push({
            x: targetX,
            y: targetY,
            baseX: targetX,
            baseY: targetY,
            alpha: 0,
            targetAlpha: 0.3 + Math.random() * 0.7,
            delay: Math.random() * 2500,
            color: `hsl(${hue}, 90%, 65%)`,
            word: words[Math.floor(Math.random() * words.length)]
          });
        }
      };

      addLayer(1, 0.05);
      addLayer(0.8, 0.08);
      addLayer(0.6, 0.12);
      addLayer(0.4, 0.2);
      addLayer(0.2, 0.4);
    };

    let start: number | null = null;
    const draw = (time: number) => {
      if (!start) start = time;
      const elapsed = time - start;

      ctx.fillStyle = 'rgba(5, 5, 5, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `600 ${fontSize}px "Inter", sans-serif`;
      ctx.textAlign = 'center';
      
      const pulse = Math.sin(time * 0.003) * 5;

      points.forEach(p => {
        if (elapsed > p.delay) {
            p.alpha += (p.targetAlpha - p.alpha) * 0.05;
        }

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const maxDist = 100;
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.x -= (dx / dist) * force * 5;
          p.y -= (dy / dist) * force * 5;
        }

        p.x += (p.baseX - p.x) * 0.05;
        p.y += (p.baseY - p.y) * 0.05;

        const drawX = p.x + (p.x - canvas.width/2) / canvas.width * pulse;
        const drawY = p.y + (p.y - canvas.height/2) / canvas.height * pulse;

        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        
        ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('hsl', 'hsla');
        ctx.fillText(p.word, drawX, drawY);
      });
      
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-auto"
    />
  );
}
