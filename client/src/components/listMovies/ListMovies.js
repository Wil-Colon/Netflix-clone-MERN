import React, { useState, useEffect } from 'react';
import './listMovies.scss';
import { Link } from 'react-router-dom';
import {
    PlayArrow,
    ThumbUpAltOutlined,
    ThumbDownAltOutlined,
    Add,
} from '@material-ui/icons';

const ListItem = ({ movie, list }) => {
    const [delayHandler, setDelayHandler] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= 768;

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    const handleMouseEnter = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        if (isOpen) {
            handleMouseLeave();
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
            onMouseDown={() => {
                isMobile && handleMouseEnter(movie);
            }}
            onMouseLeave={() => {
                handleMouseLeave();
            }}
        >
            <img src={movie.img} alt={''} />
            {isOpen && (
                <div
                    className="listItemLarge"
                    onMouseLeave={() => handleMouseLeave()}
                    onClick={() => isMobile && handleMouseLeave()}
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
                            <Link to={'/watch'} state={movie}>
                                <PlayArrow className="icon" />
                            </Link>
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownAltOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span> {movie.title} </span>
                            <span className="limit">{movie.limit}</span>
                        </div>
                        <div className="desc">{truncate(movie.desc, 90)}</div>
                        <div className="genre">{list.genre}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListItem;
