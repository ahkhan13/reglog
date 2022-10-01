import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getUserById, logoutUser } from "../../Api/userApi";
import "./css/home.css";
const Home = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState([]);
    const getUserDetails = async()=>{
      const res = await getUserById();
      if(res.status===200){
        setUser(res.data);
      }else  if (res.status === 401 && res.message === "UnauthorisedUser") {
        navigate("/login");
      }else{
        navigate("/login");
      }
    }

 useEffect(() => {
    getUserDetails();
 }, []);

 const Logout = async(e)=>{
   e.preventDefault();
    await logoutUser();
    navigate("/login");
 }
  return (
    <>
     <div className="home">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand ml-4" href="/">
          {user.fullName}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr">
            <li className="nav-item active">
              <a className="nav-link" href="/profile">
                Edit Profile<span className="sr-only">(current)</span>
              </a>
              </li>
             <li className="nav-item ">
              <a className="nav-link" href='/' onClick={Logout}>
                Logout<span className="sr-only">(current)</span>
              </a>
            
            </li>
          </ul>
        </div>
      </nav>
   

   </div>
    </>
  );
};

export default Home;
