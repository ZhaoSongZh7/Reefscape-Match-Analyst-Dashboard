import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState, useEffect } from 'react';

export default function CoralTracker({
    levelTwoArray,
    setLevelTwoArray,
    levelThreeArray,
    setLevelThreeArray,
    levelFourArray,
    setLevelFourArray,
    currentLevel,
    setCurrentLevel,
    useLocalStorage,
    coOpArray,
    setCoOpArray,
    levelOneCount,
    setLevelOneCount,
    autoLevelFourArray,
    setAutoLevelFourArray,
    autoLevelThreeArray,
    setAutoLevelThreeArray,
    autoLevelTwoArray,
    setAutoLevelTwoArray,
    autoLevelOneCount,
    setAutoLevelOneCount,
    isAuto,
}) {
    const updateCoOpArray = (array, level) => {
        setCoOpArray((prevArray) => {
            const updatedArray = [...prevArray];
            updatedArray[level - 1] =
                level === 1
                    ? levelOneCount >= 5
                    : array.filter((selected) => selected).length >= 5;
            return updatedArray;
        });
    };

    const getSelectedCount = (level) => {
        if (level === 2) {
            return levelTwoArray.filter((selected) => selected).length;
        } else if (level === 3) {
            return levelThreeArray.filter((selected) => selected).length;
        } else if (level === 4) {
            return levelFourArray.filter((selected) => selected).length;
        }
        return 0;
    };

    const getSelectedCountAuto = (level) => {
        if (level === 2) {
            return autoLevelTwoArray.filter((selected) => selected).length;
        } else if (level === 3) {
            return autoLevelThreeArray.filter((selected) => selected).length;
        } else if (level === 4) {
            return autoLevelFourArray.filter((selected) => selected).length;
        }
        return 0;
    };

    useEffect(() => {
        updateCoOpArray(levelTwoArray, 2);
    }, [levelTwoArray]);

    useEffect(() => {
        updateCoOpArray(levelThreeArray, 3);
    }, [levelThreeArray]);

    useEffect(() => {
        updateCoOpArray(levelFourArray, 4);
    }, [levelFourArray]);

    useEffect(() => {
        updateCoOpArray(coOpArray, 1);
    }, [levelOneCount]);

    return (
        <>
            {Array.from(Array(3)).map((_, index) => (
                <Button
                    key={index}
                    onClick={() => {
                        setCurrentLevel(4 - index);
                    }}
                    sx={{
                        flex: 1,
                        fontSize: '50px',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        borderColor: 'black',
                        border:
                            currentLevel === 4 - index ||
                            getSelectedCount(4 - index) == 12
                                ? 0
                                : 1,
                        color:
                            currentLevel === 4 - index ||
                            getSelectedCount(4 - index) == 12
                                ? 'white'
                                : 'dodgeyblue',
                        bgcolor:
                            getSelectedCount(4 - index) == 12
                                ? 'limegreen'
                                : currentLevel === 4 - index
                                ? 'dodgerblue'
                                : 'transparent',
                    }}
                >
                    {getSelectedCountAuto(4 - index)} | {getSelectedCount(4 - index) !== 12
                        ? getSelectedCount(4 - index)
                        : 'DONE!'}
                </Button>
            ))}
            <Box position={'relative'} sx={{ display: 'flex', flex: 1, userSelect: 'none' }}>
                <Box
                    sx={{
                        fontWeight: 'bold',
                        color: 'limegreen',
                        fontSize: '50px',
                        fontFamily: 'Roboto',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                   {autoLevelOneCount} | {levelOneCount}
                </Box>
                <Button
                    onClick={() => {
                        if (isAuto && autoLevelOneCount != 0) {
                            setAutoLevelOneCount(--autoLevelOneCount)
                        } else if (!isAuto && levelOneCount != 0) {
                            setLevelOneCount(--levelOneCount);
                        }
                    }}
                    sx={{
                        flex: 0.5,
                        fontWeight: 'bold',
                        color: 'limegreen',
                        fontSize: '50px',
                        borderRadius: '10px 0px 0px 10px',
                        border: 1,
                        borderRight: 0,
                    }}
                >
                    -
                </Button>
                <Button
                    onClick={() => {
                        if (isAuto) {
                            setAutoLevelOneCount(++autoLevelOneCount)
                        } else {
                            setLevelOneCount(++levelOneCount);
                        }}}
                    sx={{
                        flex: 0.5,
                        fontSize: '50px',
                        fontWeight: 'bold',
                        color: 'limegreen',
                        borderRadius: '0px 10px 10px 0px',
                        border: 1,
                        borderLeft: 0
                    }}
                >
                    +
                </Button>
            </Box>
            {/* <Grid container justifyContent={"space-around"}>
          <Grid position={"relative"}>
            <Box sx={{ width: "100%", height: "100%", fontWeight: "bold", color: "limegreen", fontSize: "50px", fontFamily: "Roboto", position: "absolute", top: "35%" }}>{levelOneCount}</Box>
            <Button onClick={() => { if (levelOneCount != 0) { setLevelOneCount(--levelOneCount) } }} sx={{ width: "200px", height: "100%", fontWeight: "bold", color: "limegreen", fontSize: "50px", borderRadius: "10px 0 0 10px", borderColor: "black", border: 1, borderRight: 0 }}>
              -
            </Button>
            <Button onClick={() => { setLevelOneCount(++levelOneCount) }} sx={{ width: "200px", height: "100%", fontWeight: "bold", color: "limegreen", fontSize: "50px", borderRadius: "0 10px 10px 0", borderColor: "black", border: 1, borderLeft: 0 }}>
              +
            </Button>
          </Grid>
        </Grid> */}
        </>
    );
}
