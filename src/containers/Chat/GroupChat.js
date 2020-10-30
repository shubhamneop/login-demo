import React, { useState, useEffect, useRef } from "react";
import { StreamChat } from 'stream-chat';
import './Chat.css';
import axios from '../../axios-in';
import moment from 'moment'
import Reaction from '../../components/UI/Reaction';
import UserReact from '../../components/UI/UserReact';
import { FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';



const  GroupChat = (props)  => {

        const [client, setClient] = useState(null);
        const clientRef = useRef(null);
        clientRef.current = client;

        const [channel, setChannel] = useState(null);
        const channelRef = useRef(null);
        channelRef.current = channel;

        const [message, setMessage]= useState('');
        const messageRef = useRef('');
        messageRef.current = message;

        const [messageData, setMessageData]= useState([]);
        const messageDataRef = useRef([]);
        messageDataRef.current = messageData;

        const messagesEndRef = useRef(null);

        const [userChannels, setUserChannels] = useState(null);
        const userChannelsRef = useRef(null);
        userChannelsRef.current = userChannels;

        useEffect(() => {
            console.log(props);
            initializeClient();
            setTimeout(function() {
                createChannel();
            }.bind(this), 2000);
            askNotificationPermission();
        }, []);

        useEffect(() => {
            scrollToBottom();
        }, [message,messageData]);

          
        
         const askNotificationPermission = async () => {
            // check if the browser supports notifications
            if ("Notification" in window) {
              if (checkNotificationPromise()) {
                const permission = await Notification.requestPermission();
                handlePermission(permission);
              } else {
                Notification.requestPermission(permission => {
                  handlePermission(permission);
                });
              }
            } else {
              console.log("This browser does not support notifications.");
            }
          };
        
         const handlePermission = permission => {
            if (!("permission" in Notification)) {
              Notification.permission = permission;
            }
          };
    
         const checkNotificationPromise = () => {
            try {
              Notification.requestPermission().then();
            } catch (e) {
              return false;
            }
        
            return true;
          }

         const createNotification = (message, name) => {
            
            return new Notification(`Message sent by ${message.user.name} in ${name} group `, {
              body: message.text,
            });
          }

          const reactionNotification = reaction => {
            
            return new Notification(`${reaction.user.name} react to  a message`);
          }

        const initializeClient = async () => {
            const {data} = await axios.post("/generate_token",{name: props.userId});
            const client = new StreamChat('gbtn87gqvdg4', { timeout: 6000 });
            await client.setUser({id: props.userId, name: props.name}, data.token);
            setClient(client);
        }

        const createChannel =  async () => {
            // const {data} =  await axios.post('/get_channel', {
            //     from_username: props.name,
            //     to_username: props.toUserName,
            //     from: props.name,
            //     to: props.toUserName,
            // })
            console.log('in create channel');
            setTimeout(function() {
                console.log(clientRef.current);
        
                if(clientRef.current){
                    // const channel = clientRef.current.channel('team', '', {
                    //     name: 'LiveChat channel',
                    //     members: ['cpjtin', 'Ll9ZXn', 'CE70r3']
                    // });
                    const channel = clientRef.current.channel('team', props.channelId);
                    channel.watch().then(state => {
                        channel.on('message.new', event => {
                            console.log(event);
                            console.log(state.channel.name);
                            const messages = [...messageDataRef.current, event.message];
                            setMessageData(messages);
                            setTimeout(function(){
                                if (event.message.user.id !== clientRef.current.user.id) {
                                    createNotification(event.message, state.channel.name);
                                }
                                if (event.reaction) {
                                    reactionNotification(event.reaction);
                                }
                            }.bind(this), 2000);
                        });
                    })
                    setChannel(channel);
                    setTimeout(function(){
                        if(channelRef.current.state.messages) {
                            channelRef.current.state.messages.map(message =>{
                                const oldMessages = [...messageDataRef.current, message];
                                setMessageData(oldMessages);
                            });
                        }
                    }.bind(this),5000);
                    const channelNew = clientRef.current.channel('team', "!members-3D4BtOrOluL8EdYnzAxJxAON1sbpB-pJigJQTlOpXw4");
                    console.log(channelNew);
                    //     const filters = { type: 'team', members: { $in: [`${props.userId}`] } };
                    // const sort = { last_message_at: -1 };
                    // // const channels = client.queryChannels(filters, sort);
                    // const channels = await clientRef.current.queryChannels(filters, sort, {
                    //     watch: true,
                    //     state: true,
                    // });
                    
                    // for (const c of channels) {
                    //     console.log(c, c.cid);
                    // }
                    // setUserChannels(channels);
                }
            }.bind(this), 2000);
        }


        const sendMessageHandler = async (e) => {
            if(e.keyCode === 13){
                if(channelRef.current){
                    if(messageRef.current.trim().length > 0){
                        const message = await channelRef.current.sendMessage({
                            text:messageRef.current
                        });
                        setMessage('');
                        
                    }
                }
            }
        }

        const scrollToBottom = () => {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }

        const sendReactionHandler = async(id, rect) => {
            const reaction = await channelRef.current.sendReaction(id, {
                type: rect
              });
        }

        const LEFT_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
        const RIGHT_IMG = "https://image.flaticon.com/icons/svg/145/145871.svg";
        const like = 'https://emoji.beeimg.com/like/10/facebook';
        

    return (
        <section className="msger">
        <header className="msger-header">
            <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i> Group chat
            </div>
            <div className="msger-header-options">
                <button onClick={askNotificationPermission}>
                   <span><FontAwesomeIcon icon={faCog} /></span>
                </button>
            </div>
        </header>

        <main className="msger-chat">
            {messageData.map((message,index)=>{
                return(

                <div key={index} className={`msg ${message.user.id == props.userId ? 'right-msg' : 'left-msg' }`}>
                    <div
                    className="msg-img"
                    style={{backgroundImage: `${message.user.id == props.userId ? `url(${RIGHT_IMG})` : `url(${LEFT_IMG})` }` }}
                    ></div>

                    <div className="msg-bubble">
                        <div className="msg-info">
                        <div className="msg-info-name">{message.user.name}</div>
                        <div className="msg-info-time">{moment(message.created_at).format('hh:mm a')}</div>
                        </div>

                        <div className="msg-text">
                        {message.text}
                        </div>
                        <div className="msg-reaction">
                            {message.latest_reactions.map((reaction, i) => {
                                return (
                                    <UserReact key={i} type={reaction.type} />
                                );
                            })}
                        </div>
                        <Reaction messageId={message.id} clicked={sendReactionHandler} />
                       
                    </div>
                </div>
                );
                })}
                <div ref={messagesEndRef} />
        </main>

        <div className="msger-inputarea">
            <input type="text" className="msger-input" placeholder="Enter your message..." value={message} onChange={event => setMessage(event.target.value)} onKeyDown={sendMessageHandler} />
        </div>
    </section>
    );
}

const mapStateToProps = state => {
    return {
        userId : state.auth.userId,
        name: state.auth.name,
    }
}

export default connect(mapStateToProps) (GroupChat);