import React, { useContext } from 'react';
import './topbar.css';
import { logout } from '../../context/authContext/AuthAction';
import { AuthContext } from '../../context/authContext/AuthContext';

import {
    NotificationsNone,
    Language,
    Settings,
    ExitToApp,
} from '@material-ui/icons';

export default function Topbar() {
    const { dispatch } = useContext(AuthContext);

    const handleClick = () => {
        dispatch(logout());
    };

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">lamaadmin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <ExitToApp onClick={handleClick} />
                    </div>
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <img
                        src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="topAvatar"
                    />
                </div>
            </div>
        </div>
    );
}
