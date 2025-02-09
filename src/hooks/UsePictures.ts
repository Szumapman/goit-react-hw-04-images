import { useContext } from "react";
import { PicturesContext } from "../interfaces/PicturesContextType";

export const usePictures = () => {
    const { query, setQuery, page, setPage, perPage, pictures, isMorePictures, loading, isGalleryLoading, loadedImages, setLoadedImages, picturesEndRef, data, error, handlePictureClick } = useContext(PicturesContext);
    return { query, setQuery, page, setPage, perPage, pictures, isMorePictures, loading, isGalleryLoading, loadedImages, setLoadedImages, picturesEndRef, data, error, handlePictureClick }
}