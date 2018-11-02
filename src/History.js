import React, { Component } from 'react';

export default ({recover, isto}) => {
    return (
        <ul>
            {
                isto.list(10).map((val, index) => {
                    return <li key={index}><button onClick={ () => recover(val) } >History Item {index}: {val.label}</button></li>
                })
            }
        </ul>
    )
}