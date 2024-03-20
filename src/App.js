import './App.css';
import LoginPage from './components/auth/Login';
import Register from './components/auth/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserList from './components/user/UserList';
import { Provider, useDispatch } from 'react-redux';
import store from './Redux/app/store';
import { useEffect } from 'react';
import axios from "./Axios/axiosInstance";
import { setUser } from './Redux/features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    if(sessionStorage.getItem('token')){
      try{
        const user = await axios.get("/api/user/session");
        if(user.data.result.statusCode === 200){
          dispatch(setUser(user.data.result.value));
        }
      }catch(error){
        
      }
    }
  }
  useEffect(() => {
    getCurrentUser();
  },[])
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={<LoginPage />}
            >
            </Route>
            <Route
              path="/login"
              element={<LoginPage />}
            >
            </Route>
            <Route
              path="/register"
              element={<Register />}
            >
            </Route>
            <Route
              path="/user-list"
              element={<UserList />}
            >
            </Route>
            <Route
              path="/edit-user/:id"
              element={<Register />}
            ></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
