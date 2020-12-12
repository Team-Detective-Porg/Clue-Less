import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

var jsonQuery = require("json-query");

const useStyles = makeStyles({
    root: {
        minWidth: "0px"
    }
});

export default function Room(props) {
    const styling = useStyles();

    const getCharacters = () => {
        return jsonQuery(`data[name=${props.roomType}].characterList`, {data: {data: props.locations}}).value;
    }

    const isDisabled = () => {
        var disabled = false;

        // Retrieve valid moves given player's current position
        var validMoves = jsonQuery(`data[name=${props.currLocation}].valid_moves`, {data: {data: props.locations}}).value;

        // Check if the current hallway is valid
        if (validMoves != null) {
            disabled = validMoves.includes(props.roomType) ? false : true;
        }
        
        return disabled;
    }

    return (
        props.empty === true ?
        <Grid item>
            <div style={{width: "125px", height: "125px"}}/>
        </Grid> 
        :
        <Grid item>
            <Paper variant="outlined" style={{width: "125px", height: "125px"}} >
                <Button variant="contained" color="primary" style={{width:"100%", height: "100%", zIndex:10}} disabled={isDisabled()} onClick={() => props.handleMove(props.roomType)}>
                    <Grid container direction="column">
                        <Grid item>
                            {props.roomType}
                        </Grid>
                        
                        {getCharacters() === null ? null : 
                            getCharacters().map(char => 
                                <Grid key={char.name} item>
                                    {char.name}
                                </Grid>
                        )}
                    </Grid>
                </Button>

                {/* Rendering secret passages */}
                {
                    props.roomType === "study" ? 
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className={styling.root}
                        style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-60px", marginLeft: "95px"}} 
                        disabled={props.currLocation !== props.roomType}
                        onClick={() => props.handleMove("kitchen")}
                    >
                        &#8600;
                    </Button> : null
                }

                {
                    props.roomType === "lounge" ? 
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className={styling.root}
                        style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-60px", marginLeft: "5px"}} 
                        disabled={props.currLocation !== props.roomType}
                        onClick={() => props.handleMove("conservatory")}
                    >
                        &#8601;
                    </Button> : null
                }

                {
                    props.roomType === "conservatory" ? 
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className={styling.root}
                        style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-240px", marginLeft: "95px"}} 
                        disabled={props.currLocation !== props.roomType}
                        onClick={() => props.handleMove("lounge")}
                    >
                        &#8599;
                    </Button>: null
                }

                {
                    props.roomType === "kitchen" ? 
                    <Button 
                        variant="contained" 
                        color="secondary"
                        className={styling.root}
                        style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-240px", marginLeft: "5px"}} 
                        disabled={props.currLocation !== props.roomType}
                        onClick={() => props.handleMove("study")}
                    >
                        &#8598;
                    </Button>: null
                }
            </Paper>
        </Grid>
        
    );
}