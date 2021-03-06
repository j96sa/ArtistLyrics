import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Header } from './Header';
import "../assets/searchresult.css";
import ModesContext from '../context/modesContext';
import { RenderDataComponent } from './RenderDataComponent';
import loader from "../assets/tail-spin.svg";
import ContextResize from '../context/ContextResize';
import { RenderDataComponentDesktop } from './RenderDataComponentDesktop';
import { ErrorResult } from './ErrorResult';


export const SearchResult = () => {
    //context que controla el estado de los modos dark & light
    const {lightMode,setLightMode} = useContext(ModesContext);
    //variables para guardar los datos retornados de la API como un objeto    
    const [apiResponse, setApiResponse] = useState(null);
    //variable que guarda los valores a buscar en la API
    let {artist,song} = useParams();    
    //context para controlar el modo en que se encuetra la apliacion
    let {onDesktop,resize,width} = useContext(ContextResize);

    /* EFFECTO PARA CARGAR EL ULTIMO MODO GUARDADO EN EL localstorage */
    useEffect(() => {
        setLightMode(JSON.parse(localStorage.getItem("artistlyricstheme")));
    }, []);

    /* EFFECT PARA CONTROLAR EN QUE TIPO DE DISPOSITIVO SE ENCUENTRA */
    useLayoutEffect(() => {
        window.addEventListener("resize",resize);
        return()=>window.removeEventListener("resize",resize);   
    });
    useEffect(() => {
        width();
    },[width]);


    /* EFFECTO PARA OBTENER LOS DATOS DE LA BUSQUEDA */
    useEffect(() => {
        const audioDB = fetch(`https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`).then(res=>res.json()),
        lyricDB = fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`).then(res=>res.json());
        const getData = async()=>{
            const res = await Promise.all([audioDB,lyricDB]),
            art = res[0].artists ?res[0].artists[0] :res[0].artists,
            lyric = res[1].lyrics ?res[1].lyrics :null,
            id = (art && lyric) ?art.idArtist+(artist+song).toLowerCase() :null;
            setApiResponse({id,art,lyric,song});
        };
        getData();
    }, [artist,song]);
    
    return (        
        <div className={lightMode ?"search-result light-mode" :"search-result"}>            
            <Header/>                        
            {apiResponse             
            ?(
                (apiResponse.id) 
                ?(onDesktop ?<RenderDataComponentDesktop data={apiResponse}/> :<RenderDataComponent data={apiResponse}/>)
                :<ErrorResult/>
            )
            
            :(
                <section className="loader-section">
                    <img src={loader} alt="loader"/>
                </section>
            )}            
        </div>
    )
}
