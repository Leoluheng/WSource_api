import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {ACCESS_TOKEN_NAME, API_BASE_URL} from '../../constants/apiConstants';
import axios from 'axios'

function Home(props) {
    useEffect(() => {
        axios.get(API_BASE_URL + '/user/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
            .then(function (response) {
                console.log(response)
                if (response.status !== 202) {
                    redirectToLogin()
                }
            })
            .catch(function (error) {
                redirectToLogin()
            });
    })

    function redirectToLogin() {
        if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
            localStorage.removeItem(ACCESS_TOKEN_NAME)
        }
        props.history.push('/login');
    }

    return (
        <div className="mt-2">
            Home page content
        </div>
    )
}

export default withRouter(Home);