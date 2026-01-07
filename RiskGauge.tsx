
import React from 'react';

interface RiskGaugeProps {
  score: number;
  level: string;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score, level }) => {
  const rotation = (score / 100) * 180 - 90;
  
  const getLevelColor = () => {
    if (level === 'HIGH' || level === 'IMMEDIATE') return '#EF4444';
    if (level === 'MEDIUM' || level === 'WATCH') return '#F59E0B';
    return '#22C55E';
  };

  return (
    <div className="relative flex flex-col items-center justify-center pt-8 pb-4 animate-fade-in">
      <div className="relative w-56 h-28 overflow-hidden">
        {/* Track */}
        <div className="absolute top-0 left-0 w-56 h-56 border-[16px] border-slate-50 rounded-full"></div>
        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 h-24 bg-slate-800 rounded-full origin-bottom transition-all duration-1000 ease-out z-20"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rounded-full"></div>
        </div>
        {/* Color Gradient Overlay (Simulated) */}
        <div 
          className="absolute top-0 left-0 w-56 h-56 border-[16px] rounded-full transition-all duration-1000"
          style={{ 
            borderColor: getLevelColor(),
            clipPath: `polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)`,
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            transform: `rotate(${(score/100)*180}deg)`,
            opacity: 0.15
          }}
        ></div>
      </div>
      
      <div className="text-center -mt-4 z-30">
        <div className="text-5xl font-black text-slate-900 leading-none">
          {Math.round(score)}<span className="text-sm font-medium text-slate-400 ml-1">/100</span>
        </div>
        <div 
          className="text-xs font-black mt-2 tracking-widest uppercase py-1 px-4 rounded-full"
          style={{ backgroundColor: `${getLevelColor()}15`, color: getLevelColor() }}
        >
          {level} Risk
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;
