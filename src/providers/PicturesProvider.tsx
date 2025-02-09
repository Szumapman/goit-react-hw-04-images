import { useQuery } from "@tanstack/react-query";
import { Picture } from "../interfaces/Picture";
import { getPixabayPictures } from "../utils/GetPixabayPictures";
import { useState, useEffect, useRef, useMemo } from "react";
import toast, { Toaster } from 'react-hot-toast';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { PicturesContext } from "../interfaces/PicturesContextType";


export const PicturesProvider = ({ children }: { children: React.ReactNode }) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(12);
    const [pictures, setPictures] = useState<Picture[]>([]);
    const [isMorePictures, setIsMorePictures] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isGalleryLoading, setIsGalleryLoading] = useState(false);
    const [loadedImages, setLoadedImages] = useState(0);
    
    const { data, error, refetch } = useQuery({
        queryKey: ['pictures', query, page, perPage],
        queryFn: () => getPixabayPictures({ query, page, perPage }),
        enabled: false
    });

    const picturesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (query) {
            setLoading(true);
            refetch();
        }
    }, [query, page, refetch]);

    useEffect(() => {
        setPictures([]);
        setPage(1);
        setIsMorePictures(false);
        setLoading(false);
    }, [query]);

    useEffect(() => {
        if (data && !error) {
            if (page === 1) {
                setPictures(data.hits);
            } else {
                setPictures(prevPictures => {
                    const newPictures = [...prevPictures, ...data.hits];
                    return newPictures;
                });
            }
            setIsMorePictures(page * perPage < data.totalHits);
            setLoading(false);
            if (data.hits.length === 0) {
                toast.error('No images found', { duration: 2000 });
            }
        }
    }, [data, error]);

    useEffect(() => {
        if (loadedImages === pictures.length && loadedImages !== 0) {
            setIsGalleryLoading(false);
            setLoadedImages(0);
            if (picturesEndRef.current) {
                picturesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loadedImages, pictures.length]);

    const handlePictureClick = (image: Picture) => {
        const instance = basicLightbox.create(`<img src="${image.largeImageURL}">`);
        instance.show();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                instance.close();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
    };

    const value = useMemo(() => ({
        query,
        setQuery,
        page,
        setPage,
        perPage,
        pictures,
        isMorePictures,
        loading,
        isGalleryLoading,
        loadedImages,
        setLoadedImages,
        picturesEndRef,
        data,
        error,
        handlePictureClick
    }), [
        query,
        setQuery,
        page,
        setPage,
        perPage,
        pictures,
        isMorePictures,
        loading,
        isGalleryLoading,
        loadedImages,
        setLoadedImages,
        picturesEndRef,
        data,
        error,
        handlePictureClick
    ]);

    return (
        <PicturesContext.Provider value={value}>
            <Toaster position="top-right" reverseOrder={false} />
            <>{children}</>
        </PicturesContext.Provider>
    )   
}