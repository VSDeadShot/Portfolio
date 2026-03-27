"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const StarfieldBackground = ({ 
  children,
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position (-1 to 1)
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; size: number }[] = [];
    
    const numStars = 400;
    const speed = 2; // Forward speed
    const depth = 1000;
    const lateralSpeed = 10; // How fast we strafe sideways/up/down

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      // Create a wide field to allow for wrapping
      const spread = 2000;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: (Math.random() - 0.5) * spread * 2,
          y: (Math.random() - 0.5) * spread * 2,
          z: Math.random() * depth,
          size: Math.random(),
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Mouse controls the "turning" or "strafing" of the ship
      // We move all stars in the opposite direction of the mouse
      const dx = mouseRef.current.x * lateralSpeed;
      const dy = mouseRef.current.y * lateralSpeed;

      const spread = 2000; // The virtual world bounds

      stars.forEach((star) => {
        // Move star forward
        star.z -= speed;
        // Move star sideways based on mouse (infinite fly effect)
        star.x -= dx;
        star.y -= dy;

        // Reset/Wrap Z (Forward/Back)
        if (star.z <= 0) {
          star.z = depth;
          star.x = (Math.random() - 0.5) * spread * 2;
          star.y = (Math.random() - 0.5) * spread * 2;
        }

        // Infinite Wrap X (Left/Right)
        if (star.x > spread) star.x -= spread * 2;
        if (star.x < -spread) star.x += spread * 2;

        // Infinite Wrap Y (Up/Down)
        if (star.y > spread) star.y -= spread * 2;
        if (star.y < -spread) star.y += spread * 2;

        // Project 3D to 2D
        const k = 128.0 / star.z;
        const x = star.x * k + cx;
        const y = star.y * k + cy;

        // Size & Opacity based on depth
        const size = (1 - star.z / depth) * 3 * star.size;
        const opacity = 1 - star.z / depth;

        // Only draw if visible on screen
        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height && size > 0) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={cn("relative min-h-screen w-full bg-black", className)}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />
      <div className="relative z-10 flex flex-col min-h-screen text-neutral-200">
        {children}
      </div>
    </div>
  );
};