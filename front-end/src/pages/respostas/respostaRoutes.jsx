import React from 'react'
import Respostas from './respostas'
import { Route } from "react-router-dom";

export default function respostaRoutes(){
    return (
        <>
        <Route path="/respostas/respostas/:id" component={Respostas}/>
        </>
    )
}