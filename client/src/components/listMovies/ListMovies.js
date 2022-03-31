import React, { useState } from 'react';
import './listMovies.scss';
import {
    PlayArrow,
    ThumbUpAltOutlined,
    ThumbDownAltOutlined,
    Add,
} from '@material-ui/icons';

const ListItem = ({ movie }) => {
    const [delayHandler, setDelayHandler] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    const handleMouseEnter = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        setDelayHandler(
            setTimeout(async () => {
                toggle();
                try {
                    setTrailerUrl(movie.trailer);
                } catch (err) {
                    console.error(err);
                }
            }, 700)
        );
    };

    const handleMouseLeave = () => {
        clearTimeout(delayHandler);
        setIsOpen(false);
        setTrailerUrl(null);
    };

    return (
        <div
            className={'listItem'}
            onMouseEnter={() => {
                handleMouseEnter(movie);
            }}
            onMouseLeave={() => {
                handleMouseLeave();
            }}
            onClick={() => {
                handleMouseEnter(movie);
            }}
            onMouseDown={() => {
                handleMouseLeave();
            }}
        >
            <img src={movie.img} alt={''} />
            {isOpen && (
                <div
                    className="listItemLarge"
                    onMouseLeave={() => handleMouseLeave()}
                    onClick={() => handleMouseLeave()}
                >
                    <img src={movie.img} alt={''} />
                    {trailerUrl ? (
                        <div className="videoContainer">
                            <iframe
                                title="youtube preview"
                                className="youTubeVideo"
                                frameBorder={0}
                                src={trailerUrl}
                            />
                        </div>
                    ) : (
                        <h3>no preview</h3>
                    )}
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon" />
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownAltOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span> {movie.title} </span>
                            <span className="limit">{movie.limit}</span>
                        </div>
                        <div className="desc">{truncate(movie.desc, 90)}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListItem;
