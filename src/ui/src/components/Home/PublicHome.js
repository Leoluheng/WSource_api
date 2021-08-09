import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import homepage from '../../assets/images/homepage.svg';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    publicHome: {
        flexGrow: 1,
        padding: theme.spacing(8, 4, 6),
    },
    main: {
        position: 'relative',
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.common.black,
        marginBottom: theme.spacing(4),
    },
    title: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    titleImg: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    explore: {
        margin: theme.spacing(3, 0, 2),
        background: '#FFC100',
        borderRadius: 20,
        height: '50px',
        '&:hover': {
            backgroundColor: 'white',
            color: '#ffbf00',
        },
    },
}));


function PublicHome(props) {
    const classes = useStyles();

    function handleExplore(){
        props.history.push('/official')
    }

    function renderMain(){
        return (
            <Paper className={classes.main}>
                <Grid container>
                    <Grid item md={6}>
                        <div className={classes.title}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                One-stop shop for University Resources
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                · Explore university resources
                                · Read UW service review
                                · Join community
                            </Typography>
                        </div>
                        <Box textAlign='center'>
                            <Button
                                type="submit"
                                variant="contained"
                                className={classes.explore}
                                onClick={handleExplore}
                            >

                                Explore
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <img className={classes.titleImg} src={homepage}/>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    function renderTopics(){

    }

    return (
        <main>
            <div className={classes.publicHome}>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        {renderMain()}
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        {renderTopics()}
                    </Grid>
                </Grid>
            </div>
        </main>
    )
}

export default withRouter(PublicHome);