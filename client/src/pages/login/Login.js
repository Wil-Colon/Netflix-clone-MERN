import './login.scss';
import { useState, useContext } from 'react';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const { state } = useLocation();
    const { dispatch, user } = useContext(AuthContext);
    const [isClicked, setIsClicked] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [inputClicked, setInputClicked] = useState({
        email: false,
        password: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = () => {
        setIsClicked(true);
        login(formData, dispatch);
    };

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt=""
                    />
                </div>
            </div>

            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {state && <p className="newUser">{state.msg}</p>}
                    <h1>Sign In</h1>
                    <input
                        {...register('email', { required: true })}
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="Email or Phone number"
                        value={formData.email}
                        onFocus={() => {
                            setInputClicked({
                                email: true,
                                password: false,
                            });
                        }}
                        style={{
                            borderBottom:
                                inputClicked.email && '2px solid #e87c03',
                        }}
                    />
                    {errors.email && (
                        <p style={{ color: '#e87c03' }}>Email is required.</p>
                    )}
                    <input
                        {...register('password', { required: true })}
                        onChange={handleChange}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onFocus={() => {
                            setInputClicked({
                                email: false,
                                password: true,
                            });
                        }}
                        style={{
                            borderBottom:
                                inputClicked.password && '2px solid #e87c03',
                        }}
                    />
                    {errors.password && (
                        <p style={{ color: '#e87c03' }}>
                            Password is required.
                        </p>
                    )}
                    <button type="submit" className="loginButton">
                        Sign In
                    </button>
                    {user === null && isClicked && (
                        <p style={{ color: '#e87c03' }}>
                            Incorrect password or email
                        </p>
                    )}
                    <span>
                        New to Netflix?{' '}
                        <b>
                            <Link to="/register">Sign up now. </Link>
                        </b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure
                        you're not a bot. <b>Learn More</b>.
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Login;
