import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {ACCESS_TOKEN_NAME, API_BASE_URL} from '../../constants/apiConstants';
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import homepage from "../../assets/images/homepage.svg";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import housing from "../../assets/images/housing.svg";
import currentStudent from "../../assets/images/academic_success_final.png"
import CardContent from "@material-ui/core/CardContent";
import scholarship from "../../assets/images/scholarship.svg";
import ptOpportunity from "../../assets/images/ptOpportunity.svg";
import office from "../../assets/images/office.svg";
import {makeStyles} from "@material-ui/core/styles";

/* for demo purpose - copied directly from PublicHome ========= start */
// TODO: remove / edit
const useStyles = makeStyles((theme) => ({
    publicHome: {
        flexGrow: 1,
        padding: theme.spacing(8, 4, 6),
        // backgroundColor: theme.palette.grey[100],
    },
    main: {
        position: 'relative',
        // backgroundColor: theme.palette.grey[100],
        backgroundColor: '#EDE7D7',
        color: theme.palette.common.black,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(8, 4, 6),
            paddingRight: 0,
        },
        marginBottom: theme.spacing(4),
    },
    mainGrid:{
        [theme.breakpoints.down('xl')]: {
            justifyContent: 'center',
            padding: theme.spacing(8, 4, 6),
            paddingRight: 0,
        },
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
        position: 'relative',
        display: 'block',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        maxHeight: '100%',
    },
    exploreBox: {
        padding: theme.spacing(0,6,4),
        paddingRight: 0,
    },
    explore: {
        // margin: theme.spacing(3, 0, 2),
        background: 'black',
        color: '#FFC100',
        borderRadius: 10,
        height: '50px',
        '&:hover': {
            backgroundColor: 'white',
            color: '#ffbf00',
        },
    },
    topic:{
        position: 'relative',
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.common.black,
        marginBottom: theme.spacing(4),
        // modify if want to align topic card leftmost start to mainBox
        padding: theme.spacing(2, 4, 6),
        paddingRight: 0,
    },
    topicCard: {
        padding: theme.spacing(2, 2, 4),
    },
    topicRoot: {
        minWidth: 264,
        maxWidth: 340,
    },
    topicMedia: {
        height: 140,
        maxHeight: '100%',
        display: 'block',
    },
    bold: {
        fontWeight:600
    }
}));
/* for demo purpose - copied directly from PublicHome ========= end */

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

    /* for demo purpose - copied directly from PublicHome ========= start */
    // TODO: remove / edit
    const classes = useStyles();

    function handleExplore(){
        props.history.push('/official')
    }

    function renderMain(){
        return (
            <Grid container component={Paper} className={classes.main}>
                <Grid container className={classes.mainGrid}>
                    <Grid item md={6}>
                        <div className={classes.title}>
                            <Typography component="h1" variant="h2" color="inherit" gutterBottom className={classes.bold} >
                                One-stop shop for University Resources
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Explore university resources
                                · Read UW service review
                                · Join community
                            </Typography>
                        </div>
                        <div>
                            <Box className={classes.exploreBox}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.explore}
                                    onClick={handleExplore}
                                >
                                    Explore
                                </Button>
                            </Box>
                        </div>
                    </Grid>
                    <Grid item md={6}>
                        <img className={classes.titleImg} src={homepage}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    function renderTopics(){
        //TODO: currently everything hard-coded @Leo
        return (
            <Grid container component={Paper} className={classes.topic} elevation={0}>
                <Grid container xs={12}>
                    <Typography variant="h4" color="inherit" gutterBottom>
                        Explore Trending Topics
                    </Typography>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item lg={3} className={classes.topicCard}>
                        <Card className={classes.topicRoot}>
                            <CardActionArea onClick={() => props.history.push('/official/current_student')}>
                                <CardMedia
                                    className={classes.topicMedia}
                                    image={currentStudent}
                                    title="Current Student"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Current Student
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item lg={3} className={classes.topicCard}>
                        <Card className={classes.topicRoot}>
                            <CardActionArea onClick={() => props.history.push('/official/offices')}>
                                <CardMedia
                                    className={classes.topicMedia}
                                    image={office}
                                    title="Offices"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Offices
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item lg={3} className={classes.topicCard}>
                        <Card className={classes.topicRoot}>
                            <CardActionArea onClick={() => props.history.push('/official/scholarship')}>
                                <CardMedia
                                    className={classes.topicMedia}
                                    image={scholarship}
                                    title="Scholarship"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Scholarship
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item lg={3} className={classes.topicCard}>
                        <Card className={classes.topicRoot}>
                            <CardActionArea onClick={() => props.history.push('/official/part-time_opportunities')}>
                                <CardMedia
                                    className={classes.topicMedia}
                                    image={ptOpportunity}
                                    title="Part-time Opportunities"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Part-time Opportunities
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <main>
            <div className={classes.publicHome}>
                <Grid container justifyContent={"center"}>
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
    /* for demo purpose - copied directly from PublicHome ========= end */

}

export default withRouter(Home);