import React, { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'


function checkConcerts(query, input, setBool){
    axios.get('/api/events/?'+ input + '&' + query)
    .then((response) => {
      if (response.data.length === 0){
          setBool(false)
      }
      else{
          setBool(true)
      }
    })
  };

function SearchSpecification(props) {
    const [city, setCity] = useState('');
    const [checked, setChecked] = useState([false, false, false, false])
    const [query, setQuery] = useState(props.query)
    const [bool, setBool] = useState(true)

    checkConcerts(query, 'city=Munich', setBool)

    if (query !== props.query){
        console.log(props.query)
        setQuery(() => {return(props.query)})}

    const onChange1 = (event) => {
        setChecked([event.target.checked, checked[1], checked[2], checked[3]]);

        if (event.target.checked){
            setCity(city + ',Berlin'); 
            props.onClick(city + ',Berlin')}

        else {
            setCity(city.replace(',Berlin', '')); 
            props.onClick(city.replace(',Berlin', ''))
        } 
    } 

    const onChange2 = (event) => {
        setChecked([checked[0], event.target.checked, checked[2], checked[3]]);

        if (event.target.checked){
            setCity(city + ',Hamburg'); 
            props.onClick(city + ',Hamburg')}
        else {
            setCity(city.replace(',Hamburg', '')); 
            props.onClick(city.replace(',Hamburg', ''))
        } 
    } 

    const onChange3 = (event) => {
        setChecked([checked[0], checked[1], event.target.checked, checked[3]]);

        if (event.target.checked){
            setCity(city + ',Munich'); 
            props.onClick(city + ',Munich')}
        else {
            setCity(city.replace(',Munich', '')); 
            props.onClick(city.replace(',Munich', ''))
        } 
    } 
    const onChange4 = (event) => {
        setChecked([checked[0], checked[1], checked[2], event.target.checked]);

        if (event.target.checked){
            setCity(city + ',Frankfurt'); 
            props.onClick(city + ',Frankfurt')}
        else {
            setCity(city.replace(',Frankfurt', '')); 
            props.onClick(city.replace(',Frankfurt', ''))
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
                            label = 'Berlin' />
                            <FormControlLabel control = {<Checkbox onClick = {onChange2}/>}
                            label = 'Hamburg'/>
                            <FormControlLabel control = {<Checkbox onClick = {onChange3}/>}
                            label = 'Munich' disabled = {!bool}/>
                            <FormControlLabel control = {<Checkbox onClick = {onChange4}/>}
                            label = 'Frankfurt'/>
                    </FormGroup>
                    
                </AccordionDetails>

            </Accordion>
        </div>
    )
}

export default SearchSpecification
