import React from 'react';
import { useState, useEffect } from "react";
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import WebSocketInstance from '../channels/WebSocket.js'


export default function Lobby(props) {

    // State information
    const [userSelections, setUserSelections] = useState([]);

    useEffect(() => {
        WebSocketInstance.connect();
        addCallbacks();
        waitForSocketConnection(sendMessage);
    }, []);

    function waitForSocketConnection(callback) {
        setTimeout(() => {
        if (WebSocketInstance.state() === 1) {
            callback();
        } else {
            waitForSocketConnection(callback);
        }
        }, 100);
    }

    function sendMessage() {
        var data = props.location.state;
        console.log(data);
        try {
            WebSocketInstance.sendMessage(data);
        }
        catch(err) {
            console.log(err.message);
        }  
    }

    function handleIncomingData(data){
        console.log(data.player_list);
        setUserSelections(data.player_list);
    }

    function addCallbacks() {
        WebSocketInstance.addCallbacks('lobby.message', handleIncomingData);
    }

    return (
        <Grid container spacing={7} direction="column" alignItems="center">
            <Grid item>
                <h2>Clue-Less Lobby</h2>
            </Grid>

            <Grid item>
                <h4>Current players logged in: </h4>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Character</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody> 
                            {userSelections.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.user_name}</TableCell>
                                <TableCell>{user.user_character}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            
            <Grid item>
                <Link to={{pathname:"/game", state:{userName: props.location.state.userName, character: props.location.state.character}}}>
                    <Button color="primary" variant="contained">
                        Start Game
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
}