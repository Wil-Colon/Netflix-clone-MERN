import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function WidgetSm() {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get('/users?new=true', {
                    headers: {
                        token:
                            'Bearer ' +
                            JSON.parse(localStorage.getItem('user'))
                                .accessToken,
                    },
                });
                setNewUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getNewUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Newly Joined Members</span>
            <ul className="widgetSmList">
                {newUsers.length > 0 ? (
                    newUsers.map((user, i) => (
                        <li key={i} className="widgetSmListItem">
                            <img
                                src={
                                    user.profilePic ||
                                    'https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg'
                                }
                                alt=""
                                className="widgetSmImg"
                            />
                            <div className="widgetSmUser">
                                <span className="widgetSmUsername">
                                    {user.username}
                                </span>
                            </div>
                            <button className="widgetSmButton">
                                <Visibility className="widgetSmIcon" />
                                <Link
                                    to={{
                                        pathname: `/user/${user._id}`,
                                        state: user,
                                    }}
                                >
                                    Display
                                </Link>
                            </button>
                        </li>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </ul>
        </div>
    );
}
