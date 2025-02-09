import React, { Dispatch, SetStateAction } from 'react';
import { Picture } from './Picture';

interface PicturesContextType {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    perPage: number;
    pictures: Picture[];
    isMorePictures: boolean;
    loading: boolean;
    isGalleryLoading: boolean;
    loadedImages: number;
    setLoadedImages: Dispatch<SetStateAction<number>>;
    picturesEndRef: React.RefObject<HTMLDivElement>;
    data: any;
    error: any;
    handlePictureClick: (image: Picture) => void
}

export const PicturesContext = React.createContext<PicturesContextType>({} as PicturesContextType);
