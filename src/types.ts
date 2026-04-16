export enum VehicleCategory {
  ELECTRIC_BIKE = 'electric_bike',
  ELECTRIC_MOTORCYCLE = 'electric_motorcycle',
  ELECTRIC_CAR = 'electric_car',
  ELECTRIC_TRUCK = 'electric_truck',
  ELECTRIC_BUS = 'electric_bus',
  SPECIALIZED = 'specialized'
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: VehicleCategory;
  basePrice: number;
  maxPrice: number;
  batteryType: string;
  batteryCapacity: string;
  rangePerCharge: number;
  topSpeed: number;
  motorPower: string;
  chargingTime: string;
  operatingCostPerKm: number;
  maintenanceCostPerYear: number;
  imageUrl: string;
  rating: number;
  updatedAt: string;
  description?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  type: 'daily' | 'weekly' | 'monthly' | 'review';
  publishedAt: string;
  thumbnailUrl: string;
  keywords: string[];
}

export interface ChargingStation {
  id: string;
  name: string;
  provider: string;
  address: string;
  latitude: number;
  longitude: number;
  connectorTypes: string[];
  status: 'active' | 'maintenance' | 'planned';
}
