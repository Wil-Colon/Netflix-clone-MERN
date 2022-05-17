import { Link, useLocation } from 'react-router-dom';
import './list.css';
import { useState, useContext } from 'react';
import { updateMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase';

export default function Product() {
    const location = useLocation();
    const list = location.state;
    const listId = location.state._id;
    const { dispatch } = useContext(MovieContext);

    const [listUpdated, setListUpdated] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const styles = {
        Active: {
            backgroundColor: 'blue',
        },
        Inactive: {
            backgroundColor: 'grey',
        },
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setListUpdated({ ...listUpdated, [e.target.name]: value });
        console.log(listUpdated);
    };

    const handleUpload = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMovie(listId, listUpdated, dispatch);
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
                        <span className="productName">{list.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{list._id}</span>
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
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input
                            name="title"
                            type="text"
                            placeholder={list.title}
                            onChange={handleChange}
                            required
                        />
                        <label>Type</label>
                        <input
                            name="year"
                            type="text"
                            placeholder={list.type}
                            onChange={handleChange}
                            required
                        />
                        <label>Genre</label>
                        <input
                            name="genre"
                            type="text"
                            placeholder={list.genre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="productFormRight">
                        <button
                            className="addProductButton"
                            onClick={handleSubmit}
                            disabled={isClicked}
                            style={isClicked ? styles.Inactive : styles.Active}
                        >
                            {!isClicked ? 'Update Movie' : 'Movie updated!'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
