import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Room from '../Room.js';
import Hallway from '../Hallway.js';
import Grid from '@material-ui/core/Grid';

/**
 * TO DO LIST:
 * 
 * Render initial starting positions for characters and weapons
 * Disable invalid moves
 * API call for suggestion - {card: "", player: ""}
 * API call for accusation - {correct: "true"}
 * 
 */

export default function Game(props) {

    // Global variables and state
    const [characterList, setCharacterList] = useState([]);
    const [weaponList, setWeaponList] = useState([]);
    const [locationsList, setLocationsList] = useState([]);

    const [currLocation, setCurrLocation] = useState("lounge"); // Get from websocket
    const [nextLocation, setNextLocation] = useState(); // Send to websocket

    const [playerChoice, setPlayerChoice] = useState("");

    const [suggestion, setSuggestion] = useState({
        character: "",
        weapon: "",
        room: ""
    });

    const [accusation, setAccusation] = useState({
        character: "",
        weapon: "",
        room: ""
    });

    
    // Initial data from server
    useEffect(() => {
        // Get list of characters
        axios
            .get("http://localhost:8000/api/characters/?available=True")
            .then(response => setCharacterList(response.data))
            .catch(error => console.log(error));

        // Get list of weapons
        axios
            .get("http://localhost:8000/api/weapons/")
            .then(response => setWeaponList(response.data))
            .catch(error => console.log(error));

        // Get list of rooms
        axios
            .get("http://localhost:8000/api/locations/")
            .then(response => setLocationsList(response.data))
            .catch(error => console.log(error));
    }, []);

    // Handlers
    const handleMove = (selectedLocation) => {
        // Validation 1: Is the selected location possible?

        // Validation 2: Is the selected 

        // Check if the location that was clicked is a valid next move. If not, prompt to try again
            // Do this by comparing `currLocation` with location passed in by
            //Query the json object in validMoves object to check valid moves
        console.log(selectedLocation);
        setCurrLocation(selectedLocation);
    }

    const handleChoice = (value) => {
        setPlayerChoice(value);
        if (value === "suggestion") {
            setSuggestion({...suggestion, room: currLocation});
        }
    }

    const submitChoice = () => {
        // Nice to have - error checking to make sure user doesn't submit incomplete choices
        playerChoice === "suggestion" ? console.log(suggestion) : console.log(accusation);
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h3>Clue-Less</h3>
            </Grid>
            
            <Grid item xs={7}>
                <Grid container justify="center" alignItems="center">
                    <Grid item>
                        <Grid container>
                            <Room 
                                roomType={"study"} 
                                handleMove={handleMove}/>
                            
                            <Hallway 
                                hallwayType={"study_hall"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}/>

                            <Room 
                                roomType={"hall"} 
                                handleMove={handleMove}/>

                            <Hallway 
                                hallwayType={"hall_lounge"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}/>

                            <Room 
                                roomType={"lounge"} 
                                handleMove={handleMove}/>
                        </Grid>
                    </Grid>
                    
                    <Grid item>
                        <Grid container>
                            <Hallway
                                hallwayType={"study_library"}
                                direction={"vertical"}
                                handleMove={handleMove}/>

                            <Room empty={true}/>

                            <Hallway
                                hallwayType={"hall_billiard"}
                                direction={"vertical"}
                                handleMove={handleMove}/>

                            <Room empty={true}/>

                            <Hallway
                                hallwayType={"lounge_dining"}
                                direction={"vertical"}
                                handleMove={handleMove}/>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container>
                            <Room 
                                roomType={"library"} 
                                handleMove={handleMove}/>
                            
                            <Hallway 
                                hallwayType={"library_billiard"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}/>

                            <Room 
                                roomType={"billiard"} 
                                handleMove={handleMove}/>

                            <Hallway 
                                hallwayType={"billiard_dining"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}/>

                            <Room 
                                roomType={"dining"} 
                                handleMove={handleMove}/>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container>
                            <Hallway
                                hallwayType={"library_conservatory"}
                                direction={"vertical"}
                                handleMove={handleMove}/>

                            <Room empty={true}/>

                            <Hallway
                                hallwayType={"billiard_ballroom"}
                                direction={"vertical"}
                                handleMove={handleMove}/>

                            <Room empty={true}/>

                            <Hallway
                                hallwayType={"dining_kitchen"}
                                direction={"vertical"}
                                handleMove={handleMove}/>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container>
                            <Room 
                                roomType={"conservatory"} 
                                handleMove={handleMove}/>
                            
                            <Hallway 
                                hallwayType={"conservatory_ballroom"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}/>

                            <Room 
                                roomType={"ballroom"} 
                                handleMove={handleMove}/>

                            <Hallway 
                                hallwayType={"ballroom_kitchen"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}/>

                            <Room 
                                roomType={"kitchen"} 
                                handleMove={handleMove}/>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>

            <Grid item xs={5}>
                <Grid container spacing={3} direction="column" alignItems="center">
                    <Grid item>
                        Make Suggestion or Accusation
                    </Grid>

                    <Grid item>
                        <TextField
                            select
                            label="Choice"
                            value={playerChoice}
                            variant="outlined"
                            style={{width:"20ch"}}
                            onChange={event => handleChoice(event.target.value)}
                        >
                            <MenuItem key={"suggestion"} value={"suggestion"}>Suggestion</MenuItem>
                            <MenuItem key={"accusation"} value={"accusation"}>Accusation</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item>
                        <TextField
                            select
                            label="Character"
                            value={playerChoice === "suggestion"? suggestion.character : accusation.character}
                            variant="outlined"
                            style={{width:"20ch"}}
                            onChange={event => playerChoice === "suggestion"? setSuggestion({...suggestion, character: event.target.value}) : setAccusation({...accusation, character: event.target.value})} 
                        >
                            {characterList.map((char) => 
                                (<MenuItem key={char.name} value={char.name}>{char.name}</MenuItem>)
                            )}
                        </TextField>
                    </Grid>

                    <Grid item>
                        <TextField
                            select
                            label="Weapon"
                            value={playerChoice === "suggestion"? suggestion.weapon : accusation.weapon}
                            variant="outlined"
                            style={{width:"20ch"}}
                            onChange={event => playerChoice === "suggestion"? setSuggestion({...suggestion, weapon: event.target.value}) : setAccusation({...accusation, weapon: event.target.value})}
                        >
                            {weaponList.map((wp) => 
                                (<MenuItem key={wp.name} value={wp.name}>{wp.name}</MenuItem>)
                            )}
                        </TextField>
                    </Grid>

                    <Grid item>
                        {
                            playerChoice === "suggestion" ?
                            <TextField
                                disabled
                                label="Room"
                                value={currLocation}
                                variant="outlined"
                                style={{width:"20ch"}}
                            /> : 
                            <TextField
                                select
                                label="Room"
                                value={accusation.room}
                                variant="outlined"
                                style={{width:"20ch"}}
                                onChange={event => setAccusation({...accusation, room: event.target.value})}
                            >
                                {locationsList.map((room) => 
                                    (<MenuItem key={room.name} value={room.name}>{room.name}</MenuItem>)
                                )}
                            </TextField>
                        }
                    </Grid>

                    <Grid item>
                        <Button variant="outlined" onClick={submitChoice}>Submit</Button>
                    </Grid>
                </Grid>
            </Grid>


        </Grid>
        
  
    );
}