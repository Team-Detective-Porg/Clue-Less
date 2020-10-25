import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

// Update drop down list to only be available characters
// Push username and character to server
// Print all player choices to screen


export default function App() {
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

  return (
    <Grid container spacing={3} direction="column" alignItems="center" alignContent="center">
      <Grid item>
        <h2>Welcome to Clue-Less</h2>
      </Grid>

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
        <Button color="primary" variant="contained" onClick={()=>console.log(userSelections)}>
          Submit
        </Button>
      </Grid>

    </Grid>
  );

}
