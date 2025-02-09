import React, { useMemo } from "react";
import { usePictures } from "../hooks/UsePictures";
import css from './ImageGallery.module.css';
import { Picture } from "../interfaces/Picture";

const ImageItem = React.memo(({ picture, handlePictureClick, onLoad }: { picture: Picture, handlePictureClick: (image: Picture) => void, onLoad: () => void }) => {
    return (
        <li key={picture.webformatURL} className={css.ImageGalleryItem} onClick={() => handlePictureClick(picture)}>
            <img src={picture.webformatURL} alt={picture.tags} onLoad={onLoad} className={css.ImageGalleryItemImage} />
        </li>
    );
});

export const ImageGallery = React.memo(() => {
    
    const { pictures, setLoadedImages, handlePictureClick } = usePictures();

    const handleImageLoad = () => {
        setLoadedImages(prev => prev + 1);
    };

    const imageItems = useMemo(() => {
        return pictures.map(picture => (
            <ImageItem
                key={picture.webformatURL}
                picture={picture}
                handlePictureClick={handlePictureClick}
                onLoad={handleImageLoad}
            />
        ));
    }, [pictures, handlePictureClick]);
    
    return (
        <div>
            <ul className={css.ImageGallery}>
                {imageItems}
            </ul>
        </div>
    );
});
