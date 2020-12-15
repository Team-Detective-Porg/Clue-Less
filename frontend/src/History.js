import React from 'react';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

export default function History(props) {

    return (
        <Paper variant="outlined" style={{maxHeight:100, overflow:'auto'}}>
            <Grid container alignItems="flex-start">
                {props.history.map((item, index) => <Grid item xs={12} key={index}>{item}</Grid>)}
            </Grid>
        </Paper>  
    );
}