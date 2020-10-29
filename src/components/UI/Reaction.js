import React from 'react';
import './Reaction.css';

const reaction = (props) => {
    return(
            <div className="feed"> 
                <a className="like-btn">
                <div className="reaction-box">
                    <div className="reaction-icon" onClick={() => props.clicked(props.messageId, 'like')}>
                     <i className="em em---1" aria-role="presentation" aria-label="THUMBS UP SIGN"></i>
                    </div>
                    <div className="reaction-icon" onClick={() => props.clicked(props.messageId, 'love')}>
                     <i className="em em-heartbeat" aria-role="presentation" aria-label="BEATING HEART"></i>
                    </div>
                    <div className="reaction-icon" onClick={() => props.clicked(props.messageId, 'haha')}>
                      <i className="em em-grinning" aria-role="presentation" aria-label="GRINNING FACE"></i>;
                    </div>
                    <div className="reaction-icon" onClick={() => props.clicked(props.messageId, 'wow')}>
                     <i className="em em-astonished" aria-role="presentation" aria-label="ASTONISHED FACE"></i>
                    </div>
                    <div className="reaction-icon" onClick={() => props.clicked(props.messageId, 'sad')}>
                     <i className="em em-confused" aria-role="presentation" aria-label="CONFUSED FACE"></i>
                    </div>
                    <div className="reaction-icon" onClick={() => props.clicked(props.messageId, 'angry')}>
                    <i className="em em-angry" aria-role="presentation" aria-label="ANGRY FACE"></i>
                    </div>
                </div> 
                </a> 
            </div>
    );
}

export default reaction;