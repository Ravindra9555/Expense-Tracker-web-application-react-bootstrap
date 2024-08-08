import React from "react";
import Navbar from "./BasicComponents/Navbar";
import Loader from "./BasicComponents/Loader";
import explanding from "../../src/assets/img/explanding.png";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center">
        <div className="row mt-4">
          <div className="col-md-6"  style={{marginTop:"15%"}}>
            <h1 className="text-start">Save money without thinking about it</h1>
            <p className="text-start" style={{width:"80%"}}>Access your expense tracker from your phone, tablet, or computer. 
              Our seamless syncing keeps your data up-to-date no matter where you are.</p>
          </div>
        <div className="col-md-6">
            <img src={explanding} alt="explanding"  className="img-fluid w-100" />
        </div>
        </div>
      </div>
    
    </>
  );
};

export default Landing;
