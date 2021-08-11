import React from "react";
import {withRouter} from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

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


