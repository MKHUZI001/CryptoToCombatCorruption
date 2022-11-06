import font from './style.module.css';
function Login(props)
{ 
    //onChange={handleChangePassword}
    return(
    <div>
      <h1>Accessor</h1>
      <p1>Please credentials to login the system <br></br></p1>
      <br></br>
      <label className= {font.l1} for ='username'>UserName: </label>
      <input className={font.in}  type="text" id ='username' name = 'username'></input>
      <br></br>
      <label className= {font.l1} for = 'password'><br></br>Password: </label>
      <input className= {font.in}  type="password" id ='password' name = 'password'></input>
      <br></br>
      <button onClick={props.login()} className={font.button} id="login" type="button">Login</button>
      <button onClick={props.logoff()} className= {font.button2} id="logoff" type="button">LogOut</button>
      </div>
    )
}

export default Login;