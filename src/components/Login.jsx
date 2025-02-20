import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <section className="hero is-medium is-black has-text-black">
        <div className="hero-body">
          <div className="container" style={{ width: "60vh" }}>
            <div className="has-background-white px-6 py-6 ">
              <h1 className="is-size-3 pb-5 has-text-weight-medium is-family-sans-serif">
                Login
              </h1>
              <div className="field">
                <label className="label has-text-black">Email</label>
                <div class="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your Email"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-black">Password</label>
                <div className="control">
                  <input className="input" type="password" placeholder="Password" />
                </div>
              </div>

              <div>
                <div className="field">
                  <div className="control is-flex is-justify-content-space-between">
                    <label className="checkbox">
                      <input type="checkbox" /> Remember Me
                    </label>
                    <label className="has-text-black">Forgot password</label>
                  </div>
                </div>
              </div>

              <button className="has-background-warning mt-5 px-5 py-2">
                Submit
              </button>

              <p className="my-3">Dont't have an account? <span onClick={() => navigate('/register')} className="has-text-danger is-clickable">Register</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
