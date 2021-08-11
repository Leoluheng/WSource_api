import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import NameTag from "../Utils/NameTag";
import Pluralize from "pluralize";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {withRouter} from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundColor: red[500],
    },
}));
function PostHeader(props) {
    const classes = useStyles();
    const date = moment(props.post.createdAt, 'MMMM Do YYYY, h:mm a')
    return (
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                </Avatar>
            }
            title={
                <NameTag user={props.post.user}/>
            }
            subheader={date.format('MMMM Do YYYY, h:mm a') + " - " + Pluralize("view", props.post.viewCount, true)}
        />
    )
}

export default withRouter(PostHeader);
