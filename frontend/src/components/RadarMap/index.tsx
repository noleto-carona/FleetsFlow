import React, { useState, useEffect } from 'react';
import { Ship } from 'lucide-react';

const RadarMap: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0a192f] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'linear-gradient(#64ffda 1px, transparent 1px), linear-gradient(90deg, #64ffda 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="relative w-[600px] h-[600px]">
        {/* Radar Rings */}
        <div className="absolute inset-0 rounded-full border border-[#64ffda]/20" />
        <div className="absolute inset-4 rounded-full border border-[#64ffda]/10" />
        <div className="absolute inset-16 rounded-full border border-[#64ffda]/10" />
        <div className="absolute inset-32 rounded-full border border-[#64ffda]/10" />
        <div className="absolute inset-48 rounded-full border border-[#64ffda]/20" />
        
        {/* Crosshairs */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#64ffda]/20" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#64ffda]/20" />

        {/* Radar Sweep */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-transparent to-[#64ffda]/30"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            clipPath: 'conic-gradient(from 0deg, transparent 270deg, currentColor 360deg)'
          }}
        />

        {/* Vessels */}
        <VesselPoint x={150} y={150} name="AURORA-IX" status="critical" />
        <VesselPoint x={450} y={200} name="OCEAN-TRACER" status="normal" />
        <VesselPoint x={300} y={450} name="SEAWING-2" status="normal" />

        {/* Center Ship (Own Vessel) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-[#64ffda] rounded-full flex items-center justify-center shadow-[0_0_15px_#64ffda] animate-pulse">
            <Ship className="text-[#0a192f] w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

const VesselPoint: React.FC<{ x: number; y: number; name: string; status: 'normal' | 'critical' }> = ({ x, y, name, status }) => (
  <div 
    className="absolute group cursor-pointer" 
    style={{ left: x, top: y }}
  >
    <div className={`w-3 h-3 rounded-full ${status === 'critical' ? 'bg-red-500 animate-ping' : 'bg-[#64ffda] animate-pulse'}`} />
    <div className={`absolute top-0 left-0 w-3 h-3 rounded-full ${status === 'critical' ? 'bg-red-500' : 'bg-[#64ffda]'}`} />
    
    <div className="absolute left-5 top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[#112240] border border-[#233554] px-2 py-1 rounded text-[10px] whitespace-nowrap z-50">
      <span className="font-bold text-white uppercase">{name}</span>
      <p className="text-[#8892b0]">Class: Tanker</p>
    </div>
  </div>
);

export default RadarMap;
