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

export default function Dining(props) {
    const styling = useStyles();

    const handleRoomClick = () => {
        console.log("Clicked room");
    }

    return (
        <Grid item>
            <Paper variant="outlined" style={{width: "125px", height: "125px"}}>
                <Button variant="contained" color="primary" style={{width:"100%", height: "100%"}} onClick={handleRoomClick}>
                    <Grid container direction="column">
                        <Grid item>
                            Dining
                        </Grid>

                        <Grid item>
                            <Paper>
                            </Paper>
                        </Grid>
                    </Grid>
                    
                </Button>
            </Paper>
        </Grid>
        
    );
}