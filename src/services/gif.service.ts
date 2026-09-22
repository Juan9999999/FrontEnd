import type { Gif, GifRating } from '../models/gif.interface';
import type { GiphyResponse, GiphyGif } from '../models/giphy-response.interface';

// Lee la variable de entorno que configuraste en tu .env.local
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

// Función para transformar el modelo externo de Giphy al modelo interno de GIFinder
function mapGiphyGif(giphyGif: GiphyGif): Gif {
    return {
        id: giphyGif.id,
        title: giphyGif.title || 'GIF sin título',
        url: giphyGif.images.fixed_height.url, // Imagen ligera para la galería
        detailUrl: giphyGif.images.original.url, // Imagen pesada para el detalle
        username: giphyGif.username || 'Autor desconocido',
        tags: [], // Giphy no devuelve tags en este endpoint por defecto
        rating: (giphyGif.rating || 'g') as GifRating,
        altText: giphyGif.alt_text || 'Animación GIF',
    };
}

// Función asíncrona para obtener las tendencias (Carga inicial)
export async function getTrendingGifs(): Promise<Gif[]> {
    const url = `${BASE_URL}/trending?api_key=${API_KEY}&limit=20&rating=g`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error en la petición HTTP: ${response.status}`);
    }

    const json = (await response.json()) as GiphyResponse;
    return json.data.map(mapGiphyGif);
}

// Función asíncrona para buscar GIFs (Cuando el usuario usa el formulario)
export async function searchGifsFromApi(query: string): Promise<Gif[]> {
    if (!query.trim()) return [];

    const params = new URLSearchParams({
        api_key: API_KEY,
        q: query,
        limit: '20',
        rating: 'g',
        lang: 'es'
    });

    const response = await fetch(`${BASE_URL}/search?${params.toString()}`);
    if (!response.ok) {
        throw new Error(`Error en la búsqueda HTTP: ${response.status}`);
    }

    const json = (await response.json()) as GiphyResponse;
    return json.data.map(mapGiphyGif);
}