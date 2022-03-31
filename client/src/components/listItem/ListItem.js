import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import settings from '../../utils/sliderSettings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ListMovies from '../listMovies/ListMovies';
import './listItem.scss';

const ListItem = ({ lists }) => {
    const [movies, setMovie] = useState([]);

    useEffect(() => {
        const fetchMovie = async (id) => {
            const result = await axios.get(`movies/find/${id}`, {
                headers: {
                    token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjgwMTdmNjgzZTMyMmU4MGIxZmY2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODY4MzEwMSwiZXhwIjoxNjQ5MTE1MTAxfQ.3VJ0LOAWAVrQ0sebX9c_OI3vK4gzmnqOHYi02QrVbGU`,
                },
            });
            setMovie((prevMovie) => [...prevMovie, result.data]);
        };

        lists.content.forEach((id) => {
            fetchMovie(id);
        });
    }, [lists.content]);

    return (
        <div className="list">
            <span className="listTitle">{lists.title}</span>
            <Slider {...settings}>
                {movies.map((movie, i) => (
                    <ListMovies key={movie._id} movie={movie} />
                ))}
            </Slider>
        </div>
    );
};

export default ListItem;
