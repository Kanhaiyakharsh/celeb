import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { HiMiniBars3CenterLeft, HiOutlineUser } from "react-icons/hi2";
import logoImg from "../assets/logo.jpg";




const navigation= [
  {name: "Home", path: "/"},
  {name: "About", path: "/"},
  {name: "Campaign", path: "/"},
  {name: "Help", path: "/"},
  {name: "Login", path: "/login"},

]

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  return (
    <div>
      <header>
      <nav className="navbar is-flex is-justify-content-space-between is-align-items-center px-6 py-3 has-text-black mt-2 has-background-black">
        {/* {left side} */}
        <div className="is-flex is-align-items-center is-gap-3">
          <Link to="/">
            {/* <HiMiniBars3CenterLeft className="is-size-3" /> */}
            <img className="image is-128x128 " src={logoImg} alt="Logo" style={{ width: "60px", height: "60px" }}/>
          </Link>

          <div className=" is-flex is-align-items-center ">
            <span className="  ">
              <IoSearchOutline className="has-position-absolute left-3  is-size-4 has-text-white"  />
            </span>
            <input
              type="text"
              placeholder="Search here"
              className="input custom-input"
            />
          </div> 
         </div>

        {/* {center} */}
        <div className="columns is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd is-hidden-mobile  ">
          <Link className="column has-text-white" to="/">Home</Link>
          <Link className="column has-text-white" to="/about">About</Link>
          <Link className="column has-text-white" to="/campaign">Campaign</Link>
          <Link className="column has-text-white" to="/contact">Contact</Link>

        </div>

        

        {/* {right side} */}
        <div  className="is-flex is-align-items-center is-gap-3 has-text-white">
          
      
          <Link to="/login"> <HiOutlineUser className="is-size-3 has-background-white px-1 py-1 has-text-black is-hidden-mobile " style={{borderRadius: "100%" }}  /></Link>

          <div >
            
              <button className="is-hidden-tablet" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <HiMiniBars3CenterLeft className="is-size-3" />
              </button>

              {/* {show dropdown} */}
              {
                isDropdownOpen && (
                  <div className="">  
                    <ul className="is-flex is-flex-direction-column is-align-items-start  is-justify-content-center has-background-white">
                      {
                        navigation.map((item) => (
                          <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                            <Link to={item.href} >{item.name}</Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )

              }
            
          </div>

        </div>
        
      </nav>
    </header>
    </div>
  );
};

export default Navbar;
