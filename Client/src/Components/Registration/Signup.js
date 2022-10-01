import React, { useState } from "react";
import { createUser } from "../../Api/userApi";
import { NavLink } from "react-router-dom";
//import { Link, useNavigate } from "react-router-dom";
import "./css/loginsignup.css";
const Signup= () => {
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const Create = async (e) => {
    e.preventDefault();
    const res = await createUser(user);
    console.log(res);
    if (res.status === 200) {
      setIsMessage(true);
      setMessage(res.message);
    } else {
      window.alert(res);
    }
  };
 

  return (
    <>
      <div className="container">
        <div className="loginsignup">
          <div className="row">
            <div className="col-md-5">
              <div className="signup">
                <div className="login-head">Signup</div>
                <form className="from" method="POST">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="form-control"
                      value={user.fullName}
                      onChange={handleInputs}
                      name="fullName"
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      value={user.email}
                      onChange={handleInputs}
                      name="email"
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      value={user.password}
                      onChange={handleInputs}
                      name="password"
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={user.repeat_password}
                      onChange={handleInputs}
                      name="repeat_password"
                    ></input>
                  </div>
                  <div className='form-group'>
                        <p className='already'>Already Registered ? <NavLink to='/login' className="login">Login</NavLink></p>   
                  </div>  
                  {isMessage ? 
                  <div className='form-group'>
                        <p className='error-msg'>{message}</p>   
                  </div> : ''} 
                  <div className="form-group signupbtn">
                    <input
                      type="submit"
                      className="btn btn-primary form-control"
                      value="Signup"
                      onClick={Create}
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
