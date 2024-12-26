export interface Webtoon{
    id: number;
    title: string;
    language: string;
    author: string;
    genres: string[];
    isNew: boolean;
    hasNewEpisodes: boolean;
    thumbnail: string;
}
