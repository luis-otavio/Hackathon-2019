import React from 'react'
import Home from './home'
import { Route } from "react-router-dom";

export default function homeRoutes(){
    return (
        <>
        <Route path="/home" component={Home}/>
        </>
    )
}