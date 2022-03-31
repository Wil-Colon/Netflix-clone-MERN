import './App.scss';
import Featured from '../../components/featured/Featured';
import NavBar from '../../components/navbar/Navbar';
import ListItem from '../../components/listItem/ListItem';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App({ type }) {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `lists${type ? '?type=' + type : ''}${
                        genre ? '&genre=' + genre : ''
                    }`,
                    {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjgwMTdmNjgzZTMyMmU4MGIxZmY2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODY4MzEwMSwiZXhwIjoxNjQ5MTE1MTAxfQ.3VJ0LOAWAVrQ0sebX9c_OI3vK4gzmnqOHYi02QrVbGU',
                        },
                    }
                );
                setIsLoading(false);
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, genre]);

    return (
        <div className="home">
            <NavBar />
            <Featured type={type} />
            {!isLoading &&
                lists.map((list, i) => <ListItem key={i} lists={list} />)}
        </div>
    );
}

export default App;
