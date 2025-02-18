import React from "react";
import { Link } from "react-router-dom";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { ImFacebook2 } from "react-icons/im";
import { TfiYoutube } from "react-icons/tfi";
import { FaSquareInstagram } from "react-icons/fa6";
import logoImg from "../assets/logo.jpg";



const Footer = () => {
  return (
    <div>
      <footer className="section has-background-black ">
        <div className="container">
          <div
            className="columns is-multiline"
            
          >
            <div className="column is-3 mb-5 ">
              <Link className="mb-4 is-inline-block">
                <img className="image is-128x128 " src={logoImg} alt="Logo" />
              </Link>
              <p className="hLinks-text-grey-dLinkrk mb-6">
                Celeb Media Pvt. Ltd. is your go-to platform for impactful brand promotion through celebrity endorsements. We connect brands with top influencers, creating memorable campaigns that engage audiences and boost visibility. Elevate your brand with Celewish and let the stars tell your story!
              </p>
              <div>
                <Link className="mr-3 is-inline-block" to="#">
                  
                </Link>
                <Link className="mr-3 is-inline-block is-size-2" to="#">
                  <TbBrandLinkedinFilled/>
                </Link>
                <Link className="mr-3 is-inline-block is-size-3" to="#">
                  <ImFacebook2/>
                </Link>
                <Link className="mr-3 is-inline-block is-size-3" to="#">
                 <TfiYoutube/>
                </Link>
                <Link className="is-inline-block is-size-3" to="#">
                  <FaSquareInstagram/>
                </Link>
              </div>
            </div>
            <div className="column is-9">
              <div className="columns is-multiline">
                <div className="column is-6 is-3-desktop mb-5">
                  <h4 className="is-size-4 hLinks-text-weight-bold mb-4">
                    Company
                  </h4>
                  <ul>
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        Home
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        About Celeb
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link className="button is-black" href="#">
                       Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="column is-6 is-3-desktop mb-5">
                  <h4 className="is-size-4 hLinks-text-weight-bold mb-4">Pages</h4>
                  <ul>
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        Login
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        Register
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        add list
                      </Link>
                    </li>
                    <li>
                      <Link className="button is-black" href="#">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="column is-6 is-3-desktop mb-5">
                  <h4 className="is-size-4 hLinks-text-weight-bold mb-4">Legal</h4>
                  <ul>
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        Disclaimer
                      </Link>
                    </li>
                    
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        Refund And Cancellation
                      </Link>
                    </li>
                    <li>
                      <Link className="button is-black" href="#">
                        Terms Of Use
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="column is-6 is-3-desktop mb-5">
                  <h4 className="is-size-4 hLinks-text-weight-bold mb-4">
                    Resources
                  </h4>
                  <ul>
                   
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        Service
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link className="button is-black" href="#">
                        Product
                      </Link>
                    </li>
                    <li>
                      <Link className="button is-black" href="#">
                        Pricing
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5 hLinks-text-centered">
            <p>Linkll rights reserved © WirefrLinkmes CorporLinktion 2021</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
