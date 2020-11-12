import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export default function Empty(props) {
    return (
        <Grid item>
            <div style={{width: "125px", height: "125px"}}/>
        </Grid>
    );
}