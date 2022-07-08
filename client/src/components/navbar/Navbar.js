import { Notifications, Search } from '@material-ui/icons';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthAction';
import './navbar.scss';

import BasicMenu from '../muiMenu/muiMenu';

const Navbar = () => {
    const { dispatch, user } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= 768;

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="container">
                <div className="left">
                    <Link to="/" className="link">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                            alt=""
                        />
                    </Link>
                    {isMobile ? (
                        <BasicMenu type={'navBar'} />
                    ) : (
                        <>
                            <Link to="/" className="link">
                                <span>Homepage</span>
                            </Link>
                            <Link to="/series" className="link">
                                <span>Series</span>
                            </Link>
                            <Link to="/movies" className="link">
                                <span>Movies</span>
                            </Link>
                            <span className="link">New and Popular</span>
                            <span className="link">My List</span>
                        </>
                    )}
                </div>
                <div className="right">
                    <Search className="icon" />
                    <span>{user.username}</span>
                    <Notifications className="icon" />
                    <div className="profile">
                        <BasicMenu
                            type={'settings'}
                            logout={logout}
                            user={user}
                            dispatch={dispatch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
