import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useNavigate } from 'react-router-dom';
import './muiMenu.scss';

export default function BasicMenu({ type, logout, user, dispatch }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{
                    fontSize: '10px',
                    color: 'white',
                    fontWeight: 'bold',
                }}
            >
                {type === 'navBar' ? (
                    <div className="browse-menu">
                        Browse <ArrowDropDownIcon />{' '}
                    </div>
                ) : (
                    ''
                )}
                {type === 'settings' && (
                    <div>
                        <img
                            src={
                                user.profilePic === ''
                                    ? 'https://www.pngfind.com/pngs/m/176-1760995_png-file-svg-user-icon-free-copyright-transparent.png'
                                    : user.profilePic
                            }
                            alt=""
                        />
                        <ArrowDropDownIcon />
                    </div>
                )}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {type === 'navBar' ? (
                    <div>
                        <Link to="/series" className="link">
                            <MenuItem selected={true} onClick={handleClose}>
                                Series
                            </MenuItem>
                        </Link>
                        <Link to="/movies" className="link">
                            <MenuItem selected={true} onClick={handleClose}>
                                Movies
                            </MenuItem>
                        </Link>{' '}
                    </div>
                ) : (
                    <div>
                        {user.isAdmin && (
                            <MenuItem selected={true}>
                                <a
                                    className="anchorTag"
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://netflix-clone-mern-admin.vercel.app/"
                                >
                                    <span
                                        className="settings-btn"
                                        style={{ textecoration: 'none' }}
                                    >
                                        Settings
                                    </span>
                                </a>
                            </MenuItem>
                        )}
                        <MenuItem
                            selected={true}
                            onClick={() => {
                                dispatch(logout());
                                navigate('/login');
                            }}
                        >
                            Logout
                        </MenuItem>
                    </div>
                )}
            </Menu>
        </div>
    );
}
