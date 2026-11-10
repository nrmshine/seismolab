export type ViewMode = '3d-constructor' | 'earthquake-map' | 'disaster-history' | 'materials' | 'emergency-112';

export type ProjectionMode = 'iso' | 'facade' | 'plan' | 'section' | 'split';

export type Language = 'KZ' | 'RU' | 'EN';

export interface EarthquakeEvent {
  id: string;
  name: string;
  nameEn: string;
  nameKz: string;
  date: string;
  magnitude: number;
  intensityMsk: number;
  depthKm: number;
  epicenter: string;
  coordinates: [number, number]; // [lat, lng]
  distanceToAlmatyKm: number;
  pgaObserved: number;
  fatalities: string;
  description: string;
  structuralImpact: string;
  image?: string;
  lessonsLearned: string[];
}

export interface SeismicStation {
  id: string;
  code: string;
  name: string;
  coords: [number, number];
  status: 'online' | 'warning' | 'calibration';
  pgaNow: number;
  dominantFreqHz: number;
  lastPingSecAgo: number;
}

export interface MaterialSpec {
  id: string;
  name: string;
  nameEn: string;
  nameKz: string;
  category: string;
  dampingRatio: number;
  shearModulusMpa: number;
  maxShearStrain: number;
  description: string;
  advantages: string[];
  kazNiisaApproved: boolean;
  hysteresisType: 'elastomeric' | 'viscous' | 'bilinear' | 'brittle';
}

export interface AssemblyPoint {
  id: string;
  name: string;
  district: string;
  districtEn: string;
  districtKz: string;
  address: string;
  capacityPeople: number;
  hasHeatedTents: boolean;
  hasMedicalPost: boolean;
  coords: [number, number];
}
