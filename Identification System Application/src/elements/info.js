import font from './style.module.css';
import {useGlobal } from 'reactn';
function Info()
{   
    var ID = useGlobal('ID');
    var name = useGlobal('name');
    var surname = useGlobal('surname');
    var gender = useGlobal('gender');
    var status = useGlobal('status');
    var license = useGlobal('license');
    var Alive = useGlobal('Alive');
    return(
    <div>
      <p1>ID: <span className= {font.l1}>{ID}</span> </p1>
      <br></br>
      <p1>Name: <span className= {font.l1}>{name}</span> </p1>
      <br></br>
      <p1>Surname: <span className= {font.l1}>{surname}</span> </p1>
      <br></br>
      <p1>Gender: <span className= {font.l1}>{gender}</span> </p1>
      <br></br>
      <p1>Alive: <span className= {font.l1}>{Alive}</span> </p1>
      <br></br>
      <p1>Status: <span className= {font.l1}>{status}</span> </p1>
      <br></br>
      <p1>Licence: <span className= {font.l1}>{license}</span> </p1>
      <br></br>
    </div>
    )
}

export default Info;