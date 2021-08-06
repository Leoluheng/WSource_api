import React, { Component } from "react";
import Comment from "./Comment";
import CommentBox from "./CommentBox";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {red} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import {API_BASE_URL} from "../../constants/apiConstants";


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
            isFetching: true
        };
        this.getComments = this.getComments.bind(this)
        this.onCommentSubmit = this.getComments.bind(this)
    }


    async fetchData(url) {
        const response = await fetch(url);
        let data = await response.json();
        return data;
    }

    componentDidMount() {
        // const url = "https://jsonplaceholder.typicode.com/posts/1/comments";
        // let data = this.fetchData(url);
        // data.then(comments => {
        //     let commentList = comments.slice(0, 10);
        //     this.setState(
        //         {
        //             comments: commentList,
        //             isFetching: false
        //         },
        //         () => console.log("New State", this.state.comments)
        //     );
        // });
        this.getComments();
    }

    onCommentSubmit(review){
        var self = this;
        const config = {
            params:{
                resourceId: self.props.postId
            }
        };
        axios.post(API_BASE_URL + '/resource/add', {
            review:review,
        }, config)
            .then(function (response) {
                console.log('reponse from add post is ', response)
                if (response.status === 200) {
                    console.log("Success");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getComments() {
        var self = this;
        // axios.get(API_BASE_URL + '/comment/getByResourceId', {
        //     params: {
        //         resourceId: self.props.postId
        //     }
        // })
        axios.get('https://jsonplaceholder.typicode.com/posts/1/comments', {
            params: {
                resourceId: self.props.postId
            }
        })
        .then(function (response) {
            let commentList = response.data.slice(0, 10);
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
                <Typography className={this.props.classes.header} variant="h4">
                    Comments
                </Typography>
                <Comment comments={comments} />
                <CommentBox onCommentSubmit={this.onCommentSubmit}/>
            </Box>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Comments);