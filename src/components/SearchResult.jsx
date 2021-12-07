import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchRequest } from '../helpers/fetchRequest';
import { Header } from './Header';
import "../assets/searchresult.css";


export const SearchResult = () => {
    //variables para guardar los datos retornados de la API
    const [art, setArt] = useState(undefined);
    const [sng, setSng] = useState(undefined);
    //variable que guarda los valores a buscar en la API
    let {artist,song} = useParams();

    /* EFFECTO PARA OBTENER LOS DATOS DE LA BUSQUEDA */
    useEffect(() => {
        const getArtistData = async ()=>{
            let res = await fetchRequest(`https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`);
            setArt(res.artists[0]);
        };
        const getSongData = async ()=>{
            let res = await fetchRequest(`https://api.lyrics.ovh/v1/${artist}/${song}`);
            setSng(res.lyrics);
        };
        getArtistData();
        getSongData();
    },[artist,song]);

    return (
        <div>
            <Header/>
            <h2>SEARCH RESULT</h2>
            {(art && sng) && console.log(art,sng)}
        </div>
    )
}
