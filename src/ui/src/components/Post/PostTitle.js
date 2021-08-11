import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import PostHeader from "./PostHeader";

export default class PostTitle extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.value);
    }

    render() {
        const post = this.props.value
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