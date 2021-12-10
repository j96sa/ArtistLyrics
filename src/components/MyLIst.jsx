import React, { useContext, useEffect } from 'react'
import { Header } from './Header'
import "../assets/my-list.css";
import ModesContext from '../context/modesContext';
import ContextFavorite from '../context/ContextFavorite';
import { FavoritCard } from './FavoritCard';

export const MyLIst = ({setCurrentComponent,currentComponent}) => {
    //context para controlar el THEMA
    const {lightMode,setLightMode} = useContext(ModesContext);
    //context para la funcionalidad de eliminar & mostrar los elementos fav
    const {list} = useContext(ContextFavorite);

    useEffect(() => {
        //modificar el link
        setCurrentComponent("my-list");
        //para establecer el ultimo modo guardado en el localstorage
        setLightMode(JSON.parse(localStorage.getItem("artistlyricstheme")));
    }, [setCurrentComponent])


    return (
        <div className={lightMode ?"my-list light-mode" :"my-list"}>            
            <Header currentComponent={currentComponent}/>            
            <section className='list-cards'>
                {list.map(e=><FavoritCard key={e.id} e={e}/>)}
            </section>
        </div>
    )
}
