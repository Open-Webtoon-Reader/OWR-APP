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

export interface EpisodeWithProgression extends Episode{
    progression?: number;
}

export interface EpisodeData{
    title: string;
    previousEpisodeId: number;
    nextEpisodeId: number;
}

export interface Progression{
    episodeId: string;
    progression: number;
}

export interface User{
    id: string;
    username: string;
    email: string;
    avatar: string;
    admin: boolean;
}
