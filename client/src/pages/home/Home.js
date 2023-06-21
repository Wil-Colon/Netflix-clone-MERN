import './home.scss';
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
                    `/api/lists${type ? '?type=' + type : ''}${
                        genre ? '&genre=' + genre : ''
                    }`,
                    {
                        headers: {
                            token:
                                'Bearer ' +
                                JSON.parse(localStorage.getItem('user'))
                                    .accessToken,
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
            {!isLoading && lists.length > 0 ? (
                lists?.map((list) => <List key={list._id} list={list} />)
            ) : (
                <p>loading...</p>
            )}
        </div>
    );
}

export default App;
