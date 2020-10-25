import React , { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default function Homepage(props) {
    // State information
    const [characterData, setCharacterData] = useState([]);
    const [weaponData, setWeaponData] = useState([]);

    const [userSelections, setUserSelections] = useState({
        userName: "",
        character: ""
    });

    useEffect(() => {
        // Load character data from server
        axios
            .get("http://localhost:8000/api/characters/?available=True")
            .then(response => setCharacterData(response.data))
            .catch(error => console.log(error))

        // Load weapons data from server
        axios
            .get("http://localhost:8000/api/weapons")
            .then(response => setWeaponData(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/players',
            data: {
                active: true,
                game_session: 1,
                user_character: userSelections.userName,
                user_name: userSelections.character
            }
        });
    }

    return (
        <Grid container spacing={3} direction="column" alignItems="center" alignContent="center">
            <Grid item>
                <h2>Welcome to Clue-Less</h2>
            </Grid>

            <Grid item>
                <Grid container spacing={3} direction="row">
                    <Grid item>
                        <TextField
                        label="Username"
                        variant="outlined"
                        onChange={event => setUserSelections({...userSelections, userName: event.target.value})}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                        select
                        label="Character"
                        value={userSelections.character}
                        variant="outlined"
                        onChange={event => setUserSelections({...userSelections, character: event.target.value})}
                        style={{width:"20ch"}}
                        >
                        {characterData.map((char) => 
                        (<MenuItem key={char.name} value={char.name}>{char.name}</MenuItem>)
                        )}
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid item>
                <TextField
                select
                label="Weapon"
                value={userWeapon}
                variant="outlined"
                onChange={(event) => {setUserWeapon(event.target.value)}}
                style={{width:"20ch"}}
                >
                {weaponData.map((weapon) => 
                (<MenuItem key={weapon.name} value={weapon.name}>{weapon.name}</MenuItem>)
                )}
                </TextField>
            </Grid> */}

            <Grid item>
                <Button color="primary" variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </Grid>

            <Grid item>
                <h3>Players in current game session:</h3>
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
                            <TableCell>Test</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>Test</TableCell>

                            {/* {rows.map((row) => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}