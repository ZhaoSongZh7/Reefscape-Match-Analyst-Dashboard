import { Box, Button, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import notCoop from '../assets/not-coop.png';
import coOp from '../assets/coop.png';

export default function CoOp({
    Item,
    coOpArray,
    setCoOpArray,
    levelTwoArray,
    levelThreeArray,
    levelFourArray,
    coopertition,
    setCoopertition
}) {
    const handleCoopClick = () => {
        setCoopertition(!coopertition);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
                alignItems: 'center',
            }}
        >
            <Item
                sx={{
                    width: '100%',
                    bgcolor: coopertition ? 'limegreen' : 'crimson',
                    color: 'white',
                }}
            >
                <Box sx={{ padding: '8px', fontSize: '45px' }}>
                    CO-OP: {coopertition ? 'YES' : 'NO'}
                </Box>
            </Item>
            <Button
                onClick={handleCoopClick}
                sx={{
                    bgcolor: coopertition ? 'dodgerblue' : 'yellow',
                    width: '250px',
                    height: '250px',
                    borderRadius: '8px',
                }}
            >
                <img
                    width={'230px'}
                    height={'230px'}
                    src={coopertition ? coOp : notCoop}
                />
            </Button>
        </Box>
    );
}
