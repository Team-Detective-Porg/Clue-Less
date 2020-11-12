import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const passage = "\u2192";

export default function Study(props) {

    const handleRoomClick = () => {
        console.log("Clicked room");
    }

    const handlePassageClick = (e) => {
        e.stopPropagation();
        console.log("Clicked passage");
    }
    return (
        <Paper variant="outlined" style={{width: "10vw", height: "10vw"}} onClick={handleRoomClick}>
            <Button style={{width:"100%", height: "100%", zIndex:10}}>
                Study
            </Button>

            <Button style={{marginTop:"-100px", zIndex:20}} onClick={handlePassageClick}>
                {passage}
            </Button>

        </Paper>
    );
}