import React, { useContext, useEffect, useState } from 'react';
import scrollButton from "../assets/scroll-top.png";
import "../assets/render-data-component-desktop.css";
import add from "../assets/heart.png"
import added from "../assets/heart-full.png";
import ContextFavorite from '../context/ContextFavorite';
import { HoverMessage } from './HoverMessage';
import { useLocation, useNavigate } from 'react-router-dom';

export const RenderDataComponentDesktop = ({data}) => {
    /* FIXING */

    //console.log(data);
    const nav = useNavigate();
    const path = useLocation().pathname;
    
    path.includes("/my-list/") ?console.log(path) :console.log("null");
    /* FIXING */

    /* FIXING */
    const fixing = ()=>{
        setData(data);        
        path.includes("/my-list/") && nav("/my-list");
    };
    /* FIXING */
    
    //estado para controlar si el resultado de busqueda esta ya en las favoritas 
    const {saved,setSaved,setData} = useContext(ContextFavorite);
    // estado para controlar el boton de Scroll-Top
    const [showScrollButton, setShowScrollButton] = useState(false);
    //estado para el mensaje al hacer hover sobre el boton fav
    const [message, setMessage] = useState(false);
    //
    const {id,art,lyric} = data;

    
    /* EFFECT PARA SABER SI EL ELEMENTO ESTA EN MY-LIST */
    useEffect(() => {                
        localStorage.getItem("favorite-list") && JSON.parse(localStorage.getItem("favorite-list")).find(e=>e.id===id) ?setSaved(true) :setSaved(false);
    }, [data]);

    // funcion para link externos de las paginas de los artistas
    const redirect = (url)=>{
      window.location.href = `https://${url}`;
    };

    //funcion para mostrar el mensaje en el boton de añadir a la lista de favoritos
    const handleMosueEnter = ()=>{
        if(saved){
            setMessage("remove from my-list");
        }else{
            setMessage("add to my-list");
        };
    };    

    /* EFFECT PARA MOSTRAR EL SCROLL-TOP BUTTON */
    useEffect(() => {
        const showScrollTopButton = ()=>{
            let {scrollTop} = document.documentElement;
            scrollTop > 1100 ?setShowScrollButton(true) :setShowScrollButton(false); 
        };
        window.addEventListener("scroll",showScrollTopButton);
        return()=>window.removeEventListener("scroll",showScrollTopButton);
    });

    return (
        <div className="render_data_component-desktop">
            <section className={saved ?"data_desktop-header" :"data_desktop-header"}>
                <h2>{art.strArtist}</h2>
                <img onMouseLeave={()=>setMessage(false)} onMouseEnter={handleMosueEnter} onClick={/* ()=>setData(data) */fixing} src={saved ?added :add} alt="fav" />
                {message && <HoverMessage message={message} classname={"hover-message"}/>}
            </section>
            {art.strArtistBanner && <img src={art.strArtistBanner} alt={art.strArtist} />}
            <section className="data_desktop-content">
                <div className='artist-hero'>
                    <section className="data_desktop-artist">
                        <figure className='artist_img'>
                            {art.strArtistFanart ?<img src={art.strArtistFanart} alt="img" /> :<img src={art.strArtistFanart3} alt="img" />}
                            {art.strArtistFanart2 ?<img src={art.strArtistFanart2} alt="img" /> :<img src={art.strArtistFanart4} alt="img" />}
                        </figure>
                        <section className="data_desktop-details">
                            <p><span>musical style: </span>{art.strGenre} & {art.strStyle}</p>
                            <p><span>country: </span>{art.strCountry}</p>
                            <p><span>born: </span>{art.intBornYear}{art.intDiedYear && "-" + art.intDiedYear}</p>
                            <p><span>gender: </span>{art.strGender}</p>
                            <section className="details-socials">                        
                                <p>socials</p>
                                <section className="socials-links">
                                    {art.strTwitter && <button onClick={()=>redirect(art.strTwitter)}>twiter</button>}
                                    {art.strWebsite && <button onClick={()=>redirect(art.strWebsite)}>website</button>}
                                    {art.strFacebook && <button onClick={()=>redirect(art.strFacebook)}>facebook</button>}
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className="data_desktop-lyric">
                        <article>
                            <h2>{data.song}</h2>
                            <p>{lyric}</p>
                        </article>
                    </section>
                </div>
                <section className="data_desktop-biography">
                    <h2>Biography</h2>
                    <p>{art.strBiographyEN}</p>
                </section>
                {showScrollButton && <img onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="scroll-button" src={scrollButton} alt="scroll-button" />}
            </section>
        </div>
    )
}
