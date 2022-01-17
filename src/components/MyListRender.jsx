import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ContextResize from '../context/ContextResize'
import { RenderDataComponent } from './RenderDataComponent';
import { RenderDataComponentDesktop } from './RenderDataComponentDesktop';


export const MyListRender = () => {
    const {onDesktop,width,resize} = useContext(ContextResize);
    const {id} = useParams();
    const element = JSON.parse(localStorage.getItem("favorite-list")).find(e=>e.id===id);    

    useEffect(() => {
        width();
        window.addEventListener("resize",resize);
        return()=>{window.removeEventListener("resize",resize)};
    },[]);

    return (
        <>          
        {onDesktop ?<RenderDataComponentDesktop data={element} /> :<RenderDataComponent data={element} />}
        </>
    )
}
