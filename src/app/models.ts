import { Title } from '@angular/platform-browser';

export interface API_KEY {
    key: string;
}

export interface Country {
    code: string;
    name: string;
    flag: string;
}

export interface News {
    country: string;
    source: string;
    author: string;
    title: string;
    description: string;
    url: string;
    image: string;
    publishDate: string;
    content: string;
    saved?: boolean;
}
