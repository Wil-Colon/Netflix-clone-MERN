import {
    CalendarToday,
    MailOutline,
    PermIdentity,
    Publish,
    Person,
} from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import './user.css';
import { useState, useContext } from 'react';
import { updateUser } from '../../context/userContext/apiCalls';
import { UserContext } from '../../context/userContext/UserContext';

export default function User() {
    const location = useLocation();
    const { _id, createdAt, email, profilePic, username, isAdmin } =
        location.state;
    const { dispatch } = useContext(UserContext);

    const date = createdAt;
    const [newDate] = date.split('T');

    const [formData, setFormData] = useState(null);
    const [isClicked, setIsclicked] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(e);
        updateUser(_id, formData, dispatch);
        setIsclicked(true);
    };

    const styles = {
        Active: {
            backgroundColor: 'blue',
        },
        Inactive: {
            backgroundColor: 'grey',
            cursor: 'default',
        },
    };

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={profilePic} alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{username}</span>
                            <span className="userShowUserTitle">
                                {isAdmin ? 'Admin' : 'User'}
                            </span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {username}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{newDate}</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <Person className="userShowIcon" />
                            <span className="userShowInfoTitle">{_id}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{email}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder={username}
                                    className="userUpdateInput"
                                    onChange={(e) => handleChange(e)}
                                    name="username"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder={email}
                                    className="userUpdateInput"
                                    onChange={(e) => handleChange(e)}
                                    name="email"
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={profilePic}
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <button
                                style={
                                    isClicked ? styles.Inactive : styles.Active
                                }
                                className="userUpdateButton"
                                onClick={(e) => handleSubmit(e)}
                                disabled={isClicked}
                            >
                                {!isClicked ? 'Update User' : 'User Updated!'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
