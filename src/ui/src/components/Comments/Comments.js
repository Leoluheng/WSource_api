import React, { Component } from "react";
import Comment from "./Comment";
import CommentBox from "./CommentBox";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../../constants/apiConstants";
import {Divider} from "@material-ui/core";


const styles = (theme) => ({
    spacing: {
        marginTop: "50px"
    },
    header: {
        marginLeft: "20px",
        fontWeight: 600
    },
})
class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            isFetching: true,
            postId: props.postId,
        };
        this.getComments = this.getComments.bind(this)
        this.onCommentSubmit = this.onCommentSubmit.bind(this)
    }


    async fetchData(url) {
        const response = await fetch(url);
        let data = await response.json();
        return data;
    }

    componentDidMount() {
        this.getComments();
    }

    componentDidUpdate(prevProps) {
        if(this.props.postId){
            console.log(this.props.postId)
        }
        if(prevProps.postId !== this.props.postId) {
            this.setState({postId: this.props.postId});
            this.getComments();
        }
    }

    onCommentSubmit(review){
        var self = this;
        console.log(self.props.postId)
        const config = {
            headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)},
            params:{
                resourceId: self.props.postId
            }
        };
        axios.post(API_BASE_URL + '/comment/add', {
            review:review,
        }, config)
            .then(function (response) {
                console.log('reponse from add post is ', response)
                if (response.status === 200) {
                    console.log("Success");
                }
                self.getComments()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getComments() {
        var self = this;
        axios.get(API_BASE_URL + '/comment/getByResourceId', {
            params: {
                resourceId: self.props.postId
            }
        }).then(function (response) {
            console.log(response.data)
            let commentList = response.data.content;
            self.setState(
                {
                    comments: commentList,
                    isFetching: false
                },
                () => console.log("New State", self.state.comments)
            );
            console.log('Success retrieve all comments')
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { comments, isFetching } = this.state;
        return isFetching ? "Loading..." :  (
            <Box>
                <Divider />
                <Typography className={this.props.classes.header} variant="h4">
                    Comments
                </Typography>
                <Comment comments={comments} />
                <CommentBox onCommentSubmit={this.onCommentSubmit} getComment={this.getComments}/>
            </Box>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Comments);