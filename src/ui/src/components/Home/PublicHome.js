import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';

function Home(props) {
    function redirectToLogin() {
        props.history.push('/login');
    }

    return (
        <div className="mt-2">
            Home page content
        </div>
    )
}

export default withRouter(Home);