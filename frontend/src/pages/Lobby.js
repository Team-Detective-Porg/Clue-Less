import React from 'react';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import WebSocketInstance from '../WebSocket'


export default function Lobby(props) {

    return (
        <Grid container spacing={7} direction="column" alignItems="center">
            <Grid item>
                <h2>Clue-Less Lobby</h2>
            </Grid>

            <Grid item>
                <h4>Current players logged in: </h4>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Player</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Character</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell>Static placeholder</TableCell>
                                <TableCell>Static placeholder</TableCell>
                                <TableCell>Static placeholder</TableCell>
                            </TableRow>
                        </TableBody>
                        {/* {
                            Depending on how the data comes back you can use a mapping function to generate table rows/cells
                        } */}
                    </Table>
                </TableContainer>
            </Grid>
            
            <Grid item>
                <Link to="/game">
                    <Button color="primary" variant="contained">
                        Start Game
                    </Button>
                </Link>
            </Grid>

            <Grid item>
                <h6>Do not press 'Start Game' until all players are ready. Any player can start the game.</h6>
            </Grid>
        </Grid>
    );
}