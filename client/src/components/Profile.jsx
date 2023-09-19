import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiFab: {
        styleOverrides: {
          primary: {
            fontSize: '1rem',
            background: "linear-gradient(108.18deg, #201606 2.46%, #000000 99.84%)",
            color: "white",
    
          },
        },
      },
      
    },
  });
export default function Profile() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <ThemeProvider theme={theme}>
        <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
        </ThemeProvider>
      
    </Box>
  );
}