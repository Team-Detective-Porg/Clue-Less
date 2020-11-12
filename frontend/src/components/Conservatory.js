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


export default function Conservatory(props) {
    const styling = useStyles();

    const handleRoomClick = () => {
        console.log("Clicked room");
    }

    const handlePassageClick = (e) => {
        console.log("Clicked passage");
    }
    return (
        <Grid item>
            <Paper variant="outlined" style={{width: "125px", height: "125px"}} >
                <Button variant="contained" color="primary" style={{width:"100%", height: "100%", zIndex:10}} onClick={handleRoomClick}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <span style={{fontSize: "8pt"}}>
                                Conservatory
                            </span>
                        </Grid>

                        <Grid item>
                            <Paper>
                                
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
                    &#8599;
                </Button>

            </Paper>
        </Grid>
        
    );
}