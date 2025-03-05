import React, { useState, useEffect } from 'react';
import reef from '../assets/reef.png';
import coral from '../assets/coral.png';
import algae from '../assets/algae.png';

import { Box, Button, selectClasses } from '@mui/material';

export default function Reef({
    levelTwoArray,
    setLevelTwoArray,
    levelThreeArray,
    setLevelThreeArray,
    levelFourArray,
    setLevelFourArray,
    currentLevel,
    setCurrentLevel,
    algaeArray,
    setAlgaeArray,
    isAuto,
    autoLevelFourArray,
    setAutoLevelFourArray,
    autoLevelThreeArray,
    setAutoLevelThreeArray,
    autoLevelTwoArray,
    setAutoLevelTwoArray,
    totalScore,
    setTotalScore
}) {

    const coralRadius = 350; // Distance of corals from center
    const algaeRadius = 170; // Algae closer to center

    // Custom angles for coral (aligned with purple branches)
    // const coralAngles = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];
    const coralAngles = [
        105, 75, 45, 15, 345, 315, 285, 255, 225, 195, 165, 135,
    ];

    // Custom angles for algae (aligned with hexagon sides)
    // const algaeAngles = [330, 270, 210, 150, 90, 30];
    const algaeAngles = [90, 30, 330, 270, 210, 150];

    // let selectedCoralIsAuto;

    // Function to handle coral click
    const handleCoralClick = (index) => {
        let updatedLevelArray;
        let updatedCount;
        let selectedArray;
        let setSelectedArray;
        let mergedArray;

        // Update the correct level array based on currentLevel
        if (currentLevel === 2) {
            selectedArray = isAuto ? autoLevelTwoArray : levelTwoArray
            setSelectedArray = isAuto ? setAutoLevelTwoArray : setLevelTwoArray
            mergedArray = autoLevelTwoArray.map((val, index) => val || levelTwoArray[index]);
        } else if (currentLevel === 3) {
            selectedArray = isAuto ? autoLevelThreeArray : levelThreeArray
            setSelectedArray = isAuto ? setAutoLevelThreeArray : setLevelThreeArray
            mergedArray = autoLevelThreeArray.map((val, index) => val || levelThreeArray[index]);
        } else if (currentLevel === 4) {
            selectedArray = isAuto ? autoLevelFourArray : levelFourArray
            setSelectedArray = isAuto ? setAutoLevelFourArray : setLevelFourArray
            mergedArray = autoLevelFourArray.map((val, index) => val || levelFourArray[index]);
        }

        console.log("Merged" + mergedArray[index])
        console.log("Selected" + selectedArray[index])
        if (mergedArray[index] === selectedArray[index]) {
            // if (isAuto) {
            //     selectedCoralIsAuto = true;
            // } else {
            //     selectedCoralIsAuto = false;
            // }
            
            updatedLevelArray = [...selectedArray];
            updatedLevelArray[index] = !updatedLevelArray[index];
            setSelectedArray(updatedLevelArray);
            updatedCount = updatedLevelArray.filter(
                (selected) => selected
            ).length;
        } else {
            return; // Exit the function early if the coral is already clicked
        }
        
        // Update the count or display the selected corals in the CoralTracker
        // console.log(`${updatedCount} corals selected on level ${currentLevel}`);
    };

    // const checkIfAuto = (index, mergedArray, selectedArray) => {
    //     if (mergedArray[index] === selectedArray[index]) {
    //         return true;
    //     }
    //     return false;
    // }

    const handleAlgaeClick = (index) => {
        let updatedLevelArray;

        updatedLevelArray = [...algaeArray];
        updatedLevelArray[index] = !updatedLevelArray[index];
        setAlgaeArray(updatedLevelArray);
    };

    return (
        <>
            {/* Hexagonal Reef */}
            <img
                src={reef}
                width={'90%'}
                style={{
                    transform: 'rotate(90deg)',
                    userSelect: 'none',
                    objectFit: 'contain',
                    margin: '0 auto',
                    maxHeight: 'calc(100vh - 175px)',
                }}
            />
            {/* Coral Positions */}
            {coralAngles.map((angle, index) => {
                const radian = angle * (Math.PI / 180); // Convert degrees to radians
                const x = Math.cos(radian) * coralRadius;
                const y = Math.sin(radian) * coralRadius;
                const mergedLevelTwoArray = autoLevelTwoArray.map((val, index) => val || levelTwoArray[index]);
                const mergedLevelThreeArray = autoLevelThreeArray.map((val, index) => val || levelThreeArray[index]);
                const mergedLevelFourArray = autoLevelFourArray.map((val, index) => val || levelFourArray[index]);

                // const isSelected =
                //     isAuto ?
                //     (currentLevel === 2
                        
                //         ? autoLevelTwoArray[index]
                //         : currentLevel === 3
                //         ? autoLevelThreeArray[index]
                //         : autoLevelFourArray[index])
                //     : (currentLevel === 2
                //         ? levelTwoArray[index]
                //         : currentLevel === 3
                //         ? levelThreeArray[index]
                //         : levelFourArray[index])

                        const isSelected =
                        currentLevel === 2
                            ? mergedLevelTwoArray[index]
                            : currentLevel === 3
                            ? mergedLevelThreeArray[index]
                            : mergedLevelFourArray[index]

                return (
                    <Button
                        key={`coral-${index}`}
                        onClick={() => {
                            handleCoralClick(index)}}
                        sx={{
                            borderRadius: '50%',
                            position: 'absolute',
                            top: `calc(50% + ${y}px)`,
                            left: `calc(50% + ${x}px)`,
                            transform: 'translate(-50%, -50%)',
                            border: 2,
                            borderColor: 'black',
                            bgcolor: isSelected
                            ? isAuto
                                ? 'yellow' // Auto mode (yellow)
                                : 'crimson' // Teleop mode (crimson)
                            : 'limegreen', // Default color if not selected
                        }}
                    >
                        <img src={coral} width={110} height={110} />
                    </Button>
                );
            })}

            {/* Algae Positions */}
            {algaeAngles.map((angle, index) => {
                const radian = angle * (Math.PI / 180); // Convert degrees to radians
                const x = Math.cos(radian) * algaeRadius;
                const y = Math.sin(radian) * algaeRadius;

                return (
                    <Button
                        key={`algae-${index}`}
                        onClick={() => handleAlgaeClick(index)}
                        sx={{
                            borderRadius: '50%',
                            position: 'absolute',
                            top: `calc(51% + ${y}px)`,
                            left: `calc(50% + ${x}px)`,
                            transform: 'translate(-50%, -50%)',
                            border: 2,
                            borderColor: 'black',
                            bgcolor: algaeArray[index]
                                ? 'crimson'
                                : 'limegreen',
                        }}
                    >
                        <img
                            src={algae}
                            width={index % 2 == 0 ? 120 : 100}
                            height={index % 2 == 0 ? 120 : 100}
                        />
                    </Button>
                );
            })}
        </>
    );
}
