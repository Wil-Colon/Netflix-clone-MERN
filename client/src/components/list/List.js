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
            const result = await axios.get(`movies/find/${id}`, {
                headers: {
                    token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjgwMTdmNjgzZTMyMmU4MGIxZmY2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTc3NjQzNywiZXhwIjoxNjU2MjA4NDM3fQ.s6wIbdAzJtTzxuluzx_gOE17h1u_qmlUn4e31i_lKKo`,
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
                {movies.map((movie) => (
                    <ListMovies key={movie._id} movie={movie} list={list} />
                ))}
            </Slider>
        </div>
    );
};

export default ListItem;
