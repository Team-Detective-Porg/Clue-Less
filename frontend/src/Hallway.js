import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: "0px"
    }
});

export default function Hallway(props) {
    const styling = useStyles();

    return (
        <Grid item style={{width: "125px", height: "125px"}}>
            {
                props.direction === "horizontal" ?
                <Grid container alignItems="center" style={{width: "125px", height: "125px"}}>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            style={{width:"125px", height: "50px"}} 
                            onClick={() => {props.handleMove(props.hallwayType)}}/>
                    </Grid>
                </Grid>
                : 
                <Grid container justify="center">
                    <Grid item>
                        <Button 
                            variant="contained" 
                            style={{width:"50px", height: "125px"}} 
                            onClick={() => {props.handleMove(props.hallwayType)}}/>
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}