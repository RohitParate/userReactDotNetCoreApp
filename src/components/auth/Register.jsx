import { Container, TextField, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from '../../Axios/axiosInstance';
import { useSelector } from 'react-redux';

const Register = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEdit){
            try{
                const userUpdateResponse = await axios.put(`/api/user/${id}`, userDetails);
                if(userUpdateResponse.status === 204){
                    navigate("/user-list");
                }
            }catch(error){
                console.log(error.message)
            }
        }else{
            try {
                const userCreateResponse = await axios.post("/auth/register", userDetails);
                if (userCreateResponse.status === 200) {
                    if(sessionStorage.getItem('token')){
                        navigate("/user-list");
                    }else{
                        navigate("/login");
                        // sessionStorage.clear();
                    }
                }
            } catch (err) {
                alert(err.message);
            }            
        }
    };

    const getUserData = async() => {
        try{
            const userData = await axios.get(`/api/user/${id}`);
            if(userData.status === 200){
                setUserDetails(userData.data);
                setIsEdit(true);
            }
        }catch(error){
            console.log(error.message)
        }
    }
    useEffect(() => {
        getUserData();
    },[id])
    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h5" component="h1">
                {isEdit ? <>Update User</>:<>Create User</>}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField

                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={userDetails.name}
                    onChange={(e) => setUserDetails((prev) => ({ ...prev, name: e.target.value }))}
                />
                <TextField

                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={userDetails.email}
                    onChange={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value }))}
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
                    value={userDetails.password}
                    onChange={(e) => setUserDetails((prev) => ({ ...prev, password: e.target.value }))}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"

                >
                    {isEdit ? <>Update</> : <>Create</>}
                </Button>
            </form>
            {/* <Button onClick={() => navigate("/login")}>
                Login
            </Button> */}
        </Container>
    )
}

export default Register