import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthAction';
import './navbar.scss';

const Navbar = () => {
    const { dispatch, user } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="container">
                <div className="left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span>Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span>Movies</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <span>{user.username}</span>
                    <Notifications className="icon" />
                    <img src={user.profilePic} alt="" />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            {user.isAdmin && (
                                <a
                                    className="anchorTag"
                                    target="_blank"
                                    rel="noreferrer"
                                    href="http://localhost:4000"
                                >
                                    <span>Settings</span>
                                </a>
                            )}
                            <span
                                onClick={() => {
                                    dispatch(logout());
                                    navigate('/login');
                                }}
                            >
                                Logout
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
