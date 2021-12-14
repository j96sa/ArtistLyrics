import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import added from "../assets/heart-full.png";
import ContextFavorite from '../context/ContextFavorite';
import { HoverMessage } from './HoverMessage';

export const FavoritCard = ({e}) => {
    const [message, setMessage] = useState(false);        
    const {id,art,song} = e;
    //context 
    const {setData} = useContext(ContextFavorite);
    
    return (
        <>
        <Link to={`/my-list/${id}`}>
        <div className='card'>
            <article>
                <p>{art.strArtist}</p>
                <p>{song}</p>
            </article>
            {message && <HoverMessage message={message} classname={"remove_message"}/>}            
            <img onMouseLeave={()=>setMessage(false)} onMouseEnter={()=>setMessage("remove")} onClick={()=>setData(e)} src={added} alt="fav" />
        </div>
        </Link>
        </>
    )
}
