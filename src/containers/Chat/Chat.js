import React, { useState, useEffect, useRef } from "react";
import { StreamChat } from 'stream-chat';
import './Chat.css';
import axios from '../../axios-in';
import moment from 'moment'
import Reaction from '../../components/UI/Reaction';
import UserReact from '../../components/UI/UserReact';


function Chat(props) {

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

        useEffect(() => {
            initializeClient();
            createChannel();
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

         const createNotification = message => {
            
            return new Notification(`${message.user.name} sent a message`, {
              body: message.text,
            });
          }

          const reactionNotification = reaction => {
            
            return new Notification(`${reaction.user.name} react to  a message`);
          }

        const initializeClient = async () => {
            const {data} = await axios.post("/generate_token",{name: props.userId});
            console.log(data);
            const client = new StreamChat('gbtn87gqvdg4', { timeout: 6000 });
            await client.setUser({id: props.userId, name: props.name}, data.token);
            console.log(client);
            setClient(client);
        }

        const createChannel =  async () => {
            const {data} =  await axios.post('/get_channel', {
                from_username: props.name,
                to_username: props.toUserName,
                from: props.name,
                to: props.toUserName,
            })
            if(clientRef.current && data){
                const channel = clientRef.current.channel('messaging', '', {
                    name: 'LiveChat channel',
                    members: [props.toUserId, props.userId]
                });
                channel.watch().then(state => {
                    channel.on('message.new', event => {
                        console.log(event);
                        const messages = [...messageDataRef.current, event.message];
                        setMessageData(messages);
                        setTimeout(function(){
                            if (event.message.user.id !== clientRef.current.user.id) {
                                createNotification(event.message);
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
            }
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
            <i className="fas fa-comment-alt"></i> SimpleChat Client
            </div>
            <div className="msger-header-options">
                <button onClick={askNotificationPermission}>
                   <span><i className="fas fa-cog"></i></span>
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
export default Chat;