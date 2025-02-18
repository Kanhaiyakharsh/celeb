import React from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { HiMiniBars3CenterLeft, HiOutlineUser } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div>
      <header>
      <nav className="navbar is-flex is-justify-content-space-between is-align-items-center px-6 py-3 has-text-black mt-2 has-background-black">
        {/* {left side} */}
        <div className="is-flex is-align-items-center is-gap-3">
          <Link to="/">
            <HiMiniBars3CenterLeft className="is-size-3" />
          </Link>

          <div className=" is-flex search-container ">
            <span className="icon is-size-5  ">
              <IoSearchOutline className="has-position-absolute left-3" />
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
          <Link className="column has-text-white" to="/">About</Link>
          <Link className="column has-text-white" to="/">Campaign</Link>
          <Link className="column has-text-white" to="/">Help</Link>

        </div>

        

        {/* {right side} */}
        <div >
          
      
          <Link to="/login"> <HiOutlineUser className="is-size-3 has-background-white  has-text-black " /></Link>

        </div>
        
      </nav>
    </header>
    </div>
  );
};

export default Navbar;
