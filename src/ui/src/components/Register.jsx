import React, {useState} from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {API_BASE_URL} from '../constants/apiConstants';

function RegistrationForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            const payload = {
                "name": state.name,
                "email": state.email,
                "accessLeve": 1
            }
            axios.post(API_BASE_URL + '/user/register', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("Success");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            //props.showError('Please enter valid username and password')
        }

    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer();
    }
    return (
        <div className=" setup-form container">
            <div className="row">
                <div className="col-md-6">
                    <h1>
                        <b>Welcome,</b>
                    </h1>
                    <h3> USource is website that collects all kinds of resources around and off campus
                    </h3>
                    <br/>
                    <h4>
                        Students use it to find appropriate university resources, such as campus housing,
                        accessibility, student success, athletics, clubs. The website providing update to
                        date Uwaterloo Wiki, tailored recommendation, accurate keyword search, and an online
                        community to ask and share.
                    </h4>
                    <br/>
                </div>
                <div className="col-md-6">
                    <form>
                        <div className="col-sm-12 form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputUserName"
                                   aria-describedby="user"
                                   placeholder="Enter Name"
                                   value={state.name}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="col-sm-12 form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="email"
                                   aria-describedby="emailHelp"
                                   placeholder="Enter email"
                                   value={state.email}
                                   onChange={handleChange}
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                anyone else.</small>
                        </div>
                        <div className="col-sm-12 form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password"
                                   className="form-control"
                                   id="password"
                                   placeholder="Password"
                                   value={state.password}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="col-sm-12 form-group">
                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input type="password"
                                   className="form-control"
                                   id="confirmPassword"
                                   placeholder="Confirm Password"
                                   value={state.confirmPassword}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="col-sm-12 form-group">
                            <button
                                onClick={handleSubmitClick}
                                className="btn btn-default btn-block btn-lg"
                            >
                                Setup My Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(RegistrationForm);