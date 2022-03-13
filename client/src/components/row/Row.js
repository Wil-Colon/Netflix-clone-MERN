import React, { useState, useEffect } from 'react';
import { getMovies } from '../../requests/requests';
import './row.scss';
import ListItem from '../listItem/ListItem';
import Slider from 'react-slick';
import settings from '../../utils/sliderSettings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Row = ({ title, fetchUrl }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const res = await getMovies(fetchUrl);
            setMovies(res.data.results);
            setIsLoading(false);
        }
        fetchData(fetchUrl);
    }, [fetchUrl]);

    return (
        <div className="list">
            <span className="listTitle">{title}</span>
            <Slider {...settings}>
                {!isLoading &&
                    movies.map((movie, i) => (
                        <ListItem key={movie.id} movie={movie} index={i} />
                    ))}
            </Slider>
        </div>
    );
};

export default Row;
