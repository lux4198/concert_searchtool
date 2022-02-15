import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';

export default function MaterialUIPickers(props) {
  return (
    <div style = {{'background': 'white', 'border': '3px solid #F0C035'}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
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
      </LocalizationProvider>
    </div>
  );
}
