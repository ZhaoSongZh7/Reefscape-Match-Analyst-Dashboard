import { Box, Button, colors } from '@mui/material'
import React, { useEffect, useState } from 'react'
import notCoop from "../assets/not-coop.png";
import coOp from "../assets/coop.png";

export default function CoOp({ useLocalStorage, Item, coOpArray, setCoOpArray, levelTwoArray,
  levelThreeArray, levelFourArray}) {
  const [coopertition, setCoopertition] = useLocalStorage("Coopertition", false)
  
  const handleCoopClick = () => {
    setCoopertition(!coopertition);
  }

  const obtainedCoralRP = () => {
    let levelsDone = coOpArray.filter((selected) => selected).length;

    if (coopertition && levelsDone >= 3) {
      return true
    } else if (levelsDone === 4) {
      return true
    }
    return false
  }

  return (
    <>
      <Box sx={{display: 'flex'}}>
        <Box sx={{ width: 250, fontWeight: "bold", fontSize: "40px", fontFamily: "Roboto", position: "absolute", top: "35px", right: "30px"}}>
          <Item sx={{marginBottom: '20px', bgcolor: coopertition ? "limegreen" : "crimson",
            color: "white"}}>CO-OP: {coopertition ? "YES" : "NO"}</Item>
          <Item sx={{marginBottom: '20px', fontSize:"25px",
            bgcolor: obtainedCoralRP() ? "limegreen" : "crimson", color: "white"}}>Obtained Coral RP: {obtainedCoralRP() ? "YES" : "NO"}</Item>
          <Button onClick={handleCoopClick} sx={{bgcolor: coopertition ? "dodgerblue" : "yellow", width: "250px", height: "250px", borderRadius: "8px"}}>
            <img width={"230px"} height={"230px"} src={coopertition ? coOp : notCoop}/>
          </Button>
        </Box>
      </Box>
    </>
  )
}
