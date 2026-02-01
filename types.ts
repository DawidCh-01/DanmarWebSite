
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  isAnalyzing?: boolean;
}

export enum AppSection {
  HERO = 'hero',
  SERVICES = 'services',
  ABOUT = 'about',
  GALLERY = 'gallery',
  CONTACT = 'contact'
}
