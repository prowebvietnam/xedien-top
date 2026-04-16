import { Vehicle, VehicleCategory, Article } from '../types';

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: 'VinFast VF 8',
    brand: 'VinFast',
    category: VehicleCategory.ELECTRIC_CAR,
    basePrice: 1090000000,
    maxPrice: 1270000000,
    batteryType: 'LFP',
    batteryCapacity: '82 kWh',
    rangePerCharge: 420,
    topSpeed: 200,
    motorPower: '300 kW',
    chargingTime: '8h (Level 2)',
    operatingCostPerKm: 600,
    maintenanceCostPerYear: 5000000,
    imageUrl: 'https://picsum.photos/seed/vf8/800/600',
    rating: 4.8,
    updatedAt: new Date().toISOString(),
    description: 'Mẫu SUV điện hạng D sang trọng, tích hợp công nghệ ADAS thông minh.'
  },
  {
    id: 'v2',
    name: 'Dat Bike Weaver ++',
    brand: 'Dat Bike',
    category: VehicleCategory.ELECTRIC_MOTORCYCLE,
    basePrice: 65900000,
    maxPrice: 65900000,
    batteryType: 'Lithium-ion',
    batteryCapacity: '5 kWh',
    rangePerCharge: 200,
    topSpeed: 90,
    motorPower: '7 kW',
    chargingTime: '1h (80%)',
    operatingCostPerKm: 150,
    maintenanceCostPerYear: 1000000,
    imageUrl: 'https://picsum.photos/seed/weaver/800/600',
    rating: 4.5,
    updatedAt: new Date().toISOString(),
    description: 'Xe máy điện mạnh nhất Đông Nam Á, sạc siêu nhanh.'
  },
  {
    id: 'v3',
    name: 'VinFast Feliz S',
    brand: 'VinFast',
    category: VehicleCategory.ELECTRIC_MOTORCYCLE,
    basePrice: 27000000,
    maxPrice: 27000000,
    batteryType: 'LFP',
    batteryCapacity: '3.5 kWh',
    rangePerCharge: 198,
    topSpeed: 78,
    motorPower: '3 kW',
    chargingTime: '6h',
    operatingCostPerKm: 100,
    maintenanceCostPerYear: 800000,
    imageUrl: 'https://picsum.photos/seed/feliz/800/600',
    rating: 4.7,
    updatedAt: new Date().toISOString(),
    description: 'Mẫu xe máy điện quốc dân cho học sinh và nhân viên văn phòng.'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Bảng giá xe máy điện VinFast mới nhất tháng 4/2026',
    slug: 'bang-gia-xe-may-dien-vinfast-thang-4-2026',
    content: 'Cập nhật chi tiết giá bán các dòng xe máy điện VinFast như Evo200, Feliz S, Klara S, Vento S...',
    type: 'daily',
    publishedAt: new Date().toISOString(),
    thumbnailUrl: 'https://picsum.photos/seed/news1/400/300',
    keywords: ['giá xe VinFast', 'xe máy điện']
  },
  {
    id: 'a2',
    title: 'So sánh chi phí nuôi xe điện và xe xăng sau 5 năm',
    slug: 'so-sanh-chi-phi-xe-dien-xe-xang',
    content: 'Bài toán kinh tế chi tiết giúp bạn quyết định có nên đổi sang xe điện hay không.',
    type: 'weekly',
    publishedAt: new Date().toISOString(),
    thumbnailUrl: 'https://picsum.photos/seed/news2/400/300',
    keywords: ['tiết kiệm', 'xe điện vs xe xăng']
  }
];
