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
 * POST request for suggestion - {card: "", player: ""}
 * POST request for accusation - {correct: "true"}
 * Disable invalid moves
 * 
 */

export default function Game(props) {

    // Global variables and state
    const [characterList, setCharacterList] = useState([]);
    const [weaponList, setWeaponList] = useState([]);
    const [locationsList, setLocationsList] = useState([]);

    const [userName, setUserName] = useState(props.location.state.userName);

    const [currLocation, setCurrLocation] = useState(""); // Get from websocket
    const [nextLocation, setNextLocation] = useState(""); // Send to websocket

    const [playerChoice, setPlayerChoice] = useState("");

    const [suggestion, setSuggestion] = useState({
        character: 0,
        weapon: 0,
        location: ""
    });

    const [accusation, setAccusation] = useState({
        character: 0,
        weapon: 0,
        location: ""
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
        console.log(userName);
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
                                handleMove={handleMove}
                                locations={locationsList}/>
                            
                            <Hallway 
                                hallwayType={"study_hall"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room 
                                roomType={"hall"} 
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Hallway 
                                hallwayType={"hall_lounge"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room 
                                roomType={"lounge"} 
                                handleMove={handleMove}
                                locations={locationsList}/>
                        </Grid>
                    </Grid>
                    
                    <Grid item>
                        <Grid container>
                            <Hallway
                                hallwayType={"study_library"}
                                direction={"vertical"}
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room empty={true}/>

                            <Hallway
                                hallwayType={"hall_billiard"}
                                direction={"vertical"}
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room empty={true}/>

                            <Hallway
                                hallwayType={"lounge_dining"}
                                direction={"vertical"}
                                handleMove={handleMove}
                                locations={locationsList}/>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container>
                            <Room 
                                roomType={"library"} 
                                handleMove={handleMove}
                                locations={locationsList}/>
                            
                            <Hallway 
                                hallwayType={"library_billiard"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room 
                                roomType={"billiard"} 
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Hallway 
                                hallwayType={"billiard_dining"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room 
                                roomType={"dining"} 
                                handleMove={handleMove}
                                locations={locationsList}/>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container>
                            <Hallway
                                hallwayType={"library_conservatory"}
                                direction={"vertical"}
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room empty={true}/>

                            <Hallway
                                hallwayType={"billiard_ballroom"}
                                direction={"vertical"}
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room empty={true}/>

                            <Hallway
                                hallwayType={"dining_kitchen"}
                                direction={"vertical"}
                                handleMove={handleMove}
                                locations={locationsList}/>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container>
                            <Room 
                                roomType={"conservatory"} 
                                handleMove={handleMove}
                                locations={locationsList}/>
                            
                            <Hallway 
                                hallwayType={"conservatory_ballroom"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room 
                                roomType={"ballroom"} 
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Hallway 
                                hallwayType={"ballroom_kitchen"} 
                                direction={"horizontal"} 
                                handleMove={handleMove}
                                locations={locationsList}/>

                            <Room 
                                roomType={"kitchen"} 
                                handleMove={handleMove}
                                locations={locationsList}/>
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
                                (<MenuItem key={char.id} value={char.id}>{char.name}</MenuItem>)
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
                                (<MenuItem key={wp.id} value={wp.id}>{wp.name}</MenuItem>)
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
                                {locationsList.map((loc) => {
                                    if (loc.is_card === true) {
                                        return (<MenuItem key={loc.name} value={loc.name}>{loc.display_name}</MenuItem>)
                                    }
                                })}
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