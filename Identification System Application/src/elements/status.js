import font from './style.module.css';
import {useGlobal} from 'reactn';
function Status()
{    
    var StatusA;
    var StatusB;
    var stateA;
    var stateB;

    //States of the networks
    var isAliveAccess = useGlobal('isAliveAccess');
    var isAliveIdentity = useGlobal('isAliveIdentity');
    var account = useGlobal('account');
    var AccessAddress = useGlobal('AccessAddress');
    var IdentityAddress = useGlobal('IdentityAddress');
    if (!isAliveAccess[0])
      {
         stateA = font.offline;
         StatusA = "Offline";
      }

    else if (isAliveAccess[0])
      {
         stateA = font.online;
         StatusA = "Online";
      }
  
    if (!isAliveIdentity[0])
      {
         stateB = font.offline;
         StatusB = "Offline";
      }

    else if (isAliveIdentity[0])
      {
         stateB = font.online;
         StatusB = "Online";
      }
    return(
    <div>
      <h1>Network Status</h1>
      <h3 className={font.l3}>Accessor</h3>
      <p1>Account: </p1> <p1>{account}</p1>
      <br></br>
      <p1>Status: </p1> <p1 className={stateA}>{StatusA}</p1>
      <br></br>
      <p1>Address:  </p1> <p1>{AccessAddress}</p1>
      
      <h3 className={font.l3}>Identity System</h3>
      <p1>Status: </p1>  <p1 className={stateB}>{StatusB}</p1>
      <br></br>
      <p1>Address:  </p1> <p1>{IdentityAddress}</p1>

      </div>
    )
}

export default Status;