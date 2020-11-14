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


export default function Room(props) {
    const styling = useStyles();

    return (
        <Grid item>
            <Paper variant="outlined" style={{width: "125px", height: "125px"}} >
                <Button variant="contained" color="primary" style={{width:"100%", height: "100%", zIndex:10}} onClick={() => props.handleClick(props.roomType)}>
                    <Grid container direction="column">
                        <Grid item>
                            {props.roomType}
                        </Grid>

                        <Grid item>
                        </Grid>

                        <Grid item>
                        </Grid>
                    </Grid>
                </Button>

                {/* Rendering secret passages */}
                {
                    props.roomType === "study" ? 
                    <Button 
                        variant="contained" 
                        className={styling.root}
                        style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-60px", marginLeft: "95px"}} 
                        onClick={() => props.handleClick("kitchen")}
                    >
                        &#8600;
                    </Button> : null
                }

                {
                    props.roomType === "lounge" ? 
                    <Button 
                        variant="contained" 
                        className={styling.root}
                        style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-60px", marginLeft: "5px"}} 
                        onClick={() => props.handleClick("conservatory")}
                    >
                        &#8601;
                    </Button> : null
                }

                {
                    props.roomType === "conservatory" ? 
                    <Button 
                        variant="contained" 
                        className={styling.root}
                        style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-240px", marginLeft: "95px"}} 
                        onClick={() => props.handleClick("lounge")}
                    >
                        &#8599;
                    </Button>: null
                }

                {
                    props.roomType === "kitchen" ? 
                    <Button 
                        variant="contained" 
                        className={styling.root}
                        style={{zIndex:20, padding:"0px", width: "25px", height: "25px", marginTop: "-240px", marginLeft: "5px"}} 
                        onClick={() => props.handleClick("study")}
                    >
                        &#8598;
                    </Button>: null
                }


            </Paper>
        </Grid>
        
    );
}