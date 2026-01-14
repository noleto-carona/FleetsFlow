
import React from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  subValue?: string;
  chartData?: { val: number }[];
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, subValue, chartData }) => {
  return (
    <div className="glass-panel p-5 rounded-xl border-l-2 border-l-cyan-500 min-w-[240px]">
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        <i className="fa-solid fa-compass text-cyan-500"></i>
        {label}
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-light mono text-white">{value}</span>
        <span className="text-xs font-medium text-slate-500 uppercase">{unit}</span>
      </div>
      
      {subValue && (
        <div className="text-[10px] font-mono text-slate-500">
          {subValue}
        </div>
      )}

      {chartData && (
        <div className="h-10 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <Bar dataKey="val" fill="#22d3ee" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatCard;
