import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: "0px"
    }
});

export default function Study_Hall(props) {
    const styling = useStyles();

    const handleClick = () => {
        console.log("Clicked hallway");
    }

    return (
        <Grid item>
            <div style={{width: "125px", height: "50px"}}>
                <Button variant="contained" style={{width:"100%", height: "100%"}} onClick={handleClick}>
                </Button>
            </div>
        </Grid>
        
    );
}