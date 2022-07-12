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
    const { dispatch, user } = useContext(AuthContext);

    const handleClick = () => {
        dispatch(logout());
    };

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Netflix-clone Admin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer" title="logout">
                        <ExitToApp onClick={handleClick} />
                    </div>
                    <img src={user.profilePic} alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    );
}
