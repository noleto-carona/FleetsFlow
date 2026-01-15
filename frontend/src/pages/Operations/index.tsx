import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import RadarMap from '../../components/RadarMap';
import MainLayout from '../../layouts/MainLayout';
import { AlertTriangle, Activity, Navigation, Anchor, GripHorizontal, Volume2, VolumeX } from 'lucide-react';
import oceanAmbience from '../../audio/indian-ocean-sound.mp3';

const DEFAULT_VOLUME = 0.15;

const OperationsPage: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = backgroundAudioRef.current;
    if (!audio) return;

    const shouldMute = isMuted || volume <= 0;

    if (shouldMute) {
      audio.muted = true;
      audio.pause();
      return;
    }

    audio.muted = false;
    audio.volume = volume;
    audio.loop = true;
    audio.play().catch(() => {});
  }, [isMuted, volume]);

  return (
    <MainLayout>
      <div className="relative w-full h-screen bg-[#0a192f] overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <RadarMap volume={isMuted ? 0 : volume} />
        </div>

        <div className="relative z-10 w-full h-full pointer-events-none p-6">
          
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-auto max-w-2xl animate-pulse pointer-events-auto">
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 text-red-100 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="font-mono tracking-wide uppercase text-sm">
                ALERT: Vessel approaching restricted zone. ETA 25 min.
              </span>
            </div>
          </div>

          <Draggable bounds="parent" handle=".drag-handle">
            <div className="absolute right-4 top-24 w-64 pointer-events-auto cursor-move">
              <div className="bg-[#112240]/80 backdrop-blur-lg border border-[#64ffda] rounded-xl p-4 shadow-[0_0_30px_rgba(100,255,218,0.1)] relative overflow-hidden">
                <div className="drag-handle absolute top-0 left-0 w-full h-6 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-[#64ffda]/10 transition-colors z-20">
                  <GripHorizontal className="w-4 h-4 text-[#64ffda]/50" />
                </div>

                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#64ffda]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#64ffda]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#64ffda]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#64ffda]" />

                <h3 className="text-[#64ffda] font-rockwell uppercase text-sm tracking-widest mb-6 border-b border-[#64ffda]/30 pb-2 mt-2 select-none">
                  Live Telemetry
                </h3>

                <div className="space-y-6 select-none">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 text-[#8892b0]">
                      <Activity className="w-4 h-4 text-[#64ffda]" />
                      <span className="text-sm uppercase">Speed</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white block">12.5</span>
                      <span className="text-xs text-[#64ffda] uppercase">knots</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 text-[#8892b0]">
                      <Navigation className="w-4 h-4 text-[#64ffda]" />
                      <span className="text-sm uppercase">Heading</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white block">045°</span>
                      <span className="text-xs text-[#64ffda] uppercase">NE</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 text-[#8892b0]">
                      <Anchor className="w-4 h-4 text-[#64ffda]" />
                      <span className="text-sm uppercase">Dist. to Port</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white block">15</span>
                      <span className="text-xs text-[#64ffda] uppercase">km</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#233554]">
                    <svg className="w-full h-12 stroke-[#64ffda] fill-none stroke-2" viewBox="0 0 100 20">
                      <path d="M0 10 Q 10 5, 20 10 T 40 10 T 60 15 T 80 5 T 100 10" />
                    </svg>
                    <div className="flex justify-between text-[10px] text-[#8892b0] mt-1 font-mono">
                      <span>-1h</span>
                      <span>Now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Draggable>
          <div className="absolute top-4 right-6 pointer-events-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (isMuted || volume <= 0) {
                  setIsMuted(false);
                  setVolume(prev => (prev <= 0 ? DEFAULT_VOLUME : prev));
                } else {
                  setIsMuted(true);
                  setVolume(0);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#112240]/80 border border-[#64ffda]/50 text-[#ccd6f6] hover:bg-[#64ffda]/10 transition-colors text-[11px]"
            >
              {isMuted || volume <= 0 ? (
                <VolumeX className="w-4 h-4 text-[#64ffda]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#64ffda]" />
              )}
              <span className="text-[10px] font-mono uppercase tracking-wide">
                {isMuted || volume <= 0 ? 'Mute ativo' : 'Som ativo'}
              </span>
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-[#8892b0] font-mono uppercase">Vol</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newVolume = Number(event.target.value);
                  setVolume(newVolume);
                  setIsMuted(newVolume <= 0);
                }}
                className="w-20 h-1 cursor-pointer"
              />
            </div>
          </div>

          <audio ref={backgroundAudioRef} src={oceanAmbience} preload="auto" />

        </div>
      </div>
    </MainLayout>
  );
};

export default OperationsPage;
