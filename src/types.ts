export type Language = 'mr' | 'en';

export interface Chapter {
  id: string;
  number: string;
  titleMr: string;
  titleEn: string;
  taglineMr: string;
  taglineEn: string;
  iconName: string;
  accentColor: string;
}

export interface Fort {
  id: string;
  nameMr: string;
  nameEn: string;
  year: string;
  type: string;
  district: string;
  elevation: string;
  significanceMr: string;
  significanceEn: string;
  historyMr: string;
  historyEn: string;
  keyFeatureMr: string;
  keyFeatureEn: string;
  quoteMr?: string;
  quoteEn?: string;
  coordinates: { x: number; y: number }; // Relative map % (x: 0-100, y: 0-100)
  themeColor: string;
  bgGradient: string;
  fortCategory: 'hill' | 'sea' | 'land';
}

export interface BattleTactic {
  id: string;
  titleMr: string;
  titleEn: string;
  descMr: string;
  descEn: string;
  icon: string;
  quoteMr?: string;
}

export interface HistoricalFigure {
  nameMr: string;
  nameEn: string;
  roleMr: string;
  roleEn: string;
  descMr: string;
  descEn: string;
}

export interface Weapon {
  nameMr: string;
  nameEn: string;
  typeMr: string;
  typeEn: string;
  descMr: string;
  descEn: string;
  lengthOrSpec: string;
}
