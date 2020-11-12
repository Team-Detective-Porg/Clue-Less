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

export default function Lounge(props) {
    const styling = useStyles();

    const handleRoomClick = () => {
        console.log("Clicked room");
    }

    const handlePassageClick = (e) => {
        console.log("Clicked passage");
    }
    return (
        <Grid item>
            <Paper variant="outlined" style={{width: "125px", height: "125px"}}>
                <Button variant="contained" color="primary" style={{width:"100%", height: "100%", zIndex:10}} onClick={handleRoomClick}>
                    <Grid container direction="column">
                        <Grid item>
                            Kitchen
                        </Grid>

                        <Grid item>
                            <Paper>
                                Bryce
                            </Paper>
                        </Grid>
                    </Grid>
                    

                </Button>

                <Button 
                    variant="contained" 
                    className={styling.root}
                    style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-60px", marginLeft: "5px"}} 
                    onClick={handlePassageClick}
                >
                    &#8598;
                </Button>

            </Paper>
        </Grid>
        
    );
}