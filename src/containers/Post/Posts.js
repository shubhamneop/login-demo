import React from 'react';
import classes from './Post.module.css';

const posts = (props) => {
    return (
        <div className={classes.Post}>
            <h3>{props.title}</h3>
            <hr/>
            <h1>{props.post}</h1>
        </div>
    );
}

export default posts;