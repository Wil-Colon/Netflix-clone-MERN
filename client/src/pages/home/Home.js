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
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjgwMTdmNjgzZTMyMmU4MGIxZmY2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTcxNzU5NSwiZXhwIjoxNjUwMTQ5NTk1fQ.5oiLov1_ggbYry_BlteGmcRfRpDMqnpUJ0wv-kA2MAM',
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
                lists.map((list) => <List key={list._id} list={list} />)}
        </div>
    );
}

export default App;
