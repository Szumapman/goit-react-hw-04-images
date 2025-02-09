import css from './App.module.css'
import { usePictures } from "./hooks/UsePictures";
import { SearchBar } from "./components/SearchBar";
import { ImageGallery } from "./components/ImageGallery";
import { ButtonLoadMore } from "./components/ButtonLoadMore";
import { Spinner } from './components/Spinner';


function App() {

  const { isMorePictures, loading, isGalleryLoading, picturesEndRef, data, error} = usePictures();

  return (
    <>
      <SearchBar />
      <div className={css.App}>
        {error && <p>Error</p>}
        {data && <ImageGallery />}
        {(loading || isGalleryLoading) && <Spinner/>}  
        <div ref={picturesEndRef}></div>
        {data && !loading && !isGalleryLoading && !error && isMorePictures && <ButtonLoadMore />}
      </div>
    </>
  )
}

export default App
