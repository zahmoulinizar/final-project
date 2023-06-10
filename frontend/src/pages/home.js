import React from "react";
import { useSelector } from "react-redux";


function Home() {
  const name = useSelector((state) => state.auth.user?.userName);

  return (
    <div className="border-3 mt-5 pt-5">
      
          <h2>Welcome to the home page {name}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          </p>
      
    </div>
  );
}

export default Home;
