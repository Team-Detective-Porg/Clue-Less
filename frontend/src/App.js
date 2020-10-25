import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


export default function App() {
  // State information
  const [characterData, setCharacterData] = useState([]);
  const [weaponData, setWeaponData] = useState([]);
  const [userName, setUserName] = useState("");
  const [userCharacter, setUserCharacter] = useState("");

  useEffect(() => {
    // Loading initial game data
    axios.get("http://localhost:8000/api/characters/").then(response => setCharacterData(response.data)).catch(error => console.log(error))
  }, []);

  return (
    <Grid container spacing={3} direction="column" alignItems="center" alignContent="center">
      <Grid item>
        <h2>Welcome to Clue-Less</h2>
      </Grid>

      <Grid item>
        <TextField
          label="Username"
          variant="outlined"
          onChange={(event) => {setUserName(event.target.value)}}
        />
      </Grid>

      <Grid item>
        <TextField
          select
          label="Character"
          value={userCharacter}
          variant="outlined"
          onChange={(event) => {setUserCharacter(event.target.value)}}
        >
        {characterData.map((char) => 
          (<MenuItem key={char.name} value={char.name}>{char.name}</MenuItem>)
        )}
        </TextField>
      </Grid>

      <Grid item>
        <Button color="primary" variant="contained" onClick={()=>{console.log(userCharacter); console.log(userName)}}>Submit</Button>
      </Grid>

    </Grid>
  );

}
