import React from "react";
import "./Signup.css";
import logo from "../assets/logo.png"; // Make sure the path is correct

const Signup: React.FC = () => {
  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="BuZzNet Logo" className="logo" />
        <span className="logo-text">BuZzNet</span>
      </div>
      <div className="signup-container">
        <div className="signup-right">
          <div className="form-container">
            <h2 className="signup-title">Sign up to BuZzNet</h2>
            <p className="signup-subtitle">Join the Buzz, Share the Moment</p>
            <form>
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" placeholder="John" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="johndoe@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="********" />
              </div>
              <div className="form-group terms">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I agree to the <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a>.
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="submit-button">
                  Create an Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="login-container">
        <button className="login-button">Log In</button>
      </div>
    </>
  );
};

export default Signup;
