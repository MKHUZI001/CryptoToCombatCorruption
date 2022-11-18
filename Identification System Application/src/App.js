import React,{setGlobal } from 'reactn';
import { Web3Storage } from 'web3.storage';
import './App.css';
import Main from './elements/main';
import Info from './elements/info';
import Photo from './elements/photo';
import Status from './elements/status';
import Message from './elements/message';
import Login from'./elements/login';

//ipfs
const storage = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI3ZTliQkY2Y0I1NjU4ODMwNEQwMkY5NDM3NGQ1MjQ0NDFmNGRDMTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjU2MjQ3MzQzMjMsIm5hbWUiOiJwaG90b3MifQ.MQqSV8WEHllE0mthXdAX7bwjbhAgwJwgaMa4wDo8kBY" })

// Blockchain Variables
  const {ethers} = require('ethers')
  const Identity = require("./contracts/Identity.json")
  const Access = require("./contracts/Access.json")
  
  try{
  var jk = Identity.networks;
  var networkID = Object.keys(jk)[0];
  var IdentityAddress = Identity.networks[networkID].address;
  var AccessAddress = Access.networks[networkID].address;
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = provider.getSigner();
  const IDABI = Identity.abi;
  const ACABI = Access.abi;
  var identity = new ethers.Contract(IdentityAddress, IDABI, signer);
  var access = new ethers.Contract(AccessAddress, ACABI, signer);
  setGlobal({
    isAliveAccess: true,
    isAliveIdentity: true
  })
  }
  catch(e)
    {
      alert("Error");
      console.log(e);
      setGlobal({
        isAliveIdentity: false,
        isAliveAccess: false,
      });
       IdentityAddress = "";
       AccessAddress = "";
       access = "";
       identity = "";

    }
  
// End of blockchain variables

//global states
//var accessor = "";
setGlobal({
    message: 'No messages yet',
    
    account: "not logged in",
    AccessAddress: AccessAddress,

    IdentityAddress: IdentityAddress,

    photo: "",

    ID: "",
    name: "",
    surname: "",
    gender: "",
    Alive: "",
    status: "",
    license: "",
  });

function App()
{ 
    return (
    <>  
        <div className='header'> <h1>Blockchain Identity System</h1> </div>
        <div className='c1'>
        <div className='login'> {<Login login={() => login} logoff={() => logoff}/>} </div>
        <div className='status'> {<Status />} </div>
        </div>
        <div className='c2'>
        <div className='main'> {<Main register={() => register} findID={() => findID} nameChange={() => nameChange}
          surnameChange={() => surnameChange} marry={() => marry} divorce={() => divorce} widow={() => widow}/>} </div>

        </div>
        <div className='c3'>
        <div className='photo'> {<Photo/>} </div>
        <div className='info'> {<Info/>} </div>
        </div>
        <div className='message'> {<Message/>} </div>
    </>
    );
}
var newID;
//Functions for Blockchain
var login = async () => {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  try
    {
      await access.login(username, password);
      document.getElementById('password').value = "";
      document.getElementById('password').setAttribute('disabled', '');
      document.getElementById('username').setAttribute('disabled', '');
      document.getElementById('login').setAttribute('disabled', 'disabled');
      document.getElementById('logoff').removeAttribute('disabled');
      setGlobal({
        message: "Successfully logged in",
        account: username,
      })
    }
    catch(e)
    { 
      if (await checkAccess())
        {
      alert(e.error.code+":  Please refer messages on bottom left for more information: ");
      console.log(e);
      setGlobal({ message: String(e.error)});
        }

      else
        {
          alert(e.code+":  Please refer messages on bottom left for more information: ");
          console.log(e);
          setGlobal({ message: String(e)});
        }
    }
}

var logoff = async () => {
  var username = document.getElementById('username').value;
  try
    {
      var Ahash = await access.getHash(username);
      await access.logoff(username, Ahash);
      document.getElementById('username').value = "";
      document.getElementById('password').removeAttribute('disabled');
      document.getElementById('username').removeAttribute('disabled');
      document.getElementById('login').removeAttribute('disabled');
      document.getElementById('logoff').setAttribute('disabled', 'disabled');
      setGlobal({
        message: "Successfully logged off",
        account: "Logged off",
      })
      
    }
  catch(e)
    { 
      await checkAccess();
      alert(e.code+":  Please refer messages on bottom left for more information: ");
      setGlobal({ message: String(e)});
    }
}

var register = async () => {
  var username = document.getElementById('username').value;
  var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var gender = document.getElementById('gender').value;
  var DOB = document.getElementById('birthday').value;
      var year = DOB.slice(0,4);
      var month = DOB.slice(5,7);
      var day = DOB.slice(8,10);
  newID = year + month + day + name.slice(0,2) + surname.slice(0,2);
  try
  {
        var Ahash = await access.getHash(username);
        await identity.AddPerson(newID, name, surname, gender, username, Ahash);
        await upload();
        document.getElementById('ID').value = newID;
        await findID();
        setGlobal({ message: "Successfully registered person with ID:" + newID});
  }

  catch(e)
  { 
    await checkIdentity();
    alert(e.code+":  Please refer messages on bottom left for more information: ");
    setGlobal({ message: String(e)});
  }
}

