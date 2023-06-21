import { Link, useLocation } from 'react-router-dom';
import './list.css';
import { useState, useEffect, useContext } from 'react';
import { updateList } from '../../context/listContext/apiCalls';
import axios from 'axios';
import { ListContext } from '../../context/listContext/ListContext';

export default function Product() {
    const location = useLocation();
    const list = location.state;
    const [listUpdated, setListUpdated] = useState(list);
    const [isClicked, setIsClicked] = useState(false);
    const [movies, setMovie] = useState([]);
    const { dispatch } = useContext(ListContext);

    const styles = {
        Active: {
            backgroundColor: 'blue',
        },
        Inactive: {
            backgroundColor: 'grey',
            cursor: 'default',
        },
    };

    useEffect(() => {
        const fetchMovie = async (id) => {
            const result = await axios.get(
                `https://netflix-mern.onrender.com/api/movies/find/${id}`,
                {
                    headers: {
                        token:
                            'Bearer ' +
                            JSON.parse(localStorage.getItem('user'))
                                .accessToken,
                    },
                }
            );
            setMovie((prevMovie) => [...prevMovie, result.data]);
        };

        list.content.forEach((id) => {
            fetchMovie(id);
        });
    }, [list.content]);

    const handleChange = (e) => {
        const value = e.target.value;
        setListUpdated({ ...listUpdated, [e.target.name]: value });
    };

    let value;
    let difference;
    let contentList = list.content;

    const handleSelect = (e) => {
        value = Array.from(e.target.selectedOptions, (option) => option.value);
        const toRemove = new Set(value);
        difference = contentList.filter((x) => !toRemove.has(x));

        setListUpdated({ ...listUpdated, content: difference });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateList(list._id, listUpdated, dispatch);
        setIsClicked(true);
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
                <Link to="/newList">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{list?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">
                                {list?._id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">
                                {list.genre}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">type:</span>
                            <span className="productInfoValue">
                                {list.year}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="formLeft">
                        <div className="productFormLeft">
                            <label>List Title</label>
                            <input
                                name="title"
                                type="text"
                                placeholder={list?.title}
                                onChange={handleChange}
                            />
                            <label>Type</label>
                            <select name="type" onChange={handleChange}>
                                <option>Type</option>
                                <option value="movie">Movie</option>
                                <option value="series">Series</option>
                            </select>
                            <label>Genre</label>
                            <input
                                name="genre"
                                type="text"
                                placeholder={list.genre}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="formRight">
                        <div className="addProductItem">
                            <label>Content (Select which to remove)</label>
                            <select
                                multiple
                                name="content"
                                onChange={handleSelect}
                                style={{ height: '280px' }}
                            >
                                {movies.map((movie) =>
                                    movie !== null ? (
                                        <option
                                            key={movie._id}
                                            value={movie._id}
                                        >
                                            {movie.title}
                                        </option>
                                    ) : null
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="productFormRight">
                        <button
                            className="addProductButton"
                            onClick={handleSubmit}
                            disabled={isClicked}
                            style={isClicked ? styles.Inactive : styles.Active}
                        >
                            {!isClicked ? 'Update List' : 'List updated!'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
