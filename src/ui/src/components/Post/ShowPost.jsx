import React from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import SearchField from 'react-search-field';
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
import Comments from "../Comments/Comments";

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
    avatar: {
        backgroundColor: red[500],
    },
})
class ShowPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            curPost: 0,
            searchQuery: ""
        };
        this.searchOnChange = this.searchOnChange.bind(this);
        this.getAllPost = this.getAllPost.bind(this);
        this.redirectToAddPost = this.redirectToAddPost.bind(this);
        this.updateCurrentPost = this.updateCurrentPost.bind(this);

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

    redirectToAddPost(value){
        this.props.history.push("/AddPost")
    }

    updateCurrentPost(value){
        this.setState({curPost: value })
    }

    renderPostList(){
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
                </Paper>
                <Paper elevation={0} style={{maxHeight: 800, overflow: 'auto'}}>
                    {
                        this.state.posts.map((post, index) => {
                            return <PostTitle value={post} onClick={self.updateCurrentPost} classes={this.props.classes}/>
                        })
                    }
                </Paper>
            </div>
        )
    }

    renderContent(){
        if (this.state.posts.length === 0){
            return <div> content </div>
        }else {
            const curPost = this.state.curPost
            return (
                <Box className={this.props.classes.contentLayout}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={this.props.classes.avatar}>
                                R
                            </Avatar>
                        }
                        title="Andy - 4A Student"
                        subheader="September 14, 2016"
                    />
                    {curPost.contentType && curPost.contentType === "html"
                        ? <p className="list-group-item-text">{parse(curPost.content)}</p>
                        : <p className="list-group-item-text">{curPost.content}</p>
                    }
                    <Comments />
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
                            title="Andy - 4A Student"
                            subheader="September 14, 2016"
                        />
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.value.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {/*category*/}
                            Scholarship
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ShowPost);
