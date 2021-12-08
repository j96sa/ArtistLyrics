import React, { useState } from 'react'
import { useParams } from 'react-router';
import "../assets/render-data-component.css";
import add from "../assets/heart.png"
import added from "../assets/heart-full.png";


export const RenderDataComponent = ({data}) => {
    const redirect = (url)=>{
      window.location.href = `https://${url}`;
    };

    const {id,art,lyric} = data;
    //constante qeu controla si se mostranran los detalles del artista o no en el modo mobile
    const [showDetails, setShowDetails] = useState(false);
    //para obtener el nombre de la cancion
    let {song} = useParams();

    console.log(data);
    return (
        <section className="render_data_component">
            <img src={add} alt="fav" />
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
                <h2 className="subtitle">{song}</h2>
                <p>{lyric}</p>                
            </article>
        </section>
    )
}
