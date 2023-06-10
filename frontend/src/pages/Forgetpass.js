import React from "react";
import { Link } from "react-router-dom";

function Forgetpass() {
  return (
    <div>
      <div className="container">
        <i className="i1"></i>
        <i className="i2"></i>
        <i className="i3"></i>
        <div className="login">
          <h2>login</h2>
          <div className="inputBx">
            <input type="password" placeholder="new-password" />
          </div>
          <div className="inputBx">
            <input type="password" placeholder="confirm-password" />
          </div>

          <div className="inputBx">
            <Link to="/login">
              <input type="submit" placeholder="confirmed" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgetpass;
