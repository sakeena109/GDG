
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { VitalRecord } from '../types';

interface HealthChartProps {
  data: VitalRecord[];
  dataKey: 'heartRate' | 'spo2' | 'temperature';
  label: string;
  color: string;
  yDomain: [number, number];
  threshold?: number;
}

const HealthChart: React.FC<HealthChartProps> = ({ data, dataKey, label, color, yDomain, threshold }) => {
  const formattedData = data.map(v => ({
    ...v,
    time: new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">{label} Trend</h3>
        <span className="text-xs text-slate-400">Live Updates</span>
      </div>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="time" 
              hide={true} 
            />
            <YAxis 
              domain={yDomain} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            {threshold && (
              <ReferenceLine y={threshold} stroke="#fecaca" strokeDasharray="3 3" />
            )}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3} 
              dot={false}
              isAnimationActive={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthChart;
