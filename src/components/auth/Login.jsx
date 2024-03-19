import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { clearError, userLogin } from '../../Redux/features/user/userSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [loginCredentials, setLoginCredentials] = useState({
        userName: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(userLogin(loginCredentials));
        // navigate("/user-list");
    };

    if(user.currentUser.name){
        // sessionStorage.setItem('token', user.token)
        navigate("/user-list");
    }
    if(user.error.message?.length){
        dispatch(clearError());
        alert("login failed");
        // setLoginCredentials({
        //     userName: "",
        //     password: ""
        // })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h5" component="h1">
                Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField

                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="userName"
                    autoComplete="User name"
                    autoFocus
                    value={loginCredentials.email}
                    onChange={(e) => setLoginCredentials((prev) => ({ ...prev, userName: e.target.value }))}
                />
                <TextField

                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials((prev) => ({ ...prev, password: e.target.value }))}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"

                >
                    Sign In
                </Button>
                <Button onClick={() => {
                    navigate("/register")
                }}>
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default LoginPage;
