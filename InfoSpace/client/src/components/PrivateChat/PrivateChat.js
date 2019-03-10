import React, {Component} from 'react';
import {InputGroup, FormControl, Button, Container}from 'react-bootstrap';
import Aux from '../../hoc/Aux';
import classes from './PrivateChat.module.css';
import PrivateChatTemp from './PrivateChatTemp';
import IncomingMsg from './IncomingMsg';
import OutgoingMsg from './OutgoingMsg';
import io from "socket.io-client";
import { connect } from 'react-redux';
//import { FaSearch } from 'react-icons/fa';

class PrivateChat extends Component{
  constructor(props){
        super(props);

        this.state = {
            msg: '',
            messages: [],
            room: ''
        };

        this.socket = io('localhost:5000');

        this.socket.on('connect', () => {
          this.socket.emit('NEW_USER', {      
            userName: this.props.match.params.sender,
            uId: this.socket.id
          })
        })


        this.socket.on('RECEIVE_MESSAGE', function(data){         
            addMessage(data);             
        });
    
    this.componentWillUnmount = ()=> {
      this.socket.emit('REMOVE_USER', {     
            userName: this.props.match.params.sender,
            uId: this.socket.id           
          })
    }

    window.addEventListener("beforeunload", (ev) => {
        this.socket.emit('REMOVE_USER', {     
            userName: this.props.match.params.sender,
            uId: this.socket.id           
          })
      });
            
        const addMessage = data => {            
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();           
        const data = this.state.msg;

        this.socket.emit('SEND_MESSAGE', {      
              message: this.state.msg,
              userName: this.props.match.params.receiver
            })
            const msgObj = {
                senderId: this.props.user.id,
                receiverId: this.props.match.params.id,
                message: this.state.msg
            }
            //this.props.privateMessage(msgObj);
            this.setState({msg: ''})
        }

        this.handleInputChange = (ev) => {
        this.setState({
          [ev.target.name]: ev.target.value
        })
      }
    }
    render() {

        
        return (
            <Aux>
               <Container>
                <div className={classes.messaging}>
                  <div className={classes.inbox_msg}>
                    <div className={classes.inbox_people}>
                      <div className={classes.headind_srch}>
                        <div className={classes.recent_heading}>
                          <h4>Recent</h4>
                        </div>
                        <div className={classes.srch_bar}>
                          <div className="stylish-input-group">
                            <input type="text" className="search-bar"  placeholder="Search" />
                            <span className="input-group-addon">
                                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                            </span> 
                          </div>
                        </div>
                      </div>
                      <div className={classes.inbox_chat}>
                        <div className={[classes.chat_list, classes.active_chat].join(' ')}>
                          <div className={classes.chat_people}>
                            <div className={classes.chat_img}> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                            <div className={classes.chat_ib}>
                              <h5>Sunil Rajput <span className={classes.chat_date}>Dec 25</span></h5>
                              <p>Test, which is a new approach to have all solutions 
                                astrology under one roof.</p>
                            </div>
                          </div>
                        </div>
                        <PrivateChatTemp 
                          imageURL = "https://ptetutorials.com/images/user-profile.png"
                          name = 'Sunil'
                          date = 'Dec 25'
                          message = 'Test, which is a new approach to have all solutions 
                          astrology under one roof.'/>                                    
                        
                      </div>
                    </div>
                    <div className={classes.mesgs}>
                      <div className={classes.msg_history}>
                        {/*<IncomingMsg 
                        imageURL = "https://ptetutorials.com/images/user-profile.png"
                        message = "Test which is a new approach to have all solutions"
                        timeDate = '11:01 AM    |    June 9'/>
                        
                        <OutgoingMsg 
                          message = 'Apollo University, Delhi, India Test'
                          timeDate = '11:01 AM    |    Today'/> */} 
                          {this.state.messages.map(message => {
                            return (
                                <div>{message.message}</div>
                            )
                        })}                                                

                      </div>
                      <div className={classes.type_msg}>
                        <div className={classes.input_msg_write}>
                          <input type="text" className={classes.write_msg} placeholder="Type a message" name="msg" value={this.state.msg} onChange={this.handleInputChange} />
                          <button className={classes.msg_send_btn} type="button" onClick={this.sendMessage}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             </Container>
        </Aux>      
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user   
    };
}

export default connect(mapStateToProps)(PrivateChat);