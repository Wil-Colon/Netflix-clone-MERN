import { ArrowBackOutlined } from '@material-ui/icons';
import { useLocation, Link } from 'react-router-dom';
import './watch.scss';

export default function Watch() {
    const location = useLocation();

    const movie = location.state.video;

    console.log(movie);
    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video
                title="movie"
                className="video"
                autoPlay
                progress
                controls
                src={movie}
                type="video/mp4"
            />
        </div>
    );
}
