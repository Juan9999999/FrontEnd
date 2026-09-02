// Define los únicos 3 valores permitidos para el rating
export type GifRating = 'g' | 'pg' | 'pg-13';

// Crea el contrato que deben cumplir los objetos
export interface Gif {
    id: string;
    title: string;
    url: string;
    username?: string;
    tags: string[];
    rating: GifRating;
}