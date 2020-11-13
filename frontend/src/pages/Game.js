import React, {useEffect, useState} from 'react';
import Study from '../rooms/Study.js';
import Hall from '../rooms/Hall.js';
import Lounge from '../rooms/Lounge.js';
import Library from '../rooms/Library.js';
import Billiard from '../rooms/Billiard.js';
import Dining from '../rooms/Dining.js';
import Conservatory from '../rooms/Conservatory.js';
import Ballroom from '../rooms/Ballroom.js';
import Kitchen from '../rooms/Kitchen.js';
import HorizontalHallway from '../hallways/HorizontalHallway.js';
import VerticalHallway from '../hallways/VerticalHallway.js';
import Grid from '@material-ui/core/Grid';
import Empty from '../rooms/Empty.js';


export default function Game(props) {

    const [currLocation, setCurrLocation] = useState();
    const [nextLocation, setNextLocation] = useState();
    const [playerData, setPlayerData] = useState();
    

    /**
     * TO DO LIST:
     * UI:
     * Hallway components
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
    
    /**
     * Total player dataset from server to render board state
     * {
     *      player1: {
     *          currentLocation: "Study",
     *          cardList: []
     *      },
     *      player2: {
     *          currentLocation: "Lounge",
     *          cardList: []
     *      }
     * }
     */


    /**
     * Validation of player move
     * {
     *      study: ["study_hall", "study_library", "billiard"],
     *      study_hall: ["study", "hall"],
     *      hall: ["study_hall", "hall_lounge"],
     *      hall_lounge:
     *      lounge: 
     * }
     */

    const handleClick = (location) => {
        // Check if the location that was clicked is a valid next move. If not, prompt to try again
            // Do this by comparing `currLocation` with location passed in by
            //Query the json object in validMoves object to check valid moves
        console.log(location);
    }


    return (
        <Grid container direction="row" alignItems="center">
            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Study onClick={handleClick}/>
                    <HorizontalHallway/>
                    <Hall/>
                    <HorizontalHallway/>
                    <Lounge/>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <VerticalHallway/>
                    <Empty/>
                    <VerticalHallway/>
                    <Empty/>
                    <VerticalHallway/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Library/>
                    <HorizontalHallway/>
                    <Billiard/>
                    <HorizontalHallway/>
                    <Dining/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <VerticalHallway/>
                    <Empty/>
                    <VerticalHallway/>
                    <Empty/>
                    <VerticalHallway/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Conservatory/>
                    <HorizontalHallway/>
                    <Ballroom/>
                    <HorizontalHallway/>
                    <Kitchen/>
                </Grid>
            </Grid>

        </Grid>
  
    );
}