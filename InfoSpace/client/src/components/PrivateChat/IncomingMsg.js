import React from 'react'
import classes from './IncomingMsg.module.css';

const IncomingMsg = (props) => (
    <div className={classes.incoming_msg}>
      <div className={classes.incoming_msg_img}> <img src={props.imageURL} alt={props.name} /> </div>
      <div className={classes.received_msg}>
        <div className={classes.received_withd_msg}>
          <p>{props.message}</p>
          <span className={classes.time_date}>{props.timeDate}</span></div>
      </div>
    </div>
);

export default IncomingMsg;