var upload = async () => {
  try
  { var username = document.getElementById('username').value;
    var file= document.getElementById('img').files;
    var cid = await storage.put(file);
    console.log(`IPFS : https://${cid}.ipfs.dweb.link/photo.jpeg`)
    setGlobal({photo: `https://${cid}.ipfs.dweb.link/photo.jpeg`})
    var Ahash = await access.getHash(username);
    await identity.PhotoUrl(newID, `https://${cid}.ipfs.dweb.link/photo.jpeg`, username, Ahash);
  } 
  catch (error) 
  {
    alert('Error uploading file: '+ error);
    setGlobal({ message: String(error)});
  }  
}

var findID = async() => {
  var username = document.getElementById('username').value;
  var getID = document.getElementById('ID').value;
  try
  {
    if (!username)
      alert("No logged in user");
    else
      {
        var Ahash = await access.getHash(username);
        var person = await identity.callStatic.getPersonInfo(getID, username, Ahash);
        console.log(await person.name);
        setGlobal({ message: "Successfully found person person with ID:" + getID,
                    ID: getID,
                    name:  person.name,
                    surname:  person.surname,
                    gender:  person.gender,
                    status:  person.status,
                    Alive:   String(person.alive),
                    license: await Number(person.license),
                    photo: await person.photo
          });
      }
  }

  catch(e)
  { 
    await checkIdentity();
    alert(e.code+":  Please refer messages on bottom left for more information: ");
    setGlobal({ message: String(e)});
  }
}

var nameChange = async () => {
  var username = document.getElementById('username').value;
  var getID = document.getElementById('ID').value;
  var newName = document.getElementById('nameC').value;

  try
    {
      var Ahash = await access.getHash(username);
      await identity.nameChange(getID, newName, username, Ahash);
      await findID();
      setGlobal({ message: "Successfully changed name of person with ID:" + getID + "\n       New name: " + newName});
    }

   catch(e)
    { 
      await checkIdentity();
      alert(e.code+":  Please refer messages on bottom left for more information: ");
      setGlobal({ message: String(e)});
    }
}

var surnameChange = async () => {
  var username = document.getElementById('username').value;
  var getID = document.getElementById('ID').value;
  var newSurname = document.getElementById('surnameC').value;

  try
    {
      var Ahash = await access.getHash(username);
      await identity.surnameChange(getID, newSurname, username, Ahash);
      await findID();
      setGlobal({ message: "Successfully changed surname of person with ID:" + getID + "\n        New surname: " + newSurname});
    }

   catch(e)
    { 
      await checkIdentity();
      alert(e.code+":  Please refer messages on bottom left for more information: ");
      setGlobal({ message: String(e)});
    }
}

var marry = async() => {
  var username = document.getElementById('username').value;
  var getID = document.getElementById('ID').value;
  try
    {
      var Ahash = await access.getHash(username);
      await identity.Marry(getID, username, Ahash);
      await findID();
      setGlobal({ message: "Successfully recorded marrige of person with ID:" + getID});
    }

    catch(e)
    { 
      await checkIdentity();
      alert(e.code+":  Please refer messages on bottom left for more information: ");
      setGlobal({ message: String(e)});
    }
}

var divorce = async () => {
  var username = document.getElementById('username').value;
  var getID = document.getElementById('ID').value;
  try
    {
      var Ahash = await access.getHash(username);
      await identity.Divorce(getID, username, Ahash);
      await findID();
      setGlobal({ message: "Successfully recorded divorce of person with ID:" + getID});
    }

    catch(e)
    { 
      await checkIdentity();
      alert(e.code+":  Please refer messages on bottom left for more information: ");
      setGlobal({ message: String(e)});
    }
}

var widow = async () => {
  var username = document.getElementById('username').value;
  var getID = document.getElementById('ID').value;
  try
    {
      var Ahash = await access.getHash(username);
      await identity.Widow(getID, username, Ahash);
      await findID();
      setGlobal({ message: "Successfully recorded widow of person with ID:" + getID});
    }

    catch(e)
    { 
      await checkIdentity();
      alert(e.code+":  Please refer messages on bottom left for more information: ");
      setGlobal({ message: String(e)});
    }
}
// Contracts Status
var checkAccess = async () => {
  try
    {
      return await access.isAlive();
    }

  catch(e)
    {
      console.log(e);
      setGlobal({
        account: "Cant_Access_Network",
        isAliveAccess: false,
      });
      return false;
    }
}
var checkIdentity = async () => {
  try
    {
      return await identity.isAlive();
    }

  catch(e)
    {
      setGlobal({
        isAliveIdentity: false,
      });
      return false;
    }
}

export default App;