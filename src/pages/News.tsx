import React from 'react';
import { motion } from 'motion/react';
import { Newspaper, ChevronRight, Calendar, Tag, Sparkles } from 'lucide-react';
import { MOCK_ARTICLES } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function News() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="font-display text-5xl md:text-7xl font-black italic tracking-tighter mb-4 uppercase">Tin Tức <br className="hidden md:block" /> & Thị Trường</h1>
          <p className="text-slate-500 max-w-xl text-lg">Cập nhật xu hướng, bảng giá và công nghệ xe điện mới nhất được tổng hợp bởi AI.</p>
        </div>
        <div className="bg-tesla-red/5 p-6 rounded-3xl border border-tesla-red/10 flex items-center space-x-4">
           <div className="w-12 h-12 bg-tesla-red rounded-full flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6" />
           </div>
           <div>
              <p className="font-black text-xs text-tesla-red uppercase tracking-widest">AI Content Engine</p>
              <p className="text-xs text-slate-600 font-bold">Tự động hóa nội dung 24/7</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {MOCK_ARTICLES.map((article, i) => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500">
               <img 
                src={article.thumbnailUrl} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt={article.title}
                referrerPolicy="no-referrer"
              />
               <div className="absolute top-6 left-6">
                 <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-tesla-red">
                    {article.type}
                 </span>
               </div>
            </div>
            
            <div className="space-y-4 px-2">
              <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
                <span className="flex items-center"><Tag className="w-3 h-3 mr-1" /> {article.keywords[0]}</span>
              </div>
              <h3 className="font-display text-2xl font-black leading-tight group-hover:text-tesla-red transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2 font-light">
                {article.content}
              </p>
              <Link to={`/news/${article.slug}`} className="inline-flex items-center text-xs font-black uppercase tracking-widest text-tesla-red pt-2 group-hover:translate-x-2 transition-transform">
                Đọc báo cáo <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Featured Monthly Report */}
      <div className="mt-24 p-12 md:p-20 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <Newspaper className="w-64 h-64" />
         </div>
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-tesla-red font-bold text-xs uppercase tracking-widest mb-4 block">Premium Report</span>
              <h2 className="font-display text-5xl font-black italic tracking-tighter mb-8 leading-tight">
                XU HƯỚNG <br /> XE ĐIỆN 2026
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-md font-light">
                Phân tích chuyên sâu về sự trỗi dậy của xe điện tại các đô thị lớn Hà Nội, TP.HCM và lộ trình thay thế xe xăng.
              </p>
              <button className="px-10 py-4 bg-tesla-red text-white font-black uppercase text-sm rounded-full shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all">
                Đọc báo cáo chi tiết
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Tỷ lệ tăng trưởng', value: '+45%' },
                { label: 'Dòng xe bán chạy', value: 'SUV' },
                { label: 'Hỗ trợ CP', value: 'Ưu đãi LPTB' },
                { label: 'Hạ tầng sạc', value: '+2,000 trạm' },
              ].map((m, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <p className="text-tesla-red text-[10px] font-black uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-xl font-bold">{m.value}</p>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
