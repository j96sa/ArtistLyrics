import React from 'react'

export const HoverMessage = ({classname,message}) => {
    return (
        <span className={classname}>
            <p>{message}</p>
        </span>
    );
};
