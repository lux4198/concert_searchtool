import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function SearchSpecification(props) {
    return (
        <div>
            <Accordion>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"  expandIcon={<ExpandMoreIcon />}>
                    <Typography>City</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Button onClick = {() => {props.onClick('city=Berlin')}}>
                        Berlin
                    </Button>
                    <Button onClick = {() => {props.onClick('city=Hamburg')}}>
                        Hamburg
                    </Button>
                    
                </AccordionDetails>

            </Accordion>
        </div>
    )
}

export default SearchSpecification
