import React from "react";
import Faker from "faker";

import { makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar
} from "@material-ui/core";

import NameTag from "../Utils/NameTag";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    }
}));

const Comment = ({ comments }) => {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {comments.map(comment => {
                console.log("Comment", comment);
                return (
                    <React.Fragment key={comment.id}>
                        <ListItem key={comment.id} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="avatar" src={Faker.image.avatar()} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <NameTag user={comment.user}/>
                                }
                                secondary={
                                    <>
                                        {`${comment.review}`}
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="middle" />
                    </React.Fragment>
                );
            })}
        </List>
    );
};

export default Comment;