export interface GalleryImage {
  id: number;
  url: string;
  title: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    url: '/galeria/zdjecie1.jpg',
    title: 'Serwis pompy hydraulicznej'
  },
  {
    id: 2,
    url: '/galeria/zdjecie2.jpg',
    title: 'Regeneracja siłownika'
  }
];
