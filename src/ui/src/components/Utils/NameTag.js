import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    name: {
        fontWeight: "bold",
        display: "inline"
    },
    profile: {
        display: "inline",
    }

}));

function NameTag(props) {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.name}>
                {props.user.name}
            </Typography>
            {/*Add space between two typography*/}
            &nbsp;
            <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
            >
                {`  ${props.user.faculty}-${props.user.program}-${props.user.year}`}
            </Typography>
        </>
    );
}

export default withRouter(NameTag);


