import React from 'react'
import { useParams } from 'react-router'
import error from "../assets/404.svg";

export const ErrorResult = () => {
    const {artist,song} = useParams();
    return (
        <div className="error-result">
            <p>Sorry, no matches were found for the song "<span>{song.toLowerCase()}</span>" by artist <span>{artist.toLowerCase()}</span>.</p>
            <img src={error} alt="error"/>
        </div>
    )
}
