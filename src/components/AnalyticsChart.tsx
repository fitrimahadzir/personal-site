import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Filter, Loader2 } from 'lucide-react';

interface AnalyticsChartProps {
  projectsCount?: number;
  articlesCount?: number;
}

export default function AnalyticsChart({ projectsCount = 0, articlesCount = 0 }: AnalyticsChartProps) {
  const [trendData, setTrendData] = useState([
    { name: 'May 01', pageViews: 140, requests: 620 },
    { name: 'May 02', pageViews: 165, requests: 655 },
    { name: 'May 03', pageViews: 155, requests: 540 },
    { name: 'May 04', pageViews: 195, requests: 875 },
    { name: 'May 05', pageViews: 185, requests: 760 },
    { name: 'May 06', pageViews: 210, requests: 990 },
    { name: 'May 07', pageViews: 160, requests: 545 },
    { name: 'May 08', pageViews: 175, requests: 665 },
    { name: 'May 09', pageViews: 200, requests: 785 },
    { name: 'May 10', pageViews: 215, requests: 800 },
    { name: 'May 11', pageViews: 205, requests: 790 },
    { name: 'May 12', pageViews: 180, requests: 650 },
  ]);

  useEffect(() => {
    fetch('/api/analytics/cloudflare?timeframe=month')
      .then(res => res.json())
      .then(json => {
        if (json.data?.viewer?.zones?.[0]?.httpRequests1dGroups) {
          const groups = json.data.viewer.zones[0].httpRequests1dGroups;
          const chartData = groups.map((g: any) => {
            const d = new Date(g.dimensions.date);
            return {
              name: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
              pageViews: g.sum.pageViews || 0,
              requests: g.sum.requests || 0
            };
          }).filter((g: any) => g.requests > 0); // Remove completely empty days
          if (chartData.length > 0) setTrendData(chartData);
        }
      })
      .catch(console.error);
  }, []);

  const contentData = [
    { name: 'Projects', value: projectsCount || 5, color: '#1e3a8a' },
    { name: 'Articles', value: articlesCount || 3, color: '#b45309' },
    { name: 'Services', value: 3, color: '#10b981' }
  ];

  const locationData = [
    { name: 'Malaysia', value: 780 },
    { name: 'United States', value: 500 },
    { name: 'Singapore', value: 380 },
    { name: 'Indonesia', value: 320 },
    { name: 'United Kingdom', value: 280 },
    { name: 'Australia', value: 250 },
  ];

  const sourceData = [
    { name: 'Direct Traffic', count: 3812, percentage: '65.1%', fill: '65.1%' },
    { name: 'Organic Search', count: 1234, percentage: '21.0%', fill: '21.0%' },
    { name: 'Social Media', count: 543, percentage: '9.3%', fill: '9.3%' },
    { name: 'Referrals', count: 269, percentage: '4.6%', fill: '4.6%' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend line chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-stretch">
          <div className="flex justify-between items-start mb-6">
             <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">Traffic Overview</h3>
                <p className="text-xs text-slate-500">Daily API requests vs. page views</p>
             </div>
             <button className="text-slate-400 hover:text-slate-600">
               <Filter size={16} />
             </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickCount={5}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  name="API Requests"
                  stroke="#1e3a8a" 
                  fillOpacity={1} 
                  fill="url(#colorRequests)"
                  strokeWidth={2} 
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pageViews" 
                  name="Page Views"
                  stroke="#b45309" 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-900">
              <span className="w-2 h-2 rounded-full border border-blue-900 bg-transparent flex items-center justify-center p-0.5"><div className="w-1 h-1 bg-blue-900 rounded-full" /></span> Total Requests
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-amber-700">
              <span className="w-2 h-2 rounded-full border border-amber-700 bg-transparent flex items-center justify-center p-0.5"><div className="w-1 h-1 bg-amber-700 rounded-full" /></span> Page Views
            </div>
          </div>
        </div>

        {/* Content Distribution Donut */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
           <div>
             <h3 className="text-base font-bold text-slate-900 leading-tight">Content Distribution</h3>
             <p className="text-xs text-slate-500">Breakdown of portfolio resources</p>
           </div>
           <div className="flex-1 flex flex-col justify-center items-center py-4 relative">
             <div className="h-40 w-full relative left-1/2 -ml-[50%]">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={contentData}
                     cx="50%"
                     cy="50%"
                     innerRadius={50}
                     outerRadius={70}
                     paddingAngle={3}
                     dataKey="value"
                     stroke="none"
                   >
                     {contentData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                 </PieChart>
               </ResponsiveContainer>
             </div>
           </div>
           <div className="flex flex-col gap-2 mt-2">
             {contentData.map((item, i) => (
               <div key={i} className="flex justify-between items-center text-xs">
                 <div className="flex items-center gap-2 text-slate-600 font-medium">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                   {item.name}
                 </div>
                 <span className="font-bold text-slate-900">{item.value.toLocaleString()}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Demographics Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
           <h3 className="text-base font-bold text-slate-900 leading-tight">Visitor Demographics</h3>
           <p className="text-xs text-slate-500 mb-6">Top countries by traffic volume</p>
           <div className="h-64 w-full pl-6">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={locationData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                 <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                 <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={80} />
                 <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                 <Bar dataKey="value" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={16} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col p-6 w-full">
           <h3 className="text-base font-bold text-slate-900 leading-tight">Traffic Sources</h3>
           <p className="text-xs text-slate-500 mb-6">Breakdown by acquisition channel</p>
           
           <div className="flex flex-col gap-5 flex-1">
             {sourceData.map((item, i) => (
               <div key={i} className="flex flex-col gap-1 w-full relative group">
                 <div className="flex justify-between items-end mb-1">
                   <h4 className="text-sm font-bold text-slate-800 leading-none">{item.name}</h4>
                   <div className="text-xs text-slate-500 group-hover:text-slate-900 transition-colors">
                     {item.count.toLocaleString()} <span className="font-bold text-slate-800 ml-1">{item.percentage}</span>
                   </div>
                 </div>
                 <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-[#1e3a8a] rounded-full transition-all duration-1000 ease-out" style={{ width: item.fill }} />
                 </div>
               </div>
             ))}
           </div>
           
           <div className="grid grid-cols-2 gap-4 mt-8 pt-4">
              <div className="bg-slate-100 rounded-xl p-4 flex flex-col justify-end">
                <span className="text-[10px] text-slate-500 mb-1">Total Sources</span>
                <span className="text-2xl font-bold text-slate-900">12</span>
              </div>
              <div className="bg-slate-100 rounded-xl p-4 flex flex-col justify-end">
                <span className="text-[10px] text-slate-500 mb-1">Top Channel Growth</span>
                <span className="text-2xl font-bold text-emerald-600">+14%</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
