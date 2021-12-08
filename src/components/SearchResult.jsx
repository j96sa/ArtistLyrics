import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
//import { fetchRequest } from '../helpers/fetchRequest';
import { Header } from './Header';
import "../assets/searchresult.css";
import ModesContext from '../context/modesContext';
import { RenderDataComponent } from './RenderDataComponent';
import loader from "../assets/tail-spin.svg";


export const SearchResult = () => {
    //context que controla el estado de los modos dark & light
    const {lightMode} = useContext(ModesContext);
    //variables para guardar los datos retornados de la API
    //const [art, setArt] = useState(undefined);
    //const [sng, setSng] = useState(undefined);
    const [apiResponse, setApiResponse] = useState(null);
    //variable que guarda los valores a buscar en la API
    let {artist,song} = useParams();    


    /* EFFECTO PARA OBTENER LOS DATOS DE LA BUSQUEDA */
    useEffect(() => {
        let audioDB = fetch(`https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`).then(res=>res.json());
        let lyricDB = fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`).then(res=>res.json());
        const getData = async()=>{
            let res = await Promise.all([audioDB,lyricDB]);            
            let art = res[0].artists[0];
            let lyric = res[1].lyrics;
            let id = art.idArtist+(artist+song).toLowerCase();            
            setApiResponse({id,art,lyric});            
        };
        getData();
    }, [artist,song]);
    
    return (
        <div className={lightMode ?"search-result light-mode" :"search-result"}>
            <Header/>            
            {apiResponse             
            ?<RenderDataComponent data={apiResponse}/>
            :(
                <section className="loader-section">
                    <img src={loader} alt="loader"/>
                </section>
            )}
        </div>
    )
}
