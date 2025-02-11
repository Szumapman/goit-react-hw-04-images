import React, { useRef } from 'react';
import { Picture } from "../interfaces/Picture";
import css from './ImageGallery.module.css';
import { usePictures } from '../hooks/UsePictures';

const ImageItem = React.memo(({ picture, handlePictureClick, onLoad }: { picture: Picture, handlePictureClick: (image: Picture) => void, onLoad: () => void }) => {
    return (
        <li key={picture.id} className={css.ImageGalleryItem} onClick={() => handlePictureClick(picture)}>
            <img src={picture.webformatURL} alt={picture.tags} onLoad={onLoad} className={css.ImageGalleryItemImage} />
        </li>
    );
});

export const ImageGallery = React.memo(() => {
    const { pictures, setLoadedImages, handlePictureClick } = usePictures();
    const loadedImageIds = useRef(new Set<number>());

    // const handleImageLoad = (id: number) => {
    //     if (!loadedImageIds.current.has(id)) {
    //         loadedImageIds.current.add(id);
    //         setLoadedImages(prev => prev + 1);
    //     }
    // };

    return (
        <div>
            <ul className={css.ImageGallery}>
                {pictures.map(picture => (
                    <ImageItem
                        key={picture.id}
                        picture={picture}
                        handlePictureClick={handlePictureClick}
                        onLoad={() => setLoadedImages(prev => prev + 1)}
                    />
                ))}
            </ul>
        </div>
    );
});
