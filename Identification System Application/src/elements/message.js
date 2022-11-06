import font from './style.module.css';
import React,{useGlobal } from 'reactn';
// Message window for posing messages
function Message()
{   const [message] = useGlobal('message');
    return(
    <div>
      <br></br>
      <label className={font.l1} >Message:</label>
      <br></br>
      <p1 className={font.l2}>{message}</p1>
      <br></br>
      </div>
    )
}

export default Message;