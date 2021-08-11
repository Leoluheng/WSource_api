import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Pluralize from "pluralize";
import NameTag from "../Utils/NameTag";
export default class PostTitle extends React.Component {
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
                            // title={generateNameTag(post.user)}
                            title={
                                <NameTag user={post.user}/>
                            }
                            subheader={moment(date).format('MMMM Do YYYY') + " - " + Pluralize("view", post.viewCount, true)}
                        />
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