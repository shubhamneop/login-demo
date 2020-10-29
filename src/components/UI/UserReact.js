import React from 'react';


const userReact = (props) => {
    
    let data = null;
    if(props.type == 'like') {
        data = <i className="em em---1" aria-role="presentation" aria-label="THUMBS UP SIGN"></i>;
    }
    if(props.type == 'love') {
        data = <i className="em em-heartbeat" aria-role="presentation" aria-label="BEATING HEART"></i>;
    }
    if(props.type == 'haha') {
        data = <i className="em em-grinning" aria-role="presentation" aria-label="GRINNING FACE"></i>;
    }
    if(props.type == 'wow') {
        data = <i className="em em-astonished" aria-role="presentation" aria-label="ASTONISHED FACE"></i>;
    }
    if(props.type == 'sad') {
        data = <i className="em em-confused" aria-role="presentation" aria-label="CONFUSED FACE"></i>;
    }

    if(props.type == 'sad') {
        data = <i className="em em-angry" aria-role="presentation" aria-label="ANGRY FACE"></i>;
    }
    return data;
}

export default userReact;