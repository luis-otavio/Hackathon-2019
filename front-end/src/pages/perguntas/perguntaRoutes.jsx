import React from 'react'
import Perguntas from './perguntas'
import { Route } from "react-router-dom";

export default function perguntaRoutes(){
    return (
        <>
        <Route path="/perguntas/perguntas" exact component={Perguntas}/>
        </>
    )
}