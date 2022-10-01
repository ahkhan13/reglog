import React, { useState } from "react";
import { loginUser } from "../../Api/userApi";
//import Home from "../Home/Home"
import { NavLink, useNavigate } from "react-router-dom";
import "./css/loginsignup.css";
const Login = ()=>{
    let navigate = useNavigate();
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState();
    const [user, setLoginUser] = useState({
        email: "",
        password: "",
      });
    let name , value;
    const handleLoginData = (e) => {
        name = e.target.name;
        value = e.target.value;
        setLoginUser({ ...user, [name]: value });
      };
      
     const Login = async (e) => {
        e.preventDefault();
        const res = await loginUser(user);
        if (res.status === 200) {
            navigate("/");
        } else if(res.status === 400){
          setIsMessage(true);
          setMessage(res.message);
          //window.alert(res.message);
        }else{
          //window.alert(res);
        }
      };
return (
<>
<div className="container">
<div className="loginsignup">
  <div className="row">
<div className="col-md-5">
              <div className="signup">
                <div className="login-head">Login</div>
                <form className="from" method="POST">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control"
                      name="email"
                      value={loginUser.email}
                      onChange={handleLoginData}
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      name="password"
                      value={loginUser.password}
                      onChange={handleLoginData}
                    ></input>
                  </div>
                  <div className='form-group'>
                        <p className='already'>Not have a account ? <NavLink to='/signup' className="login">Signup</NavLink></p>   
                  </div>  
                  {isMessage ? 
                  <div className='form-group'>
                        <p className='error-msg'>{message}</p>   
                  </div> : ''} 
                  <div className="form-group loginbtn">
                    <input
                      type="submit"
                      className="btn btn-primary form-control"
                      value="Login"
                      onClick={Login}
                    ></input>
                  </div>
                </form>
         </div>
</div>
</div>
</div>
</div>
</>
)
}

export default Login;