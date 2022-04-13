import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './featured.scss';

export default function Featured({ type }) {
    const [content, setContent] = useState({});

    useEffect(() => {
        console.log(type);
        const getRandomContent = async () => {
            try {
                const res = await axios.get(`movies/random?type=${type}`, {
                    headers: {
                        token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjgwMTdmNjgzZTMyMmU4MGIxZmY2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTcxNzU5NSwiZXhwIjoxNjUwMTQ5NTk1fQ.5oiLov1_ggbYry_BlteGmcRfRpDMqnpUJ0wv-kA2MAM`,
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
                    <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
                    <select name="genre" id="genre">
                        <option>Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
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
                <img src={content.desc} alt="" />
                <span className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae adipisci repellendus eum quasi illo, velit numquam,
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
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
