import React from "react";
import "./Styles/MainPage.css"; 

const MainPage = () => {
  return (
    <div className="main-page-container">
      <h1 className="welcome-heading">
        Welcome to <span className="handmade-haven">Handmade Haven</span>
      </h1>
      <p className="description">
        Celebrating the artistry of handmade crafts and creativity.
      </p>
    </div>
  );
};

export default MainPage;
