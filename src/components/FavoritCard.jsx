import React, { useContext } from 'react'
import added from "../assets/heart-full.png";
import ContextFavorite from '../context/ContextFavorite';

export const FavoritCard = ({e}) => {
    const {id,art,song} = e;
    //context 
    const {setData} = useContext(ContextFavorite);

    return (
        <div className='card'>
            {/* <article>
                <p>{art.strArtist}</p>
                <p>{song}</p>
            </article>
            <img onClick={setData} src={added} alt="fav" /> */}
            {console.log(e)}            
            {e && (
                <>
                <article>
                <p>{art.strArtist}</p>
                <p>{song}</p>
                </article>
                <img onClick={()=>setData(e)} src={added} alt="fav" />
                </>
            )}            
        </div>
    )
}
