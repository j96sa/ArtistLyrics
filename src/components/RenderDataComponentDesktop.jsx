import React from 'react';
import { useParams } from 'react-router';
import "../assets/render-data-component-desktop.css";
import add from "../assets/heart.png"
import added from "../assets/heart-full.png";

export const RenderDataComponentDesktop = ({data}) => {
    const redirect = (url)=>{
      window.location.href = `https://${url}`;
    };

    const {id,art,lyric} = data;
    //constante qeu controla si se mostranran los detalles del artista o no en el modo mobile
    //para obtener el nombre de la cancion
    let {song} = useParams();

    console.log(data);
    return (
        <div className="render_data_component-desktop">
            <section className="data_desktop-header">
                <h2>{art.strArtist}</h2>
                <img src={add} alt="fav" />
            </section>
            {art.strArtistBanner && <img src={art.strArtistBanner} alt={art.strArtist} />}
            <section className="data_desktop-content">
                <section className="data_desktop-artist">
                    {art.strArtistFanart ?<img src={art.strArtistFanart} alt="img" /> :<img src={art.strArtistFanart3} alt="img" />}
                    {art.strArtistFanart2 ?<img src={art.strArtistFanart2} alt="img" /> :<img src={art.strArtistFanart4} alt="img" />}
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
                        <h2>{song}</h2>
                        <p>{lyric}</p>
                    </article>
                </section>
                <section className="data_desktop-biography">
                    <h2>Biography</h2>
                    <p>{art.strBiographyEN}</p>
                </section>
            </section>
        </div>
    )
}
