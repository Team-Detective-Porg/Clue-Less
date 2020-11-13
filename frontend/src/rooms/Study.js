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


export default function Study(props) {
    const styling = useStyles();

    const handleRoomClick = () => {
        props.onClick("study");
    }

    const handlePassageClick = (e) => {
        console.log("billiard");
    }
    return (
        <Grid item>
            <Paper variant="outlined" style={{width: "125px", height: "125px"}} >
                <Button variant="contained" color="primary" style={{width:"100%", height: "100%", zIndex:10}} onClick={handleRoomClick}>
                    <Grid container direction="column">
                        <Grid item>
                            Study
                        </Grid>

                        <Grid item>
                            <Paper>
                                Shirley
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Paper>
                                Halle
                            </Paper>
                        </Grid>
                    </Grid>
                    

                </Button>

                <Button 
                    variant="contained" 
                    className={styling.root}
                    style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-60px", marginLeft: "95px"}} 
                    onClick={handlePassageClick}
                >
                    &#8600;
                </Button>

            </Paper>
        </Grid>
        
    );
}