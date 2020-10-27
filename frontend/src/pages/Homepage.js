import React , { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import moment from 'react'
import WebSocketInstance from '../WebSocket'


export default function Homepage(props) {
    var jsonQuery = require('json-query');

    // State information
    const [characterData, setCharacterData] = useState([]);

    const [userSelections, setUserSelections] = useState({
        userName: "",
        character: ""
    });
    
    useEffect(() => {
        // Load character data from server
        axios
            .get("http://localhost:8000/api/characters/?available=True")
            .then(response => setCharacterData(response.data))
            .catch(error => console.log(error))
    }, []);

    let data = {};

    const handleSubmit = () => {
        data = ({
            user_character: jsonQuery(`characterData[name=${userSelections.character}].id`, {data: {characterData}}).value,
            active: true,
            game_session: 1,
            user_name: userSelections.userName
        });
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/players/',
            data: {
                user_character: jsonQuery(`characterData[name=${userSelections.character}].id`, {data: {characterData}}).value,
                active: true,
                game_session: 1,
                user_name: userSelections.userName
            }
        });

        console.log({
            user_character: jsonQuery(`characterData[name=${userSelections.character}].id`, {data: {characterData}}).value,
            active: true,
            game_session: 1,
            user_name: userSelections.userName
        })
    }

    return (
        <Grid container spacing={7} direction="column" alignItems="center" alignContent="center">
            <Grid item>
                <h2>Welcome to Clue-Less</h2>
            </Grid>

            <Grid item>
                <Grid container spacing={3} direction="row">
                    <Grid item>
                        <TextField
                            label="Username"
                            variant="outlined"
                            onChange={event => setUserSelections({...userSelections, userName: event.target.value})}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            select
                            label="Character"
                            value={userSelections.character}
                            variant="outlined"
                            onChange={event => setUserSelections({...userSelections, character: event.target.value})}
                            style={{width:"20ch"}}
                        >
                            {characterData.map((char) => 
                                (<MenuItem key={char.name} value={char.name}>{char.name}</MenuItem>)
                            )}
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Link to={{pathname: "/lobby", state: {userName: userSelections.userName, character: jsonQuery(`characterData[name=${userSelections.character}].id`, {data: {characterData}}).value}}}>
                    <Button color="primary" variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
}