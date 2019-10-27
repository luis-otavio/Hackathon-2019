import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Respostas from './pages/respostas/respostaRoutes'
import Perguntas from './pages/perguntas/perguntaRoutes'
import Home from './pages/home/homeRoutes'

export default function AppRouter(props) {
    return (
        <Router>
            <div>
                {props.children}
                <Route path="/home" exact component={Home} />
                <Route path="/respostas" component={Respostas} />
                <Route path="/perguntas" component={Perguntas} />
            </div>
        </Router>
    );
}