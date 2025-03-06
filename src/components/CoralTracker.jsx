import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';

export default function CoralTracker({
    levelTwoArray,
    levelThreeArray,
    levelFourArray,
    currentLevel,
    setCurrentLevel,
    levelOneCount,
    setLevelOneCount,
    autoLevelOneCount,
    setAutoLevelOneCount,
    isAuto,
}) {
    const getSelectedCount = (level) => {
        if (level === 2) {
            return levelTwoArray.filter(
                (selected) => selected.val && !selected.isAuto
            ).length;
        } else if (level === 3) {
            return levelThreeArray.filter(
                (selected) => selected.val && !selected.isAuto
            ).length;
        } else if (level === 4) {
            return levelFourArray.filter(
                (selected) => selected.val && !selected.isAuto
            ).length;
        }
        return 0;
    };

    const getSelectedCountAuto = (level) => {
        if (level === 2) {
            return levelTwoArray.filter(
                (selected) => selected.val && selected.isAuto
            ).length;
        } else if (level === 3) {
            return levelThreeArray.filter(
                (selected) => selected.val && selected.isAuto
            ).length;
        } else if (level === 4) {
            return levelFourArray.filter(
                (selected) => selected.val && selected.isAuto
            ).length;
        }
        return 0;
    };

    const getSelectedCountArray = (array) => {
        return array.filter((selected) => selected).length;
    };

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
                        fontSize: '40px',
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
                    Auto: {getSelectedCountAuto(4 - index)}
                    <br></br>
                    Teleop: {getSelectedCount(4 - index) !== 12
                        ? getSelectedCount(4 - index)
                        : 'DONE!'}
                </Button>
            ))}
            <Box
                position={'relative'}
                sx={{ display: 'flex', flex: 1, userSelect: 'none' }}
            >
                <Box
                    sx={{
                        fontWeight: 'bold',
                        color: 'limegreen',
                        fontSize: '40px',
                        fontFamily: 'Roboto',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}
                >
                    AUTO: {autoLevelOneCount}
                    <Box sx={{marginY: '20px'}}></Box>
                    TELEOP: {levelOneCount}
                </Box>
                <Button
                    onClick={() => {
                        if (isAuto && autoLevelOneCount != 0) {
                            setAutoLevelOneCount(--autoLevelOneCount);
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
                            setAutoLevelOneCount(++autoLevelOneCount);
                        } else {
                            setLevelOneCount(++levelOneCount);
                        }
                    }}
                    sx={{
                        flex: 0.5,
                        fontSize: '50px',
                        fontWeight: 'bold',
                        color: 'limegreen',
                        borderRadius: '0px 10px 10px 0px',
                        border: 1,
                        borderLeft: 0,
                    }}
                >
                    +
                </Button>
            </Box>
        </>
    );
}
