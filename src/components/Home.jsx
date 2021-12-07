import React, { useEffect,useState } from "react";
import { Header } from "./Header";
import "../assets/home.css";
//imagenes para cambiar en el home
import imgMusic0 from "../assets/music0.png";
import imgMusic1 from "../assets/music1.png";
import imgMusic2 from "../assets/music2.png";
import imgMusic3 from "../assets/music3.png";
import imgMusic4 from "../assets/music4.png";
import imgMusic5 from "../assets/music5.png";
import imgMusic6 from "../assets/music6.png";

export const Home = ({setCurrentComponent,currentComponent}) => {
  //estado para validar si mostrar el contenido del modo Desktop;
  const [onDesktop, setOnDesktop] = useState(false);  
  //estados para modificar las imagenes del home  
  const [index, setIndex] = useState(0);  
  //array de imagenes del Home
  const imgArr = [imgMusic0,imgMusic1,imgMusic2,imgMusic3,imgMusic4,imgMusic5,imgMusic6];    
  
  /* FUNCION PARA CAMBIAR LAS IMAGENES DEL HOME */
  useEffect(() => {
    let switchInterval = setInterval(()=>{
      index<imgArr.length-1
      ?setIndex(index + 1)
      :setIndex(0);
    },5000); 
    return()=>clearInterval(switchInterval);
  });
  

  /* FUNCION PARA MODIFICAR EL CONTENIDO DEL HOME EN DEPENDENCIA DEL MODO EN EL QUE SE ENCUENTRE */
  useEffect(() => {
    const responsiveDesignSize = ()=>{
      let {clientWidth}= document.documentElement;
      clientWidth > 1200 ?setOnDesktop(true) :setOnDesktop(false);
    };
    window.addEventListener("resize",responsiveDesignSize);
    return ()=>window.removeEventListener("resize",responsiveDesignSize);
  });
  /* FUNCION PARA MODIFICAR EL CONTENIDO DEL HOME EN DEPENDENCIA DEL MODO EN EL QUE SE ENCUENTRE */
  useEffect(() => {
    let width = document.documentElement.clientWidth;
    width > 1200 ?setOnDesktop(true) :setOnDesktop(false);
    //modificar el link
    setCurrentComponent("home");
  }, [setCurrentComponent]);



  return (
    <div className="home">      
      {/* paso la propiedad off al componente header para remover el boton de los modos dark & light porque en el home no me sirve */}
      <Header off={true} currentComponent={currentComponent}/>
      <div className="home-content">        

        <section className="home-main">
          <article className="home-intro">
            <p>
              Welcome to ArtistLyrics, feel free to search for information about any
              artist you want, as well as the lyrics of any of their songs. Good
              vibes.
            </p>            
          </article>

          <form className="home-form">        
            <input type="text" name="artist" placeholder="artist...?" />
            <input type="text" name="song" placeholder="song...?" />          
            <input type="submit" value="search"/>
          </form>          
        </section>

        {
          onDesktop &&
          <section className="home-img">          
            <img src={imgArr[index]} alt="img" />
          </section>
        }        
      </div>
    </div>
  );
};
