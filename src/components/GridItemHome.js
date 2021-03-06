import React, {useEffect, useState, useRef} from 'react'
import {Typography, Button, Collapse} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import { shuffleArray} from '../Helpers/helperFunctions';

// import '../pages/Home.css'

function alterItem(array, index){
    var arrayCopy = array.slice(0)
    arrayCopy[index] = !arrayCopy[index]
    return(arrayCopy)
}

function GridItemHome(props) {
    var item = props.item

    const [button, setButton] = useState(Array(6).fill(false))

    const [query, setQuery] = useState('')

    const [collapse, setCollapse] = useState(false)

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setCollapse(false);
        }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
        document.removeEventListener('click', handleClickOutside, true);
        };
    },[collapse]);

    const onClick = (index, display) => {
        !button[index]? setQuery(query + ',' + display) : setQuery(query.replace(',' + display, ''));
        setButton(alterItem(button, index));
        !button[index]? props.onClick(query + ',' + display) : props.onClick(query.replace(',' + display, ''));
        setCollapse(false)
    }

    useEffect(() => {
        if (props.reset){
            setButton(Array(6).fill(false))
        }
    }, [props.reset])

    return (
            <div ref = {ref} class = 'gridContainer'>
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
                    
                    {item.slice(0,6).map((display, index) =>

                    <div class = {!button[index]?  'subitem' : 'subitem clicked'} key = {display+index}>
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
    )
}

export default GridItemHome
