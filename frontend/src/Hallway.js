import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

var jsonQuery = require("json-query");

const useStyles = makeStyles({
    root: {
        minWidth: "0px"
    }
});

export default function Hallway(props) {
    const styling = useStyles();

    const getCharacters = () => {
        var returnList = [];
        var characterList = jsonQuery(`data[name=${props.hallwayType}].characterList`, {data: {data: props.locations}}).value;
        
        if (characterList === null || typeof characterList === 'undefined') {
            return returnList;
        } else {
            return characterList;
        }
    }

    return (
        <Grid item style={{width: "125px", height: "125px"}}>
            {
                props.direction === "horizontal" ?
                <Grid container alignItems="center" style={{width: "125px", height: "125px"}}>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            style={{width:"125px", height: "50px"}} 
                            onClick={() => {props.handleMove(props.hallwayType)}}>
                            <Grid container direction="column">
                                {getCharacters() === null ? null : 
                                    getCharacters().map(char => 
                                        <Grid item>
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
                            style={{width:"50px", height: "125px"}} 
                            onClick={() => {props.handleMove(props.hallwayType)}}>
                            <Grid container direction="column" alignItems="flex-start" justify="flex-start">
                                {getCharacters() === null ? null : 
                                    getCharacters().map(char => 
                                        <Grid item>
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