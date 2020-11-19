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

    const getCharacter = () => {
        var characterList = jsonQuery(`data[name=${props.hallwayType}].characterList`, {data: {data: props.locations}}).value;
        
        var character = characterList === null || characterList.length === 0 ? null : characterList[0].name;

        return character;
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
                            {getCharacter()}
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
                            {getCharacter()}
                        </Button>
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}