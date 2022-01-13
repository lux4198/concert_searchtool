import React, { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function SearchSpecification(props) {
    const [city, setCity] = useState('');
    return (
        <div>
            <Accordion>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"  expandIcon={<ExpandMoreIcon />}>
                    <Typography>City</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                            <FormControlLabel control = {<Checkbox label = 'Berlin' onClick = {() => {setCity(city + ',Berlin'); props.onClick(city + ',Berlin')}}/>}
                            label = 'Berlin'/>
                            <FormControlLabel control = {<Checkbox onClick = {() => {setCity(city + ',Hamburg'); props.onClick(city + ',Hamburg')}}/>}
                            label = 'Hamburg'/>
                    </FormGroup>
                    
                </AccordionDetails>

            </Accordion>
        </div>
    )
}

export default SearchSpecification
