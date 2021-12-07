import React, { useEffect } from 'react'
import { Header } from './Header'
import "../assets/my-list.css";

export const MyLIst = ({setCurrentComponent,currentComponent}) => {
    useEffect(() => {
        //modificar el link
        setCurrentComponent("my-list");
    }, [setCurrentComponent])

    return (
        <div className="my-list">
            <Header currentComponent={currentComponent}/>
            <h2>MY LIST</h2>
        </div>
    )
}
