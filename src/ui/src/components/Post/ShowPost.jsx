import React from 'react';
import axios from 'axios';

import {API_BASE_URL} from '../../constants/apiConstants';

import moment from 'moment';
import parse from 'html-react-parser';
import Pluralize from 'pluralize';

import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Comments from "../Comments/Comments";
import Vote from "../Vote/Vote";
import {withRouter} from "react-router-dom";
import {resourceMap} from "../../utils/resourceMap";
import PostTitle from "./PostTitle";
import NameTag from "../Utils/NameTag";

const styles = (theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop:theme.spacing(4),
        [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        flex: 1
    },
    contentLayout: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    emptyContentLayout: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        minHeight: '80vh'
    },
    avatar: {
        backgroundColor: red[500],
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    root: {
        padding: theme.spacing(3, 3, 0, 3),
    },
    title: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    post: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
    },
    bold: {
        padding: theme.spacing(2),
        fontWeight: 500
    },
    content: {
        paddingLeft: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(1, 0, 3, 3),
        background: '#FFC100',
        color: 'white',
        borderRadius: 20,
        height: '40px',
        '&:hover': {
          backgroundColor: 'white',
          color: '#ffbf00',
          },
      },
      searchBox: {
          borderRadius: '20px'
      }
})

const generateNameTag = (user) => {
    if(user){
        return `${user.name}  ${user.faculty}-${user.program}-${user.year}`
    }else{
        return `Admin`
    }
}


class ShowPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            curPost: null,
            searchQuery: "",
            activeTabIndex: 0,
            resourceType: props.resourceType
        };
        this.searchOnChange = this.searchOnChange.bind(this);
        this.getAllPost = this.getAllPost.bind(this);
        this.redirectToAddPost = this.redirectToAddPost.bind(this);
        this.updateCurrentPost = this.updateCurrentPost.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.updateViewCount = this.updateViewCount.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
       this.getAllPost()
    }

    getAllPost(){
        var self = this;
        axios.get(API_BASE_URL + '/resource/all', {})
            .then(function (response) {
                self.setState({posts: response.data})
            })
            .catch(function (error) {
                console.log('error is ', error);
            });
    }

    search() {
        if(this.state.searchQuery !== ""){
            axios.get(API_BASE_URL + '/search/resource', {
                params: {
                    word: this.state.searchQuery
                }
            })
                .then(function (response) {
                    this.setState({posts: response.data}, ()=>{
                        console.log("Calledd!!!")
                    })
                })
                .catch(function (error) {
                    console.log('error is ', error);
                });
        }
    }

    searchOnChange(event, value){
        console.log(value)
        var self = this;
        this.setState({searchQuery: value})
        if(value !== ""){
            axios.get(API_BASE_URL + '/search/resource', {
                params: {
                    word: value
                }
            })
                .then(function (response) {
                    self.setState({posts: response.data}, ()=>{
                        console.log("Calledd!!!")
                    })
                })
                .catch(function (error) {
                    console.log('error is ', error);
                });
        }
        // else{
        //     this.getAllPost()
        // }
    }

    redirectToAddPost(){
        this.props.history.push(`/AddPost/${this.state.resourceType}`)
    }

    updateCurrentPost(curPost){
        this.setState({curPost: curPost })
        this.updateViewCount(curPost.id)
    }

    updateViewCount(resourceId){
        const config = {
            params:{
                id: resourceId
            }
        };
        axios.get(API_BASE_URL + '/resource/updateViewCount', config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Success");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChangeTab(event, value){
        this.setState({ activeTabIndex: value });
    }

    
    renderPostList(){
        const { activeTabIndex } = this.state;
        var self = this
        return (
            <Grid container component={Paper} elevation={3} >
                <Grid container xs={12} className={self.props.classes.root}>
                    <Grid item xs={9} sm={9} md={9}>
                        <Autocomplete
                            options={self.state.posts}
                            className={self.props.classes.searchBox}
                            freeSolo
                            selectOnFocus
                            inputValue={self.state.searchQuery}
                            onInputChange={this.searchOnChange}
                            getOptionLabel={(option)=> option.title}
                            renderInput={(params) => (
                                <TextField {...params} label="Search Posts..." variant="outlined" />
                                )}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={self.props.classes.submit}
                            onClick={this.search}
                        >
                            Search
                        </Button>
                    </Grid>
                    <Grid container xs={12} className={self.props.classes.title}>
                        <Typography gutterBottom variant="h5" component="h5">
                            {resourceMap[this.state.resourceType]}
                        </Typography>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={10}>
                            <Tabs value={activeTabIndex} onChange={this.handleChangeTab} variant="fullWidth" centered>
                                <Tab label="Recent" />
                                <Tab label="Trending" />
                            </Tabs>
                        </Grid>
                        <Grid item xs={2}>
                            <button type="button" onClick={this.redirectToAddPost} id="addPost" name="Create Post"
                                className="btn btn-primary pull-right">New
                            </button>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid container component={Paper} elevation={0} style={{minHeight: 800, maxHeight: 800, overflow: 'auto'}} > 
                    
                        
                    { this.state.posts.length?
                        (
                            <Grid container xs={12} className={this.props.classes.list}>
                                { 
                                    this.state.searchQuery && this.state.searchQuery !== "" && 
                                    (<Typography variant="subtitle1" component="subtitle1" color='textSecondary' className={this.props.classes.content}>
                                            Search result for "{this.state.searchQuery}"
                                        </Typography>)
                                }
                                {
                                    this.state.posts.map((post, index) => {
                                        return <PostTitle value={post} onClick={self.updateCurrentPost} classes={this.props.classes}/>
                                    })
                                }
                            </Grid>
                        ):
                        (
                            <Grid container component={Paper} elevation={0} className={self.props.classes.title} alignItems="flex-start" justify="center">
                                <Typography  variant="subtitle1" component="subtitle1" color='textSecondary'>
                                    No Result Found
                                </Typography>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>  
        )
    }

    renderContent(){
        if (this.state.posts.length === 0){
            // Empty content
            return (
                <Grid 
                    container 
                    component={Paper} 
                    elevation={3} 
                    className={this.props.classes.root} 
                    alignItems="center"
                    justify="center"
                    style={{minHeight: 1055, overflow: 'auto'}}>
                    <Typography  variant="subtitle1" component="subtitle1" align="center" color='textSecondary'>
                        No Post Selected
                    </Typography>
                </Grid>
            )
        }else {
            if(!this.state.curPost){
                this.state.curPost = this.state.posts[0]
            }
            const curPost = this.state.curPost
            const date = Date(curPost.createdAt)
            console.log(curPost)
            return (
                    <Grid container xs component={Paper} elevation={3} style={{minHeight: 1050, maxHeight: 1050, overflow: 'auto'}} className={this.props.classes.post}>
                        <Grid container xs={12}>
                            <Grid item xs={9} sm={9} md={9}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={this.props.classes.avatar}>
                                            R
                                        </Avatar>
                                    }
                                    title={
                                        <NameTag user={curPost.user}/>
                                    }
                                    subheader={moment(date).format('MMMM Do YYYY') + " - " + Pluralize("view", curPost.viewCount, true)}
                                />
                            </Grid>
                            <Grid item xs={3} sm={3} md={3}>
                                <Vote vote={curPost.voteCount} postId={curPost.id} />
                            </Grid>
                        </Grid>
                        
                        <Grid container xs={12} >
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="h5" component="h5" className={this.props.classes.bold}>
                                    {curPost.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={this.props.classes.content}>
                                {curPost.contentType && curPost.contentType === "html"
                                    ? <p className="list-group-item-text">{parse(curPost.content)}</p>
                                    : <p className="list-group-item-text">{curPost.content}</p>
                                }
                            </Grid>
                            <Grid item xs={12} className={this.props.classes.title}>
                                <Comments postId={curPost.id}/>
                            </Grid>
                        </Grid>
                    </Grid>
            )
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container spacing={2} className={classes.layout}>
                    <Grid item xs={5} sm={5} md={5}>
                        {/* <Paper className="post-list" elevation={5}> */}
                            {
                                this.renderPostList()
                            }
                        {/* </Paper> */}
                    </Grid>
                    <Grid item xs={7} sm={7} md={7}>
                        {/* <Paper className="content" elevation={5} > */}
                            {
                                this.renderContent()
                            }
                        {/* </Paper> */}
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default withRouter(withStyles(styles, { withTheme: true })(ShowPost));
