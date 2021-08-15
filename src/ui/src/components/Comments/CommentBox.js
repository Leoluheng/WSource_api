import React, { useState, useRef } from "react";
import cn from "classnames";
import useDynamicHeightField from "./useDynamicHeightField";
import "./CommentBox.css";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const INITIAL_HEIGHT = 46;

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/how-to-build-an-expandable-comment-box
 */
export default function CommentBox(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);
    useDynamicHeightField(textRef, commentValue);

    const useStyles = makeStyles((theme) => ({
        submit: {
            // margin: theme.spacing(3, 0, 2),
            background: '#FFC100',
            color: 'white',
            borderRadius: 10,
            height: '40px',
            '&:hover': {
                backgroundColor: 'white',
                color: '#ffbf00',
                },
        },
    }));

    const onExpand = () => {
        if (!isExpanded) {
            outerHeight.current = containerRef.current.scrollHeight;
            setIsExpanded(true);
        }
    };

    const onChange = (e) => {
        setCommentValue(e.target.value);
    };

    const onClose = () => {
        setCommentValue("");
        setIsExpanded(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        props.onCommentSubmit(commentValue);
        onClose();
        console.log("send the form data somewhere");
    };

    const classes = useStyles();

    return (
        <div className="container comment-page">
            <form
                // onSubmit={onSubmit}
                ref={containerRef}
                className={cn("comment-box comment-page", {
                    expanded: isExpanded,
                    collapsed: !isExpanded,
                    modified: commentValue.length > 0
                })}
                style={{
                    minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
                }}
            >
                <div className="header comment-page">
                    {/*<div className="user">*/}
                    {/*    <img*/}
                    {/*        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"*/}
                    {/*        alt="User avatar"*/}
                    {/*    />*/}
                    {/*    <span>User Name</span>*/}
                    {/*</div>*/}
                </div>
                <label htmlFor="comment comment-page">Add a comment</label>
                <textarea
                    ref={textRef}
                    onClick={onExpand}
                    onFocus={onExpand}
                    onChange={onChange}
                    className="comment-field comment-page"
                    placeholder="What are your thoughts?"
                    value={commentValue}
                    name="comment"
                    id="comment"
                />
                <div className="actions comment-page">
                    <button type="button" className="cancel comment-page" onClick={onClose}>
                        Cancel
                    </button>
                    <Button onClick={onSubmit} className={classes.submit} disabled={commentValue.length < 1}>
                        Respond
                    </Button>
                </div>
            </form>
        </div>
    );
}
