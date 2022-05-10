import { Link, useLocation } from 'react-router-dom';
import './product.css';
import { Publish } from '@material-ui/icons';
import { useState, useContext } from 'react';
import { updateMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase';

export default function Product() {
    const location = useLocation();
    const movie = location.state;
    const { dispatch } = useContext(MovieContext);
    const movieId = location.state._id;
    const [movieUpdated, setMovieUpdated] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const [progress, setProgress] = useState(null);

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
        setMovieUpdated({ ...movieUpdated, [e.target.name]: value });
    };

    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const itemsRef = ref(storage, `items/${fileName}`);
            const uploadTask = uploadBytesResumable(itemsRef, item.file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setMovieUpdated((prev) => {
                            return { ...prev, [item.label]: url };
                        });
                        setUploaded((prev) => prev + 1);
                    });
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: trailer, label: 'trailer' },
            { file: video, label: 'video' },
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMovie(movieId, movieUpdated, dispatch);
        setIsClicked(true);
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={movie.img}
                            alt=""
                            className="productInfoImg"
                        />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">
                                {movie._id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">
                                {movie.genre}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">
                                {movie.year}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit:</span>
                            <span className="productInfoValue">
                                {movie.limit}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input
                            name="title"
                            type="text"
                            placeholder={movie.title}
                            onChange={handleChange}
                            required
                        />
                        <label>Year</label>
                        <input
                            name="year"
                            type="text"
                            placeholder={movie.year}
                            onChange={handleChange}
                            required
                        />
                        <label>Genre</label>
                        <input
                            name="genre"
                            type="text"
                            placeholder={movie.genre}
                            onChange={handleChange}
                            required
                        />
                        <label>Limit</label>
                        <input
                            name="limit"
                            type="text"
                            placeholder={movie.limit}
                            onChange={handleChange}
                            required
                        />
                        <label>Trailer</label>
                        <input
                            name="trailer"
                            type="file"
                            placeholder={movie.trailer}
                            onChange={(e) => setTrailer(e.target.files[0])}
                        />
                        <label>Video</label>
                        <input
                            name="video"
                            type="file"
                            placeholder={movie.video}
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={movie.img}
                                alt=""
                                className="productUploadImg"
                            />
                            <label for="file">
                                <Publish />
                            </label>
                            <input
                                type="file"
                                id="file"
                                style={{ display: 'none' }}
                            />
                        </div>
                        {uploaded === 2 ? (
                            <button
                                className="addProductButton"
                                onClick={handleSubmit}
                                disabled={isClicked}
                                style={
                                    isClicked ? styles.Inactive : styles.Active
                                }
                            >
                                {!isClicked ? 'Update Movie' : 'Movie updated!'}
                            </button>
                        ) : trailer || video ? (
                            <button
                                className="addProductButton"
                                onClick={handleUpload}
                            >
                                {progress === null
                                    ? 'Upload Files'
                                    : Math.floor(progress) + '% done'}
                            </button>
                        ) : (
                            <button
                                className="addProductButton"
                                onClick={handleSubmit}
                                disabled={isClicked}
                                style={
                                    isClicked ? styles.Inactive : styles.Active
                                }
                            >
                                {!isClicked ? 'Update Movie' : 'Movie updated!'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
