import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Zap, 
  MapPin, 
  Shield, 
  Battery, 
  Gauge, 
  FastForward, 
  Clock, 
  ChevronLeft,
  Star,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { MOCK_VEHICLES } from '../data/mockData';
import { formatCurrency, cn } from '../lib/utils';
import { generateEVInsight } from '../services/aiService';

export default function VehicleDetail() {
  const { id } = useParams();
  const vehicle = MOCK_VEHICLES.find(v => v.id === id);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setLoadingAi(true);
      generateEVInsight(vehicle.name, vehicle).then(res => {
        setAiInsight(res);
        setLoadingAi(false);
      });
    }
  }, [id, vehicle]);

  if (!vehicle) return <div className="p-20 text-center">Vehicle not found</div>;

  return (
    <div className="pb-20">
      {/* Detail Hero */}
      <section className="relative h-[60vh] bg-bg-dark">
        <img 
          src={vehicle.imageUrl} 
          className="w-full h-full object-cover opacity-60" 
          alt={vehicle.name} 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent" />
        <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-4">
           <Link to="/catalog" className="flex items-center text-white/60 hover:text-white mb-6 text-sm font-bold uppercase tracking-widest transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" /> Quay lại bảng giá
           </Link>
           <h1 className="font-display text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none mb-4 uppercase">
             {vehicle.name}
           </h1>
           <div className="flex items-center space-x-4">
             <span className="bg-tesla-red text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
               {vehicle.brand}
             </span>
             <div className="flex items-center text-yellow-400">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className={cn("w-4 h-4 fill-current", i < Math.floor(vehicle.rating) ? "opacity-100" : "opacity-30")} />
               ))}
               <span className="ml-2 text-white font-bold">{vehicle.rating}</span>
             </div>
           </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Quãng đường', value: `${vehicle.rangePerCharge} km`, icon: Zap },
                { label: 'Tốc độ tối đa', value: `${vehicle.topSpeed} km/h`, icon: Gauge },
                { label: 'Pin', value: vehicle.batteryCapacity, icon: Battery },
                { label: 'Sạc (Level 2)', value: vehicle.chargingTime, icon: Clock },
              ].map((spec, i) => (
                <div key={i} className="text-center md:text-left">
                  <spec.icon className="w-6 h-6 text-tesla-red mb-4 mx-auto md:mx-0" />
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="font-display text-xl font-bold text-slate-900">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
               <h2 className="font-display text-3xl font-black italic">MÔ TẢ CHI TIẾT</h2>
               <p className="text-slate-600 leading-relaxed text-lg font-light">{vehicle.description}</p>
            </div>

            {/* AI Insight Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-12 rounded-[3rem] border border-indigo-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 text-indigo-200">
                 <Sparkles className="w-20 h-20" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-6">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-black text-indigo-600 uppercase tracking-widest">AI Market Analysis</span>
                  </div>
                  <h3 className="text-2xl font-black mb-6">Đánh giá từ xedien.top AI</h3>
                  {loadingAi ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-indigo-200 rounded w-full"></div>
                      <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
                      <div className="h-4 bg-indigo-200 rounded w-4/6"></div>
                    </div>
                  ) : (
                    <div className="prose prose-indigo max-w-none text-slate-600 leading-relaxed">
                      {aiInsight || "Đang tải phân tích thị trường..."}
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Sidebar / Buying Info */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white sticky top-24">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-tesla-red mb-2">Báo giá hôm nay</h3>
               <div className="text-4xl font-mono font-black mb-10">{formatCurrency(vehicle.basePrice)}</div>
               
               <div className="space-y-4 mb-10">
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                   <span className="text-sm text-slate-400">Thuế VAT</span>
                   <span className="text-sm font-bold">10% (Included)</span>
                 </div>
                 <div className="flex justify-between items-center py-4 border-b border-white/10">
                   <span className="text-sm text-slate-400">Ưu đãi lệ phí trước bạ</span>
                   <span className="text-sm font-bold text-green-400">0 VNĐ</span>
                 </div>
               </div>

               <button className="w-full py-5 rounded-2xl bg-tesla-red hover:bg-red-700 transition-all font-black uppercase text-sm mb-4 shadow-xl shadow-red-500/20">
                 Đăng ký tư vấn
               </button>
               <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/20 hover:bg-white/10 transition-all font-black uppercase text-sm">
                 Tải catalog PDF
               </button>

               <div className="mt-8 flex items-center justify-center space-x-6 text-slate-500">
                  <div className="flex flex-col items-center">
                    <Shield className="w-5 h-5 mb-1" />
                    <span className="text-[10px] uppercase font-bold">Bảo hành 10 năm</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Star className="w-5 h-5 mb-1" />
                    <span className="text-[10px] uppercase font-bold">4.8 Rating</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
