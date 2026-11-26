"use client";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function UsageChart({ data }: { data: { day: string; calls: number }[] }) {
  return (
    <div className="h-64">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3DDC84" stopOpacity={0.5} /><stop offset="100%" stopColor="#3DDC84" stopOpacity={0} /></linearGradient></defs>
          <CartesianGrid stroke="#ffffff14" vertical={false} />
          <XAxis dataKey="day" stroke="#ffffff80" fontSize={12} />
          <YAxis allowDecimals={false} stroke="#ffffff80" fontSize={12} />
          <Tooltip contentStyle={{ background: "#22252b", border: "1px solid #ffffff22" }} />
          <Area type="monotone" dataKey="calls" stroke="#3DDC84" fill="url(#g)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
