import css from './App.module.css'
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPixabayPictures } from './utils/GetPixabayPictures';
import { SearchBar } from "./components/SearchBar";
import { ImageGallery } from "./components/ImageGallery";
import { ButtonLoadMore } from "./components/ButtonLoadMore";
import { Spinner } from './components/Spinner';
import { Picture } from './interfaces/Picture';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import toast, { Toaster } from 'react-hot-toast';


function App() {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [pictures, setPictures] = useState<Picture[]>([])
  const [isMorePictures, setIsMorePictures] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setPictures(prevPictures => [...prevPictures, ...data.hits]);
      setIsMorePictures(page * perPage < data.totalHits);
      setLoading(false);
      if (data.hits.length === 0) {
          toast.error('No images found', { duration: 2000 });
      }
    }
  }, [data, error]);

  useEffect(() => {
    if (loadedImages < pictures.length) {
      setLoading(true);
    }
    if (loadedImages === pictures.length && loadedImages !== 0) {
        setLoading(false);
        picturesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={setQuery} />
      <div className={css.App}>
        {error && <p>Error</p>}
        {query && <ImageGallery images={pictures} handleImageClick={handlePictureClick} onImageLoad={() => setLoadedImages(prev => prev + 1)} />}
        <div ref={picturesEndRef}></div>
        {loading && <Spinner />}
        {data && !loading && !error && isMorePictures && <ButtonLoadMore onClick={() => setPage(prevPage => prevPage + 1)} />}
      </div>
    </>
  )
}

export default App
