import font from './style.module.css';
import React,{setGlobal } from 'reactn';

function Main(props)
{ 
  function loadFile(event) {
    var ImgSrc= URL.createObjectURL(event.target.files[0]);
    setGlobal({
      photo: ImgSrc,
      });
  };

  return(
    <div>
      <h1>Identity Database</h1>
      <label className= {font.l1} for ='name'>Name: </label>
      <input className={font.in2} type="text" id ='name' name = 'name'></input>
      
      <br></br>
      <label className= {font.l1} for ='Surname'>Surname: </label>
      <input className={font.in2} type="text" id ='surname' name = 'surname'></input>
            <br></br>

      <label className= {font.l1} for="birthday">Birthday:</label>
      <input className={font.in2} type="date" id="birthday" name="birthday"></input>
      <br></br>

      <label className= {font.l1} for ='gender'>Gender: </label>
      <select className={font.in2} id="gender">
        <optgroup label="gender">
            <option value="Female">Female</option>
            <option value="Male">Male</option>
        </optgroup>
      </select>
      <br></br>

      <label className= {font.l1} for="img">Select image:</label>
      <input type="file" id="img" name="img" accept="image/*" onChange={loadFile}></input>
      <br></br>
      
      <button className={font.ChangeButton} onClick={props.register()} type="button">Register</button>

      <br></br>
      <br></br>
      <h2>Change Information of Person</h2>
      <label className= {font.l1} for ='ID'> ID: </label>
      <input className={font.in3} type="text" id ='ID' name = 'ID'></input>
      <br></br>
      <button className= {font.ChangeButton} onClick={props.findID()} type="button">Find ID</button>
      <br></br>
      <label className= {font.l1} for ='nameC'>Name: </label>
      <input className={font.in} type="text" id ='nameC' name = 'nameC'></input>
      <br></br>
      <button className= {font.ChangeButton} onClick={props.nameChange()} type="button">Change</button>
      <br></br>
      <label className= {font.l1} for ='surnameC'>Surname: </label>
      <input className={font.in} type="text" id ='surnameC' name = 'surnameC'></input>
      <br></br>
      <button className= {font.ChangeButton} onClick={props.surnameChange()} type="button">Change</button>
      <br></br>
      <button className= {font.button} onClick={props.marry()} type="button">Marry</button>
      <button className= {font.button} onClick={props.divorce()} type="button">Divorce</button>
      <button className= {font.button} onClick={props.widow()} type="button">Widow</button>

      </div>
    )
}

export default Main;