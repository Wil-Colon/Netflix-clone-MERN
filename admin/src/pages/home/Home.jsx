import Chart from '../../components/chart/Chart';
import './home.css';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export default function Home() {
    const MONTHS = useMemo(
        () => [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        []
    );

    const [userStats, setUserStats] = useState([]);
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setUserToken(JSON.parse(localStorage.getItem('user')).accessToken);
            const getStats = async () => {
                try {
                    const res = await axios.get(
                        'https://netflix-mern-client.herokuapp.com/api/users/stats',
                        {
                            headers: {
                                token: 'Bearer ' + userToken,
                            },
                        }
                    );
                    const statsList = res.data.sort(function (a, b) {
                        return a._id - b._id;
                    });

                    statsList.map((item) =>
                        setUserStats((prev) => [
                            ...prev,
                            {
                                name: MONTHS[item._id - 1],
                                'New User': item.total,
                            },
                        ])
                    );
                    setLoading(false);
                } catch (err) {
                    console.log(err);
                }
            };
            getStats();
        }, 0.5);
    }, [MONTHS, userToken]);

    if (loading) {
        return <h1>Loading</h1>;
    } else {
        return (
            <div className="home">
                <Chart
                    data={userStats}
                    title="User Analytics"
                    grid
                    dataKey="New User"
                />
                <div className="homeWidgets">
                    <WidgetSm />
                </div>
            </div>
        );
    }
}
