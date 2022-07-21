import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import settings from '../../utils/sliderSettings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ListMovies from '../listMovies/ListMovies';
import './list.scss';

const ListItem = ({ list }) => {
    const [movies, setMovie] = useState([]);

    useEffect(() => {
        const fetchMovie = async (id) => {
            const result = await axios.get(`/api/movies/find/${id}`, {
                headers: {
                    token:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('user')).accessToken,
                },
            });
            setMovie((prevMovie) => [...prevMovie, result.data]);
        };

        list.content.forEach((id) => {
            fetchMovie(id);
        });
    }, [list.content]);

    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <Slider {...settings}>
                {movies.map((movie) =>
                    movie !== null ? (
                        <ListMovies key={movie._id} movie={movie} list={list} />
                    ) : null
                )}
            </Slider>
        </div>
    );
};

export default ListItem;
