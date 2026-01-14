import React from 'react';
// react-draggable is not installed; replacing with a simple wrapper
const Draggable: React.FC<{ bounds: string; handle: string; children: React.ReactNode }> = ({ children }) => <>{children}</>;
import RadarMap from '../../components/RadarMap';
import MainLayout from '../../layouts/MainLayout';
import { AlertTriangle, Activity, Navigation, Anchor, GripHorizontal } from 'lucide-react';

const OperationsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="relative w-full h-screen bg-[#0a192f] overflow-hidden">
        
        {/* Camada de Fundo: Radar Map */}
        <div className="absolute inset-0 z-0">
          <RadarMap />
        </div>

        {/* Camada de HUD (Heads-Up Display) */}
        <div className="relative z-10 w-full h-full pointer-events-none p-6">
          
          {/* Top Alert Bar */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-auto max-w-2xl animate-pulse pointer-events-auto">
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 text-red-100 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="font-mono tracking-wide uppercase text-sm">
                ALERT: Vessel approaching restricted zone. ETA 25 min.
              </span>
            </div>
          </div>

          {/* Right Floating Panel (Telemetry) - Draggable */}
          <Draggable bounds="parent" handle=".drag-handle">
            <div className="absolute right-8 top-24 w-80 pointer-events-auto cursor-move">
              <div className="bg-[#112240]/80 backdrop-blur-lg border border-[#64ffda] rounded-xl p-6 shadow-[0_0_30px_rgba(100,255,218,0.1)] relative overflow-hidden">
                {/* Drag Handle Indicator */}
                <div className="drag-handle absolute top-0 left-0 w-full h-6 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-[#64ffda]/10 transition-colors z-20">
                  <GripHorizontal className="w-4 h-4 text-[#64ffda]/50" />
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#64ffda]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#64ffda]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#64ffda]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#64ffda]" />

                <h3 className="text-[#64ffda] font-rockwell uppercase text-sm tracking-widest mb-6 border-b border-[#64ffda]/30 pb-2 mt-2 select-none">
                  Live Telemetry
                </h3>

                <div className="space-y-6 select-none">
                  {/* Speed */}
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

                  {/* Heading */}
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

                  {/* Distance */}
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

                  {/* Mini Graph (Sparkline simulation) */}
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

        </div>
      </div>
    </MainLayout>
  );
};

export default OperationsPage;
