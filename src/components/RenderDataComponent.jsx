import React, { useContext, useEffect, useState } from 'react'
import "../assets/render-data-component.css";
import scrollButton from "../assets/scroll-top.png";
import add from "../assets/heart.png"
import added from "../assets/heart-full.png";
import ContextFavorite from '../context/ContextFavorite';
import { HoverMessage } from './HoverMessage';
import { useLocation, useNavigate } from 'react-router-dom';


export const RenderDataComponent = ({data}) => {
    
    const nav = useNavigate();
    const path = useLocation().pathname;
    //estado para controlar si el resultado de busqueda esta ya en las favoritas 
    const {saved,setSaved,setData} = useContext(ContextFavorite);
    // estado para controlar el boton de Scroll-Top
    const [showScrollButton, setShowScrollButton] = useState(false);
    //constante qeu controla si se mostranran los detalles del artista o no en el modo mobile
    const [showDetails, setShowDetails] = useState(false);    
    //estado par ael mensaje al hacer hover sobre el boton fav
    const [message, setMessage] = useState(false);
    //
    const {id,art,lyric} = data;   

    
    /* VARIAS FUNCIONALIDADES */
    const handleClickImg = ()=>{        
        //para enviar los datos a guardar en el store al CONTEXT 
        setData(data);

        //validacion para saber si se redicciona al eliminar el elemento de my-list(cuando se elimine desde my-list) 
        path.includes("/my-list/") && nav("/my-list");
                
        //funcion para mostrar el mensaje en el boton de añadir a la lista de favoritos
        if(saved){
            setMessage("removed from my-list");
        }else{
            setMessage("added to my-list");
        };

        setTimeout(() => {
            setMessage(false);
        }, 2000);
    };
    
    /* EFFECT PARA SABER SI EL ELEMENTO ESTA EN MY-LIST */
    useEffect(() => {                  
        localStorage.getItem("favorite-list") && JSON.parse(localStorage.getItem("favorite-list")).find(e=>e.id===id) ?setSaved(true) :setSaved(false);
    }, [data]);

    // funcion para link externos de las paginas de los artistas
    const redirect = (url)=>{
      window.location.href = `https://${url}`;
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
        <section className="render_data_component">                  
            {message && <HoverMessage message={message} classname={"message-mobile"}/>}
            <img onClick={handleClickImg} src={saved ?added :add} alt="fav" />
            <article className="data-artist">
                <h2 className="subtitle">{art.strArtist}</h2>
                <img src={art.strArtistFanart ?art.strArtistFanart :art.strArtistFanart2} alt={art.strArtist} />
                <button onClick={()=>setShowDetails(!showDetails)}>{showDetails?"hide details" :"show more details"}</button>   
                {showDetails && 
                    <section className="data_artist-details">
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
                        <p><span>bio: </span>{art.strBiographyEN}</p>                        
                    </section>
                }
            </article>
            <article className="data-song">
                <h2 className="subtitle">{data.song}</h2>
                <p>{lyric}</p>                
            </article>
            {showScrollButton && <img onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="scroll-button" src={scrollButton} alt="scroll-button" />}
        </section>
    )
}
