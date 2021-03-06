import React, { useContext, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom';
import ContextResize from '../context/ContextResize'
import { RenderDataComponent } from './RenderDataComponent';
import { RenderDataComponentDesktop } from './RenderDataComponentDesktop';


export const MyListRender = () => {
    //
    const {id} = useParams();
    //context
    const {onDesktop,width,resize} = useContext(ContextResize);
    //
    const element = JSON.parse(localStorage.getItem("favorite-list")).find(e=>e.id===id);        

    useLayoutEffect(() => {
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
