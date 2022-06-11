import './user.css';
import {
    CalendarToday,
    MailOutline,
    PermIdentity,
    Publish,
    Person,
} from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { updateUser } from '../../context/userContext/apiCalls';
import { UserContext } from '../../context/userContext/UserContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase';
import { CircularProgress } from '@material-ui/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function User() {
    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" {...props} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                    >
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }
    const styles = {
        Active: {
            backgroundColor: 'blue',
        },
        Inactive: {
            cursor: 'default',
            backgroundColor: 'grey',
        },
    };

    const [formData, setFormData] = useState(null);
    const [isClicked, setIsclicked] = useState(false);
    const [isClicked2, setIsclicked2] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const { dispatch } = useContext(UserContext);
    const location = useLocation();
    const { _id, createdAt, email, profilePic, username, isAdmin } =
        location.state;
    const date = createdAt;
    const [newDate] = date.split('T');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpload = (e) => {
        e.preventDefault(e);
        const fileName = new Date().getTime() + selectedFile.name;
        const itemsRef = ref(storage, `users/${fileName}`);
        const uploadTask = uploadBytesResumable(itemsRef, selectedFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.floor(progress));
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setFormData({ ...formData, profilePic: url });
                });
            }
        );
        setIsclicked2(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault(e);
        updateUser(_id, formData, dispatch);
        setIsclicked(true);
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
                                    {selectedFile ? (
                                        <button
                                            className="userUpdateButton"
                                            onClick={(e) => handleUpload(e)}
                                            style={
                                                isClicked2
                                                    ? styles.Inactive
                                                    : styles.Active
                                            }
                                        >
                                            {!isClicked2 ? (
                                                `Click to Upload`
                                            ) : (
                                                <CircularProgressWithLabel
                                                    value={progress}
                                                />
                                            )}
                                        </button>
                                    ) : (
                                        <Publish className="userUpdateIcon" />
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    name="profilePic"
                                    onChange={(e) => {
                                        setSelectedFile(e.target.files[0]);
                                    }}
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
