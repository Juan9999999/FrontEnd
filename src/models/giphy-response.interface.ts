export interface GiphyResponse {
    data: GiphyGif[];
}

export interface GiphyGif {
    id: string;
    title: string;
    username: string;
    rating: string;
    alt_text?: string;
    images: {
        fixed_height: {
            url: string;
        };
        original: {
            url: string;
        };
    };
}