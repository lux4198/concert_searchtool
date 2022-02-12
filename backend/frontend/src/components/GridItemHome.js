import React, {useState} from 'react'
import {Grid, Typography, Button, Collapse, IconButton} from '@mui/material'

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

    const [displayState, setdisplayState] = useState(shuffleArray(item))
    const [button, setButton] = useState(Array(6).fill(false))
    const [query, setQuery] = useState('')

    const [collapse, setCollapse] = useState(false)

    return (
        <Grid item xs={6} sm={4} lg={4}>
            <div class = 'gridContainer'>
                <div class = 'griditem firstitem' >
                    <Button style = {{'textTransform' : 'none', }} 
                            onClick = {() => {setdisplayState(shuffleArray(item)); 
                                            setButton(Array(6).fill(false));
                                            setQuery(''); 
                                            props.onClick('')}}>
                        <Typography variant = 'h5' color = 'secondary'>
                            {props.header}
                        </Typography>
                    </Button>
                    <IconButton onClick = {() => setCollapse(!collapse)} color = 'secondary' disableRipple = {true}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </div>
                
                <Collapse in = {collapse} style = {{'width' : '100%'}}>
                    {displayState.slice(0,6).map((display, index) =>
                    <div class = {!button[index]?  'griditem subitem' : 'griditem subitem clicked'} >
                        <Button style = {{'textTransform' : 'none', 'color' : 'inherit', 'height' : 'inherit', 'padding' : '1px'}}
                    
                                onClick = {() => {
                                !button[index]? setQuery(query + ',' + display) : setQuery(query.replace(',' + display, ''));
                                setButton(alterItem(button, index));
                                !button[index]? props.onClick(query + ',' + display) : props.onClick(query.replace(',' + display, ''));
                                }} >
                            <Typography variant = 'subtitle1' style = {{'color' : 'inherit'}}>
                                {display}
                            </Typography>
                        </Button>
                    </div>)}
                </Collapse>

            </div>
        </Grid>
    )
}

export default GridItemHome
