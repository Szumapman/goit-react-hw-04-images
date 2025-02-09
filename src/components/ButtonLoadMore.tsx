import { usePictures } from '../hooks/UsePictures';
import css from './ButtonLoadMore.module.css'

export const ButtonLoadMore = () => {

    const {setPage} = usePictures();

    return (
        <div>
            <button onClick={() => setPage(prevPage => prevPage + 1)} className={css.Button}>Load more</button>
        </div>
    )
}