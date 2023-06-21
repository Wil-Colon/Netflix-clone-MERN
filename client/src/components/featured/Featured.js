import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './featured.scss';
import { Link } from 'react-router-dom';

export default function Featured({ type, setGenre }) {
    const [content, setContent] = useState({});
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    if (type === 'series') {
        type = 'Series';
    }
    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/movies/random?type=${type}`, {
                    headers: {
                        token:
                            'Bearer ' +
                            JSON.parse(localStorage.getItem('user'))
                                .accessToken,
                    },
                });
                setContent(...res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomContent();
    }, [type]);

    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
                    <select
                        name="genre"
                        id="genre"
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <option value="">Genre</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="History">Historical</option>
                        <option value="crime">Crime</option>
                        <option value="mystery">Mystery</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img src={content.img} alt="" />
            <div className="info">
                <h1 className="banner_title">{content.title}</h1>
                <span className="desc">{truncate(content.desc, 100)}</span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <Link to="/watch" state={content}>
                            <span className="playButton">Play</span>{' '}
                        </Link>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
            <div className="banner_fade_bottom" />
        </div>
    );
}
