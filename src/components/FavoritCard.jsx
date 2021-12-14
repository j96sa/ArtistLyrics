import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import added from "../assets/heart-full.png";
import ContextFavorite from '../context/ContextFavorite';
import { HoverMessage } from './HoverMessage';

export const FavoritCard = ({e}) => {
    const [message, setMessage] = useState(false);        
    const {id,art,song} = e;
    //context 
    const {setData} = useContext(ContextFavorite);
    //PARA REDIRECCIONAR AL ELEMENTO
    const nav = useNavigate();

    const handleRemoveElement = (event)=>{        
        event.stopPropagation();
        //event.nativeEvent.stopImmediatePropagation();
        setData(e);
    };

    return (
        <div onClick={()=>nav(`/my-list/${id}`)} className='card'>
            <article>
                <p>{art.strArtist}</p>
                <p>{song}</p>
            </article>
            {message && <HoverMessage message={message} classname={"remove_message"}/>}            
            <img onMouseLeave={()=>setMessage(false)} onMouseEnter={()=>setMessage("remove")} onClick={handleRemoveElement} src={added} alt="fav" />
        </div>
    )
}
