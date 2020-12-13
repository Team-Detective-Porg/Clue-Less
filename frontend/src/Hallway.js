import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

var jsonQuery = require("json-query");

export default function Hallway(props) {

    const getCharacters = () => {
        var returnList = [];
        var characterList = jsonQuery(`data[name=${props.hallwayType}].characterList`, {data: {data: props.locations}}).value;
        
        if (characterList === null || typeof characterList === 'undefined') {
            return returnList;
        } else {
            return characterList;
        }
    }

    const isDisabled = () => {
        var disabled = false;

        // Retrieve valid moves given player's current position
        var validMoves = jsonQuery(`data[name=${props.currLocation}].valid_moves`, {data: {data: props.locations}}).value;

        // Check if the current hallway is valid
        if (validMoves != null) {
            disabled = validMoves.includes(props.hallwayType) ? false : true;
        }
        
        return disabled;
    }

    return (
        <Grid item style={{width: "125px", height: "125px"}}>
            {
                props.direction === "horizontal" ?
                <Grid container alignItems="center" style={{width: "125px", height: "125px"}}>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="primary"
                            style={{width:"125px", height: "50px"}} 
                            disabled={isDisabled()}
                            onClick={() => {props.handleMove(props.hallwayType)}}>
                            <Grid container direction="column">
                                {getCharacters() === null ? null : 
                                    getCharacters().map(char => 
                                        <Grid item key={char.name}>
                                            {char.name}
                                        </Grid>
                                )}
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
                : 
                <Grid container justify="center">
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="primary"
                            style={{width:"50px", height: "125px"}} 
                            disabled={isDisabled()}
                            onClick={() => {props.handleMove(props.hallwayType)}}>
                            <Grid container direction="column" alignItems="flex-start" justify="flex-start">
                                {getCharacters() === null ? null : 
                                    getCharacters().map(char => 
                                        <Grid item key={char.name}>
                                            {char.name}
                                        </Grid>
                                )}
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}