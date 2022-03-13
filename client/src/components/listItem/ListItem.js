import React, { useState, useEffect, useRef } from 'react';
import './listItem.scss';
import movieTrailer from 'movie-trailer';
import listenForOutsideClicks from '../../utils/listenForOutsideClicks';
import {
    PlayArrow,
    ThumbUpAltOutlined,
    ThumbDownAltOutlined,
    Add,
} from '@material-ui/icons';

const ListItem = ({ movie }) => {
    const menuRef = useRef(null);
    const [delayHandler, setDelayHandler] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [listening, setListening] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const base_url = 'https://image.tmdb.org/t/p/w500';
    const [width, setWidth] = useState(window.innerWidth);
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    useEffect(
        listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
    );

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

    const handleMouseEnter = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        setDelayHandler(
            setTimeout(async () => {
                toggle();
                try {
                    let res = await movieTrailer(
                        movie?.name || movie?.title || movie?.original_name,
                        {
                            id: true,
                        }
                    );
                    if (res === null) {
                        res = await movieTrailer(null, {
                            tmdbId: movie.id,
                            id: true,
                        });
                    }
                    setTrailerUrl(res);
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
            ref={menuRef}
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
            <img
                src={`${base_url}${movie?.backdrop_path || movie?.poster_path}`}
                alt={''}
            />
            {isOpen && (
                <div
                    className="listItemLarge"
                    onMouseLeave={() => handleMouseLeave()}
                    onClick={() => handleMouseLeave()}
                >
                    <img
                        src={`${base_url}${
                            movie?.backdrop_path || movie?.poster_path
                        }`}
                        alt={''}
                    />
                    {trailerUrl ? (
                        <div className="videoContainer">
                            <iframe
                                title="youtube preview"
                                className="youTubeVideo"
                                frameBorder={0}
                                src={`https://www.youtube.com/embed/${trailerUrl}?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=0&autoplay=1&iv_load_policy=0&start=10&fs=0&enablejsapi=1&playsinline=0`}
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
                            <span>
                                {movie?.title ||
                                    movie?.original_title ||
                                    movie?.original_name}
                            </span>
                            <span className="limit">+16</span>
                            <span>
                                {movie?.release_data || movie?.first_air_date}
                            </span>
                        </div>
                        <div className="desc">
                            {truncate(movie?.overview, 90)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListItem;
