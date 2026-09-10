import React from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { ArrowUpRight, Droplets, Leaf, Sprout, Target, TrendingUp } from 'lucide-react';

const monthlyYield = [
    { month: 'Jan', yield: 18, target: 16 },
    { month: 'Feb', yield: 20, target: 18 },
    { month: 'Mar', yield: 19, target: 20 },
    { month: 'Apr', yield: 23, target: 21 },
    { month: 'May', yield: 26, target: 23 },
    { month: 'Jun', yield: 29, target: 25 },
];

const cropMix = [
    { name: 'Wheat', value: 42, color: '#16a34a' },
    { name: 'Rice', value: 28, color: '#0ea5e9' },
    { name: 'Maize', value: 18, color: '#f59e0b' },
    { name: 'Pulses', value: 12, color: '#8b5cf6' },
];

const soilHealth = [
    { name: 'Nitrogen', value: 78 },
    { name: 'Phosphorus', value: 64 },
    { name: 'Potassium', value: 82 },
    { name: 'Moisture', value: 71 },
];

const StatCard = ({ icon, label, value, detail, tone }) => (
    <div className="glass-card rounded-3xl border border-white bg-white/70 p-5 shadow-xl shadow-gray-200/50">
        <div className="mb-4 flex items-center justify-between">
            <div className={`rounded-2xl p-3 ${tone}`}>{icon}</div>
            <ArrowUpRight size={18} className="text-green-600" />
        </div>
        <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500">{label}</p>
        <p className="mt-1 text-3xl font-black text-gray-800">{value}</p>
        <p className="mt-1 text-xs font-semibold text-gray-500">{detail}</p>
    </div>
);

const Analytics = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-emerald-100 px-8 pb-12 pt-8 fade-in">
        <div className="mx-auto max-w-[1600px]">
            <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-green-600">Farm intelligence</p>
                    <h1 className="text-4xl font-black tracking-tight text-gray-800">Analytics overview</h1>
                    <p className="mt-2 font-medium text-gray-500">Track productivity, crop mix and soil performance in one place.</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-white/80 px-4 py-2 text-sm font-bold text-gray-600 shadow-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" /> Last 6 months
                </div>
            </header>

            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard icon={<TrendingUp size={22} />} label="Average yield" value="24.8 Qtl" detail="14% above last season" tone="bg-green-100 text-green-600" />
                <StatCard icon={<Sprout size={22} />} label="Active crops" value="4" detail="Across 12.4 acres" tone="bg-emerald-100 text-emerald-600" />
                <StatCard icon={<Droplets size={22} />} label="Water efficiency" value="86%" detail="8% saved this month" tone="bg-blue-100 text-blue-600" />
                <StatCard icon={<Target size={22} />} label="Goal progress" value="78%" detail="On track for this season" tone="bg-orange-100 text-orange-600" />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <section className="glass-card rounded-3xl border border-white bg-white/70 p-6 shadow-xl shadow-gray-200/50 xl:col-span-2">
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-extrabold text-gray-800">Yield performance</h2>
                            <p className="mt-1 text-sm font-medium text-gray-500">Actual yield compared with your monthly target</p>
                        </div>
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-extrabold text-green-700">+14% YoY</span>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyYield} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="analyticsYield" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: 14, border: '1px solid #dcfce7', fontWeight: 700 }} />
                                <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" fill="none" strokeWidth={2} />
                                <Area type="monotone" dataKey="yield" stroke="#16a34a" fill="url(#analyticsYield)" strokeWidth={4} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <section className="glass-card rounded-3xl border border-white bg-white/70 p-6 shadow-xl shadow-gray-200/50">
                    <h2 className="text-xl font-extrabold text-gray-800">Crop distribution</h2>
                    <p className="mt-1 text-sm font-medium text-gray-500">Current cultivated area by crop</p>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={cropMix} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={4}>
                                    {cropMix.map((crop) => <Cell key={crop.name} fill={crop.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 14, border: '1px solid #e5e7eb', fontWeight: 700 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {cropMix.map((crop) => (
                            <div key={crop.name} className="flex items-center gap-2 text-sm font-bold text-gray-600">
                                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: crop.color }} /> {crop.name} <span className="ml-auto text-gray-400">{crop.value}%</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="glass-card mt-6 rounded-3xl border border-white bg-white/70 p-6 shadow-xl shadow-gray-200/50">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-extrabold text-gray-800">Soil health indicators</h2>
                        <p className="mt-1 text-sm font-medium text-gray-500">Latest readings from your field profile</p>
                    </div>
                    <Leaf className="text-green-600" size={24} />
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={soilHealth} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                            <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis type="category" dataKey="name" width={80} axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 700 }} />
                            <Tooltip contentStyle={{ borderRadius: 14, border: '1px solid #dcfce7', fontWeight: 700 }} />
                            <Bar dataKey="value" fill="#16a34a" radius={[0, 8, 8, 0]} barSize={22} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    </div>
);

export default Analytics;