import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Copyright } from '../Copyright/Copyright';
import welcome from '../../assets/images/welcome.svg';
import { programs } from './programs';

function RegistrationForm(props) {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null,
        nextPage: false,
        year: "",
        faculty: "",
        program: ""
    });
    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const handleDropDownChange = (e) => {
        const name = e.target.name;
        console.log(name);
        setState({
          ...state,
          [name]: e.target.value,
        });
    }
    const handleMultipleSelectionChange = (e, selection) => {
        if (selection !== null) {
            state.faculty = selection.faculty;
            state.program = selection.program;
        }
    }
    const handlePageChange = () => {
        if (state.email.length && state.password.length) {
            setState(prevState => ({
                ...prevState,
                nextPage: !state.nextPage
            }))
        } else {
            props.showError('Please enter valid username and password')
        }
    }
    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "name": state.name,
                "email": state.email,
                "authority": 'ROLE_USER',
                "password": state.password,
                "faculty": state.faculty,
                "program": state.program,
                "year": state.year
            }
            axios.post(API_BASE_URL + '/user/register', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, 'Bearer ' + response.data);
                        redirectToHome();
                        props.showError(null)
                    } else {
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            props.showError('Please enter valid username and password')
        }

    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        console.log(state)
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Passwords do not match');
        }
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
        cancel: {
            margin: theme.spacing(3, 0, 2),
            background: 'white',
            color: '#ffbf00',
            borderRadius: 20,
            height: '50px',
            '&:hover': {
              backgroundColor: 'white',
              color: '#FFC100',
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

    return(
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
                <Link href="https://storyset.com/people" variant="body2" color="textSecondary">People illustrations by Storyset</Link>
            </Grid>
            <Grid item xs={12} sm={6} component={Paper} elevation={6} spacing={10}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    {!state.nextPage && 
                        <div>
                            <Typography component="h1" variant="h5" align ="center">
                                Sign Up
                            </Typography>
                            <form className={classes.form} >
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
                                    value={state.name}
                                    onChange={handleChange}
                                />
                                <div className="form-group text-left">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={state.email}
                                        onChange={handleChange}
                                        aria-describedby="emailHelp"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
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
                                <TextField
                                    variant="outlined"
                                    required
                                    margin="normal"
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    value={state.confirmPassword}
                                    onChange={handleChange} 
                                />
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration via email."
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    onClick={handlePageChange}
                                    >
                                    Continue
                                </Button>
                            </form>
                        </div>
                    }
                    {state.nextPage && 
                        <div>
                            <Typography component="h1" variant="h5" align="center">
                                Complete Your Profile
                            </Typography>
                            <form className={classes.form} >
                                <FormControl>
                                    <InputLabel htmlFor="year-native-helper">Year</InputLabel>
                                        <NativeSelect
                                            value={state.year}
                                            onChange={handleDropDownChange}
                                            inputProps={{
                                                name: 'year',
                                                id: 'year-native-helper',
                                            }}
                                            >
                                            <option aria-label="None" value="" />
                                            <optgroup label="Undergraduate">
                                                <option value="incoming_ug">Incoming Undergrad</option>
                                                <option value="1A">1A</option>
                                                <option value="1B">1B</option>
                                                <option value="2A">2A</option>
                                                <option value="2B">2B</option>
                                                <option value="3A">3A</option>
                                                <option value="3B">3B</option>
                                                <option value="4A">4A</option>
                                                <option value="4B">4B</option>
                                                <option value="5A">5A</option>
                                                <option value="5B">5B</option>
                                            </optgroup>
                                            <optgroup label="Graduate">
                                                <option value="incoming_g">Incoming Grad</option>
                                                <option value="G">Graduate</option>
                                            </optgroup>
                                        </NativeSelect>
                                    <FormHelperText>Please select your current year of study</FormHelperText>
                                </FormControl>
                                <Autocomplete
                                    id="faculty-program"
                                    options={programs}
                                    groupBy={(option) => option.faculty}
                                    getOptionLabel={(option) => option.program}
                                    onChange={handleMultipleSelectionChange}
                                    renderInput={(params) => <TextField {...params} label="Program" />}
                                />
                                <Grid container spacing={10}>
                                    <Grid item xs={6}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            className={classes.cancel}
                                            onClick={handlePageChange}
                                            xs={6}
                                            >
                                            Previous
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            className={classes.submit}
                                            onClick={handleSubmitClick}
                                            xs={6}
                                        >
                                            Sign Up
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    }
                    <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                        {state.successMessage}
                    </div>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" className={classes.link} onClick={() => redirectToLogin()}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Grid>
    )
}

export default withRouter(RegistrationForm);