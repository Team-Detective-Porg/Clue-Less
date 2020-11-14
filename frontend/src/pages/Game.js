import React, {useEffect, useState} from 'react';
import Room from '../Room.js';
import Hallway from '../Hallway.js';
import Grid from '@material-ui/core/Grid';

export default function Game(props) {

    const [currLocation, setCurrLocation] = useState("study"); // Get from websocket
    const [nextLocation, setNextLocation] = useState(); // Send to websocket
    const [playerData, setPlayerData] = useState();
    const validMoves = {
        study: ["study_hall", "study_library", "kitchen"],
        study_hall: ["study", "hall"],
        hall: ["study_hall", "hall_lounge"],
        hall_lounge: ["hall", "lounge"],
        lounge: ["hall_lounge", "lounge_dining", "conservatory"],
        study_library: ["study", "library"],
        hall_billiard: ["hall", "billiard"],
        lounge_dining: ["lounge", "dining"],
        library: ["study_library", "library_conservatory", "library_billiard"],
        library_billiard: ["library", "billiard"],
        billiard: ["hall_billiard", "billiard_dining", "billiard_ballroom", "library_billiard"],
        billiard_dining: ["billiard", "dining"],
        dining: ["lounge_dining", "billiard_dining", "dining_kitchen"],
        library_conservatory: ["library", "conservatory"],
        billiard_ballroom: ["billiard", "ballroom"],
        dining_kitchen: ["dining", "kitchen"],
        conservatory: ["library_conservatory", "conservatory_ballroom"],
        conservatory_ballroom: ["conservatory", "ballroom"],
        ballroom: ["billiard_ballroom", "ballroom_kitchen", "conservatory_ballroom"],
        ballroom_kitchen: ["ballroom", "kitchen"],
        kitchen: ["dining_kitchen", "ballroom_kitchen"]
    };
    
    /**
     * TO DO LIST:
     * UI:
     * Flip text 90º on vertical hallways
     * Initial call to server for default starting locations
     * api call for suggestion
     * 
     * Card state
     * UI rendering for suggestion/accusation?
     * 
     * 
     * Backend:
     * Update characters api call
     * Return playerdata to render board state
     * 
     * 
     * Communication:
     * Set up channel for Game.js
     */


    // Assuming we get a json object back by player and their current positions
    // Data from server on valid locations 

    useEffect(() => {

    });

    const handleClick = (selectedLocation) => {
        // Validation 1: Is the selected location possible?

        // Validation 2: Is the selected 

        // Check if the location that was clicked is a valid next move. If not, prompt to try again
            // Do this by comparing `currLocation` with location passed in by
            //Query the json object in validMoves object to check valid moves
        console.log(selectedLocation);
    }


    return (
        <Grid container direction="row" alignItems="center">
            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Room 
                        roomType={"study"} 
                        handleClick={handleClick}/>
                    
                    <Hallway 
                        hallwayType={"study_hall"} 
                        direction={"horizontal"} 
                        handleClick={handleClick}/>

                    <Room 
                        roomType={"hall"} 
                        handleClick={handleClick}/>

                    <Hallway 
                        hallwayType={"hall_lounge"} 
                        direction={"horizontal"} 
                        handleClick={handleClick}/>

                    <Room 
                        roomType={"lounge"} 
                        handleClick={handleClick}/>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Hallway
                        hallwayType={"study_library"}
                        direction={"vertical"}
                        handleClick={handleClick}/>

                    <Room empty={true}/>

                    <Hallway
                        hallwayType={"hall_billiard"}
                        direction={"vertical"}
                        handleClick={handleClick}/>

                    <Room empty={true}/>

                    <Hallway
                        hallwayType={"lounge_dining"}
                        direction={"vertical"}
                        handleClick={handleClick}/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Room 
                        roomType={"library"} 
                        handleClick={handleClick}/>
                    
                    <Hallway 
                        hallwayType={"library_billiard"} 
                        direction={"horizontal"} 
                        handleClick={handleClick}/>

                    <Room 
                        roomType={"billiard"} 
                        handleClick={handleClick}/>

                    <Hallway 
                        hallwayType={"billiard_dining"} 
                        direction={"horizontal"} 
                        handleClick={handleClick}/>

                    <Room 
                        roomType={"dining"} 
                        handleClick={handleClick}/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Hallway
                        hallwayType={"library_conservatory"}
                        direction={"vertical"}
                        handleClick={handleClick}/>

                    <Room empty={true}/>

                    <Hallway
                        hallwayType={"billiard_ballroom"}
                        direction={"vertical"}
                        handleClick={handleClick}/>

                    <Room empty={true}/>

                    <Hallway
                        hallwayType={"dining_kitchen"}
                        direction={"vertical"}
                        handleClick={handleClick}/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Room 
                        roomType={"conservatory"} 
                        handleClick={handleClick}/>
                    
                    <Hallway 
                        hallwayType={"conservatory_ballroom"} 
                        direction={"horizontal"} 
                        handleClick={handleClick}/>

                    <Room 
                        roomType={"ballroom"} 
                        handleClick={handleClick}/>

                    <Hallway 
                        hallwayType={"ballroom_kitchen"} 
                        direction={"horizontal"} 
                        handleClick={handleClick}/>

                    <Room 
                        roomType={"kitchen"} 
                        handleClick={handleClick}/>
                </Grid>
            </Grid>

        </Grid>
  
    );
}