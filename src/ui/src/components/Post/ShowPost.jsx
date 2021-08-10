import React from 'react';
import axios from 'axios';

import {API_BASE_URL} from '../../constants/apiConstants';

import moment from 'moment';
import parse from 'html-react-parser';
import SearchField from 'react-search-field';
import Pluralize from 'pluralize';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Comments from "../Comments/Comments";
import Vote from "../Vote/Vote";
import {withRouter} from "react-router-dom";

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
})

const generateNameTag = (user) => {
    if(user){
        return `${user.name}-${user.faculty}-${user.program}-${user.year}`
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
            activeTabIndex: 0
        };
        this.searchOnChange = this.searchOnChange.bind(this);
        this.getAllPost = this.getAllPost.bind(this);
        this.redirectToAddPost = this.redirectToAddPost.bind(this);
        this.updateCurrentPost = this.updateCurrentPost.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.updateViewCount = this.updateViewCount.bind(this);
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

    searchOnChange(value, event){
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
        }else{
            this.getAllPost()
        }
    }

    redirectToAddPost(){
        this.props.history.push("/AddPost")
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
            <div>
                <Paper elevation={0} >
                    <Grid item xs container>
                        <Grid item xs={5} sm={5} md={5}>
                            <SearchField
                                placeholder="Search Posts..."
                                onChange={this.searchOnChange}
                                // searchText="This is initial search text"
                                classNames="test-class"
                            />
                        </Grid>
                        <Grid item xs={7} sm={7} md={7}>
                            <button type="button" onClick={this.redirectToAddPost} id="addPost" name="Create Post"
                                    className="btn btn-primary pull-right">Create Post
                            </button>
                        </Grid>
                     </Grid>
                </Paper>
                <Paper elevation={0} >
                    <Typography gutterBottom variant="h5" component="h2">
                       Search result for " {this.state.searchQuery}"
                    </Typography>
                    <Toolbar component="nav" variant="dense" className={this.props.classes.toolbarSecondary}>
                        <Tabs value={activeTabIndex} onChange={this.handleChangeTab}>
                            <Tab label="Recent" />
                            <Tab label="Trending" />
                        </Tabs>
                    </Toolbar>
                </Paper>
                { this.state.posts.length?
                    (
                        <Paper elevation={0} style={{maxHeight: 800, overflow: 'auto'}}>
                            {
                                this.state.posts.map((post, index) => {
                                    return <PostTitle value={post} onClick={self.updateCurrentPost} classes={this.props.classes}/>
                                })
                            }
                        </Paper>
                    ):
                    (
                        <Typography  variant="h5" component="h2" align="center">
                            No Result Found
                        </Typography>
                    )
                }
            </div>
        )
    }

    renderContent(){
        if (this.state.posts.length === 0){
            // Empty content
            return (<Box className={this.props.classes.emptyContentLayout} >
                <Typography  variant="h5" component="h2" align="center">
                  Post Not Selected
                </Typography>
            </Box>)
        }else {
            if(!this.state.curPost){
                this.state.curPost = this.state.posts[0]
            }
            const curPost = this.state.curPost
            const date = Date(curPost.createdAt)
            console.log(curPost)
            return (
                <Box className={this.props.classes.contentLayout}>
                    <Grid item xs container>
                        <Grid item xs={9} sm={9} md={9}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={this.props.classes.avatar}>
                                        R
                                    </Avatar>
                                }
                                title="Andy - 4A Student"
                                subheader={moment(date).format('MMMM Do YYYY') + " - " + Pluralize("view", curPost.viewCount, true)}
                            />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3}>
                            <Vote vote={curPost.voteCount} postId={curPost.id} />
                        </Grid>
                    </Grid>
                    <Typography gutterBottom variant="h5" component="h2">
                        {curPost.title}
                    </Typography>
                    {curPost.contentType && curPost.contentType === "html"
                        ? <p className="list-group-item-text">{parse(curPost.content)}</p>
                        : <p className="list-group-item-text">{curPost.content}</p>
                    }
                    <Comments postId={curPost.id}/>
                </Box>
            )
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container spacing={2} className={classes.layout}>
                    <Grid item xs={5} sm={5} md={5}>
                        <Paper className="post-list" elevation={5}>
                            {
                                this.renderPostList()
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7}>
                        <Paper className="content" elevation={5} >
                            {
                                this.renderContent()
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

class PostTitle extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.value);
    }

    render() {
        const post = this.props.value
        const date = Date(post.createdAt)
        console.log(date)
        return (
            <Card>
                <CardActionArea onClick={this.handleClick}>
                    <CardContent>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={this.props.classes.avatar}>
                                    R
                                </Avatar>
                            }
                            title={generateNameTag(post.user)}
                            subheader={moment(date).format('MMMM Do YYYY') + " - " + Pluralize("view", post.viewCount, true)}
                        />
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Category: {post.category.type}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(ShowPost));
