import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiSvgIcon : {
      styleOverrides: {
        root: {
          color: 'black', 
        }
      }
    }
  }
});

export default function MaterialUIPickers(props) {
  return (
    <div style = {{'background': 'white', 'borderRadius': '20px', 'marginLeft': '1rem', 'marginRight': '1rem', 
                    'marginBottom' : '0.5rem',}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme = {theme}>
            <DatePicker
            
              OpenPickerButtonProps={{ style: { color: 'black' } }}
              label="Datum"
              inputFormat="MM/dd/yyyy"
              value={props.value}
              onChange={props.onChange}
              renderInput={(params) => <TextField {...params}
              sx={{
                svg: { color : 'black' },
                input: { color : 'black' },
                label: { color : 'transparent' },
              }}/>}
            />
          </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}
