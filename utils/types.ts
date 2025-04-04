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

export interface Episode{
    id: string;
    title: string;
    number: number;
    isNew: boolean
    thumbnail: string;
}
