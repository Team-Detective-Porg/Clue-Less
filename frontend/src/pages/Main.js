import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Homepage.js';
import Lobby from './Lobby.js'
import Game from './Game.js'

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Homepage}></Route>
            <Route exact path='/lobby' component={Lobby}></Route>
            <Route exact path='/game' component={Game}></Route>
        </Switch>
    );
}

export default Main;