import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ModesContext from "../context/modesContext";

export const Header = ({ off,currentComponent }) => {  
  //context que controla el estado de los modos dark & light
  const {setLightMode,lightMode} = useContext(ModesContext);
  
  const themeHandler = ()=>{
    localStorage.setItem("artistlyricstheme",JSON.stringify(!lightMode));
    setLightMode(!lightMode)
  };

  return (
    <header className={lightMode ?"header light-mode" :"header"}>
      <section className="header-links">
        <Link className={currentComponent==="home" ?"active-component" :""} to="/">Home</Link>
        <Link className={currentComponent==="my-list" ?"active-component" :""} to="/my-list">My List</Link>
      </section>

      {!off && (
        <section className="mode_button-section">
          <section className="mode-button">
            <figure onClick={themeHandler}></figure>
          </section>
        </section>
      )}
    </header>
  );
};
