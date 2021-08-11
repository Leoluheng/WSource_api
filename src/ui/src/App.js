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
    const [errorMessage, updateErrorMessage] = useState(null);
    return (
        <CookiesProvider>
            <Router>
                <div className="App">
                    <BetterHeader />
                    <div className="container d-flex align-items-center flex-column">
                        <Switch>
                            <Route path="/register">
                                <RegistrationForm showError={updateErrorMessage}/>
                            </Route>
                            <Route path="/login">
                                <LoginForm showError={updateErrorMessage}/>
                            </Route>
                            <PrivateRoute path="/home">
                                <Home/>
                            </PrivateRoute>
                            <Route path="/addPost/:resourceType">
                                <AddPost showError={updateErrorMessage}/>
                            </Route>
                            <Route path="/updatePost/:postId">
                                <AddPost showError={updateErrorMessage}/>
                            </Route>
                        </Switch>
                        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
                    </div>
                    <Route path="/" exact={true}>
                        <PublicHome />
                    </Route>
                    <Route path="/Community">
                        <ShowPost resourceType={"Community"} showError={updateErrorMessage}/>
                    </Route>
                    <Route path="/Official">
                        <ShowPost resourceType={"Official"} showError={updateErrorMessage}/>
                    </Route>
                    <Route path="/Service">
                        <ShowPost resourceType={"Service"} showError={updateErrorMessage}/>
                    </Route>
                    <Route path="/managePost" >
                        <ManagePost showError={updateErrorMessage}/>
                    </Route>
                </div>
            </Router>
        </CookiesProvider>
    );
}

export default App;
