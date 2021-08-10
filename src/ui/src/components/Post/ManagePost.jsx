import React from 'react';
import axios from 'axios';

import {ACCESS_TOKEN_NAME, API_BASE_URL} from '../../constants/apiConstants';
import {withRouter} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";
import Pluralize from "pluralize";

const styles = (theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop:theme.spacing(4),
        spacing: 0,
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    list:{

    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
})

class ManagePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            searchQuery: "",
            activeTabIndex: 0
        };
        this.getPostByUser = this.getPostByUser.bind(this);
    }

    componentDidMount() {
        this.getPostByUser()
    }

    getPostByUser(){
        var self = this;
        axios.get(API_BASE_URL + '/resource/all', {})
            .then(function (response) {
                self.setState({posts: response.data})
            })
            .catch(function (error) {
                console.log('error is ', error);
            });
    }

    handleEdit = (postId) => () => {
        console.log(postId)
        this.props.history.push(`/updatePost/${postId}`)
    };

    handleDelete = (postId) => () => {
        console.log(postId)
        const config = {
            headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)},
            params:{
               id: postId
            }
        };
        axios.delete(API_BASE_URL + '/resource/delete', config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Success");
                }
            })
            .catch(function (error) {
                console.log('error is ', error);
            });
    };

    renderPostList(){
        return (
            <div>
                { this.state.posts.length?
                    (
                        <Paper className="post-list" elevation={5}>
                            <Typography variant="h6" align="center" className={this.props.classes.title}>
                                Manage Post
                            </Typography>
                            <div className={this.props.classes.list}>
                                <List>
                                    {this.state.posts.map((post, index) => {
                                        const createdDate = moment(Date(post.createdAt)).format('MMMM Do YYYY')
                                        const modifiedDate = moment(Date(post.updateAt)).format('MMMM Do YYYY')
                                        const viewCount = Pluralize("view", post.viewCount, true)
                                        const voteCount = post.voteCount
                                        return (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <ForumIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={post.title}
                                                    secondary={`Created: ${createdDate},  
                                                    Modified: ${modifiedDate},  
                                                    Views: ${viewCount}, 
                                                    Upvote: ${voteCount}`}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="edit" onClick={this.handleEdit(post.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="delete" onClick={this.handleDelete(post.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                    )}
                                </List>
                            </div>
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

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container
                      spacing={0}
                      alignItems="center"
                      justify="center"
                      className={classes.layout}>
                    <Grid item xs={12} sm={12} md={12} >
                    {
                        this.renderPostList()
                    }
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default withRouter(withStyles(styles, { withTheme: true })(ManagePost));
