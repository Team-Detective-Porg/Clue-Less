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

export default function Library_Conservatory(props) {
    const styling = useStyles();

    const handleClick = () => {
        console.log("Clicked hallway");
    }

    return (
        <Grid item>
            <div style={{width: "125px", height: "125px"}}>
                <Grid container justify="center">
                    <Grid item>
                        <Button variant="contained" style={{width:"50px", height: "125px"}} onClick={handleClick} disabled={props.disabled === "library" || props.disabled === "conservatory" ? false : true}>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Grid>
        
    );
}