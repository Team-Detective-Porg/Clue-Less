import React from 'react';
import Study from '../components/Study.js';
import Hall from '../components/Hall.js';
import Lounge from '../components/Lounge.js';
import Library from '../components/Library.js';
import Billiard from '../components/Billiard.js';
import Dining from '../components/Dining.js';
import Conservatory from '../components/Conservatory.js';
import Ballroom from '../components/Ballroom.js';
import Kitchen from '../components/Kitchen.js';
import HorizontalHallway from '../components/HorizontalHallway.js';
import VerticalHallway from '../components/VerticalHallway.js';
import Grid from '@material-ui/core/Grid';
import Empty from '../components/Empty.js';


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