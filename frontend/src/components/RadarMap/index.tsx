import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Ship } from 'lucide-react';
import sonarPing from '../../audio/sonar-ping-95840.mp3';

type VesselStatus = 'normal' | 'critical';

interface Vessel {
  id: string;
  x: number;
  y: number;
  name: string;
  status: VesselStatus;
}

interface RadarMapProps {
  volume?: number;
}

const CENTER_X = 300;
const CENTER_Y = 300;
const MAP_TINT_COLOR = '#64ffda';

const vessels: Vessel[] = [
  { id: 'aurora', x: 150, y: 150, name: 'AURORA-IX', status: 'critical' },
  { id: 'ocean-tracer', x: 450, y: 200, name: 'OCEAN-TRACER', status: 'normal' },
  { id: 'seawing-2', x: 300, y: 450, name: 'SEAWING-2', status: 'normal' },
];

const getAngleFromCenter = (x: number, y: number) => {
  const dx = x - CENTER_X;
  const dy = y - CENTER_Y;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI;
  return (deg + 360) % 360;
};

const RadarMap: React.FC<RadarMapProps> = ({ volume = 1 }) => {
  const [rotation, setRotation] = useState(0);
  const [activeVesselId, setActiveVesselId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const vesselAngles = useMemo(
    () =>
      vessels.map(vessel => ({
        ...vessel,
        angle: getAngleFromCenter(vessel.x, vessel.y),
      })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const detected = vesselAngles.find(vessel => {
      const diff = Math.abs(vessel.angle - rotation);
      const shortest = Math.min(diff, 360 - diff);
      return shortest < 2;
    });

    if (detected) {
      setActiveVesselId(detected.id);
      if (audioRef.current) {
        if (volume > 0) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = volume;
          audioRef.current.muted = false;
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.muted = true;
          audioRef.current.pause();
        }
      }
    } else {
      setActiveVesselId(null);
      if (audioRef.current && volume <= 0) {
        audioRef.current.muted = true;
        audioRef.current.pause();
      }
    }
  }, [rotation, vesselAngles, volume]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0a192f] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'linear-gradient(#64ffda 1px, transparent 1px), linear-gradient(90deg, #64ffda 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="relative w-[600px] h-[600px]">
        <div className="absolute inset-8 rounded-full overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/radar-map.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              filter: 'grayscale(1)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: MAP_TINT_COLOR,
              mixBlendMode: 'screen',
              opacity: 0.008,
            }}
          />
        </div>

        <div className="absolute inset-0 rounded-full border border-[#64ffda]/20" />
        <div className="absolute inset-4 rounded-full border border-[#64ffda]/10" />
        <div className="absolute inset-16 rounded-full border border-[#64ffda]/10" />
        <div className="absolute inset-32 rounded-full border border-[#64ffda]/10" />
        <div className="absolute inset-48 rounded-full border border-[#64ffda]/20" />
        
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#64ffda]/20" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#64ffda]/20" />

        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-transparent to-[#64ffda]/30"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            clipPath: 'conic-gradient(from 0deg, transparent 270deg, currentColor 360deg)'
          }}
        />

        {vesselAngles.map(vessel => (
          <VesselPoint
            key={vessel.id}
            x={vessel.x}
            y={vessel.y}
            name={vessel.name}
            status={vessel.status}
            isActive={activeVesselId === vessel.id}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-[#64ffda] rounded-full flex items-center justify-center shadow-[0_0_15px_#64ffda] animate-pulse">
            <Ship className="text-[#0a192f] w-6 h-6" />
          </div>
        </div>

        <audio ref={audioRef} src={sonarPing} preload="auto" />
      </div>
    </div>
  );
};

interface VesselPointProps {
  x: number;
  y: number;
  name: string;
  status: VesselStatus;
  isActive?: boolean;
}

const VesselPoint: React.FC<VesselPointProps> = ({ x, y, name, status, isActive }) => (
  <div 
    className="absolute group cursor-pointer" 
    style={{ left: x, top: y }}
  >
    <div
      className={`rounded-full ${
        status === 'critical' ? 'bg-red-500' : 'bg-[#64ffda]'
      } ${isActive ? 'w-4 h-4 shadow-[0_0_20px_rgba(100,255,218,0.9)]' : 'w-3 h-3 animate-pulse'}`}
    />
    <div
      className={`absolute top-0 left-0 rounded-full ${
        status === 'critical' ? 'bg-red-500' : 'bg-[#64ffda]'
      } ${isActive ? 'w-6 h-6 opacity-40' : 'w-3 h-3'}`}
    />
    
    <div className="absolute left-5 top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[#112240] border border-[#233554] px-2 py-1 rounded text-[10px] whitespace-nowrap z-50">
      <span className="font-bold text-white uppercase">{name}</span>
      <p className="text-[#8892b0]">Class: Tanker</p>
    </div>
  </div>
);

export default RadarMap;
