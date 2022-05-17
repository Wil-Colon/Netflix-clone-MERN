import './newList.css';
import { useContext, useEffect, useState } from 'react';
import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createMovie, getMovies } from '../../context/movieContext/apiCalls';
import { ListContext } from '../../context/listContext/ListContext';
import { MovieContext } from '../../context/movieContext/MovieContext';

export default function NewList() {
    const [list, setList] = useState(null);
    const { dispatch } = useContext(ListContext);
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatchMovie);
    }, [dispatchMovie]);

    const handleChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });
    };

    const handleSelect = (e) => {
        let value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );

        setList({ ...list, [e.target.name]: value });

        console.log(list);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Movie</h1>
            <form className="addProductForm">
                <div className="formLeft">
                    <div className="addProductItem">
                        <label>Title</label>
                        <input
                            type="text"
                            id="file"
                            placeholder="John Wick"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Genre</label>
                        <input
                            type="text"
                            id="file"
                            placeholder="Genre"
                            name="genre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Type</label>
                        <select name="type" onChange={handleChange}>
                            <option>Type</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                        </select>
                    </div>
                </div>
                <div className="formRight">
                    <div className="addProductItem">
                        <label>Content</label>
                        <select
                            multiple
                            name="content"
                            onChange={handleSelect}
                            style={{ height: '280px' }}
                        >
                            {movies.map((movie) => (
                                <option key={movie._id} value={movie._id}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="addProductButton" onClick={handleSubmit}>
                    Create
                </button>
            </form>
        </div>
    );
}
