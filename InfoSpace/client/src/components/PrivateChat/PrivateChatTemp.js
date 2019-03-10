import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './PrivateChatTemp.module.css';

const PrivateChatTemp = (props) => (
    <Aux>
        <div className={classes.inbox_chat}>
            <div className={[classes.chat_list].join(' ')}>
              <div className={classes.chat_people}>
                <div className={classes.chat_img}> <img src={props.imageURL} alt={props.name}/> </div>
                <div className={classes.chat_ib}>
                  <h5>{props.name}<span className={classes.chat_date}>{props.date}</span></h5>
                  <p>{props.message}</p>
                </div>
              </div>
            </div>
        </div>
    </Aux>
);

export default PrivateChatTemp;