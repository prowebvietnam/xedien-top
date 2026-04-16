import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Search, Navigation, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const MOCK_STATIONS = [
  { id: 1, name: 'Trạm VinFast Landmark 81', address: '720A Điện Biên Phủ, P.22, Bình Thạnh, TP.HCM', type: 'Siêu sạc 250kW', status: 'Sẵn sàng' },
  { id: 2, name: 'Showroom Selex Motors', address: '49 Nguyễn Văn Linh, P.Tân Thuận Tây, Q.7, TP.HCM', type: 'Đổi pin nhanh', status: 'Sẵn sàng' },
  { id: 3, name: 'Trạm Pega Hà Nội', address: '426 Xã Đàn, Đống Đa, Hà Nội', type: 'Sạc tiêu chuẩn', status: 'Bận' },
];

export default function StationMap() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-display text-5xl font-black italic tracking-tighter mb-4">HỆ THỐNG TRẠM SẠC</h1>
        <p className="text-slate-500 max-w-2xl">Tìm kiếm trạm sạc và điểm đổi pin gần nhất cho xe máy điện và ô tô điện của bạn.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[70vh]">
        {/* Sidebar List */}
        <div className="lg:col-span-1 border border-slate-200 rounded-[2rem] bg-white overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Tìm theo khu vực..." 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-tesla-red outline-none transition-all text-sm"
                />
             </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
             {MOCK_STATIONS.map((station) => (
               <div key={station.id} className="p-6 rounded-2xl border border-slate-100 hover:border-tesla-red/30 hover:bg-red-50/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 group-hover:text-tesla-red">{station.name}</h4>
                    <span className={cn(
                      "text-[8px] font-black uppercase px-2 py-1 rounded-full",
                      station.status === 'Sẵn sàng' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {station.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{station.address}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[10px] font-bold text-slate-400">
                      <Zap className="w-3 h-3 mr-1 text-tesla-red" />
                      {station.type}
                    </div>
                    <button className="text-tesla-red">
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-2 relative bg-slate-100 border border-slate-200 rounded-[2.5rem] overflow-hidden">
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl mb-6">
                <MapPin className="w-10 h-10 text-tesla-red animate-bounce" />
             </div>
             <h3 className="text-2xl font-black font-display mb-4 italic">BẢN ĐỒ CHI TIẾT</h3>
             <p className="text-slate-500 max-w-sm">Phần mềm đang tích hợp dữ liệu Google Maps Real-time cho hơn 5,000 trạm sạc toàn quốc.</p>
             <div className="mt-8 flex space-x-4">
               <button className="px-8 py-3 bg-tesla-red text-white text-xs font-black uppercase rounded-full">Phóng to</button>
               <button className="px-8 py-3 bg-white border border-slate-200 text-slate-900 text-xs font-black uppercase rounded-full">Lọc nhà cung cấp</button>
             </div>
           </div>
           
           {/* Decorative elements for map look */}
           <div className="absolute bottom-6 left-6 right-6 h-32 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 p-6 flex items-center justify-between">
              <div className="flex -space-x-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} />
                   </div>
                 ))}
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">2,410 trạm sạc</p>
                <p className="text-[10px] text-slate-500">Đang hoạt động xung quanh bạn</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
