import './App.scss';
import Featured from '../../components/featured/Featured';
import NavBar from '../../components/navbar/Navbar';
import List from '../../components/list/List';
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
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjgwMTdmNjgzZTMyMmU4MGIxZmY2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTc3NjQzNywiZXhwIjoxNjU2MjA4NDM3fQ.s6wIbdAzJtTzxuluzx_gOE17h1u_qmlUn4e31i_lKKo',
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
            <Featured type={type} setGenre={setGenre} />
            {!isLoading &&
                lists.map((list) => <List key={list._id} list={list} />)}
        </div>
    );
}

export default App;
