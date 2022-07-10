import './register.scss';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/authContext/AuthContext';
import { registerUser } from '../../context/authContext/apiCalls';

const Register = () => {
    const { dispatch, error } = useContext(AuthContext);
    const navigate = useNavigate();
    const [onClicked, setOnClicked] = useState({
        click1: false,
        click2: false,
        click3: false,
    });

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit1 = () => {
        setUserInfo(formData);
    };

    const onSubmit2 = () => {
        setUserInfo(formData);
    };

    const registerNewUser = () => {
        registerUser(formData, dispatch);
        navigate('/login', { state: { msg: 'New User Registered!' } });
    };

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt=""
                    />
                    <Link to="/login">
                        <button className="loginButton">Sign In</button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create or restart
                    membership.
                </p>
                {!userInfo.username && !userInfo.email ? (
                    <form className="input" onSubmit={handleSubmit(onSubmit1)}>
                        <input
                            {...register('username', {
                                required: true,
                                minLength: 5,
                                maxLength: 15,
                            })}
                            type="text"
                            placeholder="enter a username"
                            name="username"
                            onChange={handleChange}
                            onClick={() => setOnClicked({ clicked1: true })}
                            value={formData.username}
                        />
                        <button className="registerButton">
                            {onClicked.clicked1 ? 'User Name' : 'Start Here'}
                        </button>
                    </form>
                ) : !userInfo.email ? (
                    <form className="input" onSubmit={handleSubmit(onSubmit2)}>
                        <input
                            {...register('email', {
                                required: true,
                            })}
                            type="email"
                            placeholder="email address"
                            name="email"
                            onChange={handleChange}
                            onClick={() => setOnClicked({ clicked2: true })}
                            value={formData.email}
                        />
                        <button className="registerButton">
                            {onClicked.clicked2 ? 'Email' : 'Get Started'}
                        </button>
                    </form>
                ) : (
                    <form
                        className="input"
                        onSubmit={handleSubmit(registerNewUser)}
                    >
                        <input
                            {...register('password', {
                                required: true,
                                minLength: 5,
                                maxLength: 15,
                            })}
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={handleChange}
                            onClick={() => setOnClicked({ clicked3: true })}
                            value={formData.password}
                        />
                        <button type="submit" className="registerButton">
                            {onClicked.clicked3 ? 'Password' : 'Start'}
                        </button>
                    </form>
                )}
                {errors.username && (
                    <span style={{ color: 'red' }}>
                        {errors.username?.type === 'minLength'
                            ? 'Username must be more then 5 characters'
                            : errors.username?.type === 'maxLength'
                            ? 'Username must be no longer then 15 characters'
                            : 'Please enter a username'}
                    </span>
                )}
                {errors.email && (
                    <span style={{ color: 'red' }}>
                        Please enter a valid Email.
                    </span>
                )}
                {errors.password && (
                    <span style={{ color: 'red' }}>
                        {errors.password?.type === 'minLength'
                            ? 'Password must be at least 5 characters long'
                            : errors.password?.type === 'maxLength'
                            ? 'Password must be no longer then 15 characters'
                            : 'Password Required'}
                    </span>
                )}
                <span style={{ color: 'red' }}>
                    {' '}
                    {error && <p>user already exists</p>}
                </span>
            </div>
        </div>
    );
};

export default Register;
