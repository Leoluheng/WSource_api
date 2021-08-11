// import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

import BetterHeader from './components/Header/BetterHeader';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import PublicHome from "./components/Home/PublicHome";
import PrivateRoute from './utils/PrivateRoute';
import AlertComponent from './components/AlertComponent/AlertComponent';
import AddPost from './components/Post/AddPost';
import ShowPost from './components/Post/ShowPost';
import ManagePost from "./components/Post/ManagePost";
function App() {
    const [title, updateTitle] = useState(null);
    const [errorMessage, updateErrorMessage] = useState(null);
    return (
        <CookiesProvider>
            <Router>
                <div className="App">
                    <BetterHeader title={title}/>
                    <div className="container d-flex align-items-center flex-column">
                        <Switch>
                            <Route path="/register">
                                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                            </Route>
                            <Route path="/login">
                                <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                            </Route>
                            <PrivateRoute path="/home">
                                <Home/>
                            </PrivateRoute>
                            <Route component={AddPost} path="/addPost"></Route>
                            <Route component={AddPost} path="/updatePost/:postId"></Route>
                        </Switch>
                        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
                    </div>
                    <Route path="/" exact={true}>
                        <PublicHome/>
                    </Route>
<<<<<<< HEAD
                    <Route component={ShowPost} path="/ShowPost"></Route>
=======
                    <Route path="/community">
                        <ShowPost/>
                    </Route>
                    <Route path="/official">
                        <ShowPost/>
                    </Route>
                    <Route path="/service">
                        <ShowPost/>
                    </Route>
                    <Route path="/managePost">
                        <ManagePost/>
                    </Route>
>>>>>>> d472985268faf8ca06fbd2c2c90dfb275735390d
                </div>
            </Router>
        </}

export default App;
