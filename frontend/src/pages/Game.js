import React, {useEffect, useState} from 'react';
import Room from '../Room.js';
import Study from '../rooms/Study.js';
import Hall from '../rooms/Hall.js';
import Lounge from '../rooms/Lounge.js';
import Library from '../rooms/Library.js';
import Billiard from '../rooms/Billiard.js';
import Dining from '../rooms/Dining.js';
import Conservatory from '../rooms/Conservatory.js';
import Ballroom from '../rooms/Ballroom.js';
import Kitchen from '../rooms/Kitchen.js';
import Study_Hall from '../hallways/Study_Hall.js';
import Hall_Lounge from '../hallways/Hall_Lounge.js';
import Study_Library from '../hallways/Study_Library.js';
import Hall_Billiard from '../hallways/Hall_Billiard.js';
import Lounge_Dining from '../hallways/Lounge_Dining.js';
import Library_Billiard from '../hallways/Library_Billiard.js';
import Billiard_Dining from '../hallways/Billiard_Dining.js';
import Library_Conservatory from '../hallways/Library_Conservatory.js';
import Billiard_Ballroom from '../hallways/Billiard_Ballroom.js';
import Dining_Kitchen from '../hallways/Dining_Kitchen.js';
import Conservatory_Ballroom from '../hallways/Conservatory_Ballroom.js';
import Ballroom_Kitchen from '../hallways/Ballroom_Kitchen.js';
import Grid from '@material-ui/core/Grid';
import Empty from '../rooms/Empty.js';


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
                    <Room roomType={"study"} handleClick={handleClick}/>
                    <Study_Hall/>
                    <Room roomType={"hall"} handleClick={handleClick}/>
                    <Hall_Lounge/>
                    <Room roomType={"lounge"} handleClick={handleClick}/>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Study_Library/>
                    <Empty/>
                    <Hall_Billiard/>
                    <Empty/>
                    <Lounge_Dining/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Room roomType={"library"} handleClick={handleClick}/>
                    <Library_Billiard/>
                    <Room roomType={"billiard"} handleClick={handleClick}/>
                    <Billiard_Dining/>
                    <Room roomType={"dining"} handleClick={handleClick}/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Library_Conservatory disabled={currLocation}/>
                    <Empty/>
                    <Billiard_Ballroom/>
                    <Empty/>
                    <Dining_Kitchen/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Room roomType={"conservatory"} handleClick={handleClick}/>
                    <Conservatory_Ballroom/>
                    <Room roomType={"ballroom"} handleClick={handleClick}/>
                    <Ballroom_Kitchen onClick={handleClick}/>
                    <Room roomType={"kitchen"} handleClick={handleClick}/>
                </Grid>
            </Grid>

        </Grid>
  
    );
}