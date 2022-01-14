import React, { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function SearchSpecification(props) {
    const [city, setCity] = useState('');
    const [checked, setChecked] = useState([false, false, false])

    const onChange1 = (event) => {
        setChecked([event.target.checked, checked[1], checked[2]]);

        if (event.target.checked){
            setCity(city + ',Berlin'); 
            props.onClick(city + ',Berlin')}

        else {
            setCity(city.replace(',Berlin', '')); 
            props.onClick(city.replace(',Berlin', ''))
        } 
    } 

    const onChange2 = (event) => {
        setChecked([checked[0], event.target.checked, checked[2]]);

        if (event.target.checked){
            setCity(city + ',Hamburg'); 
            props.onClick(city + ',Hamburg')}
        else {
            setCity(city.replace(',Hamburg', '')); 
            props.onClick(city.replace(',Hamburg', ''))
        } 
    } 

    const onChange3 = (event) => {
        setChecked([checked[0], checked[1], event.target.checked]);

        if (event.target.checked){
            setCity(city + ',Munich'); 
            props.onClick(city + ',Munich')}
        else {
            setCity(city.replace(',Munich', '')); 
            props.onClick(city.replace(',Munich', ''))
        } 
    } 
    return (
        <div>
            <Accordion>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"  expandIcon={<ExpandMoreIcon />}>
                    <Typography>City</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                            <FormControlLabel control = {<Checkbox label = 'Berlin' checked = {checked[0]} onClick = {onChange1}/>}
                            label = 'Berlin'/>
                            <FormControlLabel control = {<Checkbox onClick = {onChange2}/>}
                            label = 'Hamburg'/>
                            <FormControlLabel control = {<Checkbox onClick = {onChange3}/>}
                            label = 'Munich'/>
                    </FormGroup>
                    
                </AccordionDetails>

            </Accordion>
        </div>
    )
}

export default SearchSpecification
