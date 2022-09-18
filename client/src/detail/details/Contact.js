import React from 'react';
import './Contact.css';

export default function Contact(props) {
  return (props.trigger)? (
    <div className='popup' >
        <div className='popup-inner'>
            <button className='popup-close' onClick={()=>props.setTrigger(false)} key={props.key} >close</button>
            {props.children}
            <h3>Owner Contact :</h3>
            <p>{props.mobile_num}</p>
        </div>
        </div>
  ):"";
}
