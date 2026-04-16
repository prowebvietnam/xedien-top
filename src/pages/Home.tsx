import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  TrendingDown, 
  Zap, 
  ShieldCheck, 
  Leaf, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_VEHICLES, MOCK_ARTICLES } from '../data/mockData';
import { formatCurrency } from '../lib/utils';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-bg-dark">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://picsum.photos/seed/evhero/1920/1080?blur=4" 
            alt="Hero background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              Cách mạng giao thông xanh Việt Nam
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic">
              DẪN ĐẦU <br />
              <span className="text-tesla-red">THẾ GIỚI MỚI</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
              Khám phá hệ sinh thái xe điện lớn nhất Việt Nam. <br className="hidden md:block" />
              Theo dõi giá, so sánh và đưa ra lựa chọn thông minh.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/catalog">
                <button className="px-10 py-4 bg-tesla-red text-white font-black uppercase text-sm rounded-full flex items-center space-x-2 hover:bg-red-700 transition-all hover:scale-105 active:scale-95">
                  <span>Tìm xe ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/compare">
                <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black uppercase text-sm rounded-full hover:bg-white/20 transition-all">
                  Tính toán chi phí
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Dữ liệu xe', value: '1,200+', icon: Zap },
            { label: 'Cập nhật giá', value: 'Hàng ngày', icon: TrendingDown },
            { label: 'Trạm sạc', value: '5,000+', icon: MapPin },
            { label: 'Người dùng', value: '50k+', icon: ShieldCheck },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center"
            >
              <stat.icon className="w-6 h-6 text-tesla-red mb-2" />
              <div className="text-2xl font-black font-display text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Vehicles */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-tesla-red font-bold text-xs uppercase tracking-widest">Trending</span>
            <h2 className="font-display text-4xl font-black italic tracking-tighter">XE ĐIỆN HOT NHẤT</h2>
          </div>
          <Link to="/catalog" className="flex items-center text-sm font-bold text-slate-500 hover:text-tesla-red">
            Xem tất cả <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_VEHICLES.map((vehicle, i) => (
            <motion.div
              key={vehicle.id}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 bg-slate-100">
                <img 
                  src={vehicle.imageUrl} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center">
                   <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                   Giá ổn định
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-tesla-red text-[10px] font-bold uppercase tracking-widest">{vehicle.brand}</p>
                    <h3 className="font-display text-2xl font-black">{vehicle.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Chỉ từ</p>
                    <p className="font-mono text-lg font-black text-slate-900">{formatCurrency(vehicle.basePrice)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-600 font-medium">{vehicle.rangePerCharge} km/sạc</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-600 font-medium">Eco friendly</span>
                  </div>
                </div>

                <Link to={`/vehicle/${vehicle.id}`}>
                  <button className="w-full py-4 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest group-hover:bg-tesla-red transition-colors">
                    Chi tiết & Báo giá
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Daily Posts Section */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-tesla-red font-bold text-xs uppercase tracking-widest mb-4 block">AI Content Engine</span>
              <h2 className="font-display text-5xl font-black italic tracking-tighter mb-8 leading-tight">
                CẬP NHẬT THỊ TRƯỜNG <br />
                <span className="text-white/20">THÔNG MINH HƠN</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 font-light">
                Hệ thống AI của xedien.top liên tục phân tích biến động giá và xu hướng từ hàng ngàn điểm dữ liệu để mang đến cho bạn cái nhìn đa chiều nhất.
              </p>
              
              <div className="space-y-6">
                {MOCK_ARTICLES.map((article, i) => (
                  <Link 
                    key={article.id} 
                    to={`/news/${article.slug}`}
                    className="flex group items-center space-x-6 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <img src={article.thumbnailUrl} className="w-20 h-20 rounded-xl object-cover" alt="Article" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-slate-100 group-hover:text-tesla-red transition-colors">{article.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 italic">{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative">
               <div className="absolute -inset-10 bg-tesla-red opacity-10 blur-[100px]" />
               <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 relative z-10">
                 <h3 className="text-2xl font-black font-display mb-8">Tính toán TCO (5 năm)</h3>
                 <div className="space-y-8">
                   <div className="relative pt-1">
                     <div className="flex mb-2 items-center justify-between">
                       <div><span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-tesla-red bg-red-200">Xe Điện</span></div>
                       <div className="text-right"><span className="text-xs font-semibold inline-block text-tesla-red">Tiết kiệm 65%</span></div>
                     </div>
                     <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/10">
                       <motion.div initial={{ width: 0 }} animate={{ width: "35%" }} transition={{ duration: 1.5 }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-tesla-red"></motion.div>
                     </div>
                   </div>
                   <div className="relative pt-1">
                     <div className="flex mb-2 items-center justify-between">
                       <div><span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-400 bg-slate-600">Xe Xăng</span></div>
                       <div className="text-right"><span className="text-xs font-semibold inline-block text-slate-400">Chi phí cao</span></div>
                     </div>
                     <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/10">
                       <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5 }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-500"></motion.div>
                     </div>
                   </div>
                 </div>
                 <div className="mt-8 p-4 rounded-xl bg-tesla-red/20 border border-tesla-red/30">
                    <p className="text-xs text-slate-300">Dựa trên phân tích 50 dòng xe phổ biến nhất tại Việt Nam.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
