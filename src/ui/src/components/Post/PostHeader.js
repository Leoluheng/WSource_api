import React from "react";
import moment from "moment";
import Pluralize from "pluralize";
import {withRouter} from "react-router-dom";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";

import NameTag from "../Utils/NameTag";

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
                    {props.post.user.name.charAt(0).toUpperCase()}
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
