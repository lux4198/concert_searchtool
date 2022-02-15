import React, {useState} from 'react'
import {Grid, Typography, Button, Collapse} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { shuffleArray} from '../Helpers/helperFunctions';

// import '../pages/Home.css'

function alterItem(array, index){
    var arrayCopy = array.slice(0)
    arrayCopy[index] = !arrayCopy[index]
    return(arrayCopy)
}

function GridItemHome(props) {
    var item = props.item

    const [displayState] = useState(shuffleArray(item))
    const [button, setButton] = useState(Array(6).fill(false))

    const [query, setQuery] = useState('')

    const [collapse, setCollapse] = useState(false)

    const onClick = (index, display) => {
        !button[index]? setQuery(query + ',' + display) : setQuery(query.replace(',' + display, ''));
        setButton(alterItem(button, index));
        !button[index]? props.onClick(query + ',' + display) : props.onClick(query.replace(',' + display, ''));
    }


    return (
        <Grid item xs={6} sm={4} lg={6}>
            <div class = 'gridContainer'>
                <div class = 'firstitem' >
                    
                    <Button style = {{'textTransform' : 'none'}} 
                            onClick = {() => setCollapse(!collapse)} 
                            color = 'secondary' disableRipple = {true}>
                        <Typography variant = 'h5' /* color = 'secondary' */>
                            {props.header}
                        </Typography>
                        <ExpandMoreIcon/>
                    </Button>
                </div>
                
                <Collapse in = {collapse} className = 'collapse'>
                    
                    {displayState.slice(0,6).map((display, index) =>

                    <div class = {!button[index]?  'subitem' : 'subitem clicked'} >
                        <Button style = {{'textTransform' : 'none', 'color' : 'inherit', 'height' : 'inherit',}}
                                onClick = {() => onClick(index,display)} >

                            <Typography variant = 'subtitle1' style = {{'color' : 'inherit'}}>
                                {display}
                            </Typography>
                        </Button>
                    </div>

                    )}

                </Collapse>

            </div>
        </Grid>
    )
}

export default GridItemHome
