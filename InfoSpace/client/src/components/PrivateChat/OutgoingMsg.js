import React from 'react';
import classes from './OutgoingMsg.module.css';

const OutgoingMsg = (props) => (
    <div className={classes.outgoing_msg}>
      <div className={classes.sent_msg}>
        <p>{props.message}</p>
        <span className={classes.time_date}> {props.timeDate}</span> 
      </div>
    </div>
);

export default OutgoingMsg;