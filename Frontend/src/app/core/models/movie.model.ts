export interface Movie {
    id?: number;
    title: string;
    description: string;
    genre: string;
    director: string;
    cast: string;
    language: string;
    duration: number;
    releaseDate: Date;
    posterUrl: string;
}