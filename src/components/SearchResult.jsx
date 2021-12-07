import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchRequest } from '../helpers/fetchRequest';
import { Header } from './Header';
import "../assets/searchresult.css";
import ModesContext from '../context/modesContext';


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
    /* useEffect(() => {
        const getArtistData = async ()=>{
            let res = await fetchRequest(`https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`);
            //setArt(res.artists[0]);
            setApiResponse({...apiResponse,artist:res.artists[0]});
        };
        getArtistData();
    },[artist]);
    
    useEffect(() => {
        const getSongData = async ()=>{
            let res = await fetchRequest(`https://api.lyrics.ovh/v1/${artist}/${song}`);
            //setSng(res.lyrics);
            apiResponse.artist!=="" &&  setApiResponse({...apiResponse,song:res.lyrics});
        };
        getSongData();
        //apiResponse && setApiResponse({...apiResponse,id:apiResponse.artist.idArtist});        
    }, [song]); */

    
    /* EFFECTO PARA OBTENER LOS DATOS DE LA BUSQUEDA */
    useEffect(() => {
        let audioDB = fetch(`https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`).then(res=>res.json());
        let lyricDB = fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`).then(res=>res.json());
        const getData = async()=>{
            let res = await Promise.all([audioDB,lyricDB]);            
            let artist = res[0].artists[0];
            let song = res[1].lyrics;
            let id = artist.idArtist+song.slice(22,45);
            setApiResponse({id,artist,song});
        };
        getData();
    }, [artist,song]);
    
    return (
        <div className={lightMode ?"search-result light-mode" :"search-result"}>
            <Header/>
            <h2>SEARCH RESULT</h2>
            {console.log(apiResponse)}
            {/* {(art && sng) && console.log(art,sng)} */}
        </div>
    )
}
