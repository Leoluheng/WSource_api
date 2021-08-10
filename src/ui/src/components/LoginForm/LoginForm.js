import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {ACCESS_TOKEN_NAME, API_BASE_URL} from '../../constants/apiConstants';
import {withRouter} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Copyright } from '../Copyright/Copyright';
import welcome from '../../assets/images/welcome.svg';

function LoginForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.email.length && state.password.length) {
            const email = state.email
            const password = state.password
            axios.post(API_BASE_URL + '/user/login', null, {params: {email, password}})
                .then(function (response) {
                    console.log(response)
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Login successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, 'Bearer ' + response.data);
                        redirectToHome();
                        props.showError(null)
                    } else if (response.code === 204) {
                        props.showError("Username and password do not match");
                    } else {
                        props.showError("Username does not exists");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            props.showError('Please enter username and password before sign in')
        }
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(10),
            flexGrow: 1,
        },
        paper: {
            margin: theme.spacing(5, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '35px',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: '#ffbf00',
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(2),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
          background: '#FFC100',
          color: 'white',
          borderRadius: 20,
          height: '50px',
          '&:hover': {
            backgroundColor: 'white',
            color: '#ffbf00',
            },
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        link: {
            color: "#AA8B2F",
            "&:hover": {
                color: "#E1B739",
                textDecoration: "underline #ffbf00"
            }
        }
    }))

    const classes = useStyles();

    return (
        <Grid 
            container 
            direction="row"
            justifyContent="space-around"
            alignItems="center" 
            className={classes.root}
            spacing={10}
        >
            <Grid item xs={12} sm={6} spacing={10}>
                <h1>Welcome to WSource</h1>
                <p>Log in to get your special recommendations!</p>
                <img className={classes.img} src={welcome}/>
                <Link href="https://storyset.com/people" className={classes.link} variant="body2">People illustrations by Storyset</Link>
            </Grid>
            <Grid item xs={12} sm={6} component={Paper} elevation={6} spacing={10}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form className={classes.form}>
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
                            value={state.email}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            required
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={state.password}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmitClick}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" className={classes.link}>
                                    Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" className={classes.link} onClick={() => redirectToRegister()} >
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                                {state.successMessage}
                            </div>
                    </form>
                </div>
            </Grid>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Grid>
    )
}

export default withRouter(LoginForm);
