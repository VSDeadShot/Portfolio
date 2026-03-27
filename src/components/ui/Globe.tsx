"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.1, 0.2, 0.6],
      opacity: 1, // Increased opacity for better visibility
      markers: [
        { location: [26.9, 75.7], size: 0.1 }
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-start relative">
       <div className="relative w-full aspect-square max-w-[500px]">
         <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none transform -translate-y-10" />
         <canvas
           ref={canvasRef}
           style={{ width: "100%", height: "100%" }}
           className="cursor-grab active:cursor-grabbing relative z-10"
         />
       </div>
    </div>
  );
}