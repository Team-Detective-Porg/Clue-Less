import React from 'react';
import Study from '../components/Study.js';
import Hall from '../components/Hall.js';
import Lounge from '../components/Lounge.js';
import HorizontalHallway from '../components/HorizontalHallway.js';
import VerticalHallway from '../components/VerticalHallway.js';
import Grid from '@material-ui/core/Grid';
import Empty from '../components/Empty.js';

export default function Game(props) {
    return (
        <Grid container direction="row" alignItems="center">
            {/* Row 1 */}
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
                    <Grid item>
                        <VerticalHallway/>
                    </Grid>
                    
                    <Grid item>
                        <Empty/>
                    </Grid>
                    

                    <Grid item>
                        <VerticalHallway/>
                    </Grid>
                    
                    <Grid item>
                        <Empty/>
                    </Grid>

                    <Grid item>
                        <VerticalHallway/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                    <Study/>
                    <HorizontalHallway/>
                    <Hall/>
                    <HorizontalHallway/>
                    <Lounge/>
                </Grid>
            </Grid>
        </Grid>
  
    );
}