import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: "0px"
    }
});

export default function Hall_Lounge(props) {
    const styling = useStyles();

    const handleClick = () => {
        console.log("Clicked hallway");
    }

    return (
        <Grid item>
            <div variant="outlined" style={{width: "125px", height: "50px"}}>
                <Button variant="contained" style={{width:"100%", height: "100%"}} onClick={handleClick}>
                </Button>
            </div>
        </Grid>
        
    );
}