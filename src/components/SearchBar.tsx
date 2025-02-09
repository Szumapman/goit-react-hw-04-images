import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';
import { usePictures } from "../hooks/UsePictures";
import { useState } from 'react';


export const SearchBar = () => {
    const { setQuery } = usePictures();
    const [userQuery, setUserQuery] = useState('');

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserQuery(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (userQuery.trim() === "") { 
            toast.error('Please enter a search query', { duration: 2000 });
            return;
        }  
        setQuery(userQuery);
        setUserQuery('');
        form.reset();
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleQuery}
                    />
                </form>
            </header>
        </>
    );
} 