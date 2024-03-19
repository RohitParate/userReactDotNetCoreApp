import './App.css';
import LoginPage from './components/auth/Login';
import Register from './components/auth/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserList from './components/user/UserList';
import { Provider } from 'react-redux';
import store from './Redux/app/store';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
