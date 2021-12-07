import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ off,currentComponent }) => {  

  return (
    <header className="header">
      <section className="header-links">
        <Link className={currentComponent==="home" ?"active-component" :""} to="/">Home</Link>
        <Link className={currentComponent==="my-list" ?"active-component" :""} to="/my-list">My List</Link>
      </section>

      {!off && (
        <section className="mode_button-section">
          <section className="mode-button">
            <figure className=""></figure>
          </section>
        </section>
      )}
    </header>
  );
};
