import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import PostHeader from "./PostHeader";
import Avatar from "@material-ui/core/Avatar";
import NameTag from "../Utils/NameTag";
import Pluralize from "pluralize";
import CardHeader from "@material-ui/core/CardHeader";
export default class PostTitle extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.value);
    }

    render() {
        const post = this.props.value
        const date = moment(this.props.value.createdAt, 'MMMM Do YYYY, h:mm a')
        return (
            <Card>
                <CardActionArea onClick={this.handleClick}>
                    <PostHeader post={post}/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            { post.category ?
                                `Category: ${post.category}`:
                                ""
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}