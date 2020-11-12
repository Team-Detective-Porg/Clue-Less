import React from 'react';
import Study from '../rooms/Study.js';
import Hall from '../rooms/Hall.js';
import Lounge from '../rooms/Lounge.js';
import Library from '../rooms/Library.js';
import Billiard from '../rooms/Billiard.js';
import Dining from '../rooms/Dining.js';
import Conservatory from '../rooms/Conservatory.js';
import Ballroom from '../rooms/Ballroom.js';
import Kitchen from '../rooms/Kitchen.js';
import HorizontalHallway from '../hallways/HorizontalHallway.js';
import VerticalHallway from '../hallways/VerticalHallway.js';
import Grid from '@material-ui/core/Grid';
import Empty from '../rooms/Empty.js';


export default function Game(props) {
    return (
        <Grid container direction="row" alignItems="center">
            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Study/>
                    <HorizontalHallway/>
                    <Hall/>
                    <HorizontalHallway/>
                    <Lounge/>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <VerticalHallway/>
                    <Empty/>
                    <VerticalHallway/>
                    <Empty/>
                    <VerticalHallway/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Library/>
                    <HorizontalHallway/>
                    <Billiard/>
                    <HorizontalHallway/>
                    <Dining/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <VerticalHallway/>
                    <Empty/>
                    <VerticalHallway/>
                    <Empty/>
                    <VerticalHallway/>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Conservatory/>
                    <HorizontalHallway/>
                    <Ballroom/>
                    <HorizontalHallway/>
                    <Kitchen/>
                </Grid>
            </Grid>


        </Grid>
  
    );
}