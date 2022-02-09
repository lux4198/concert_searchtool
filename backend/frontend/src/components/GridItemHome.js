import React, {useState} from 'react'
import {Grid, Typography, Button} from '@mui/material'

// import '../pages/Home.css'

function shuffleArray(array) {
    var shuffleArray = array.slice(0)
    for (var i = shuffleArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffleArray[i];
        shuffleArray[i] = shuffleArray[j];
        shuffleArray[j] = temp;
}
return(shuffleArray)
}

function alterItem(array, index){
    var arrayCopy = array.slice(0)
    arrayCopy[index] = !arrayCopy[index]
    return(arrayCopy)
}

function GridItemHome(props) {
    var item = props.item

    const [displayState, setdisplayState] = useState(shuffleArray(item))
    const [button, setButton] = useState(Array(6).fill(false))

    console.log(button)

    return (
        <Grid item xs={12} md={4} lg={4}>
            <div class = 'gridContainer'>
                <div class = 'griditem firstitem' >
                    <Button style = {{'textTransform' : 'none', }} 
                            onClick = {() => {setdisplayState(shuffleArray(item)); 
                                            setButton(Array(6).fill(false))}}>
                        <Typography variant = 'h4' color = 'secondary'>
                            {props.header}
                        </Typography>
                    </Button>
                </div>
                
                {displayState.slice(0,6).map((display, index) => 
                <div class = {!button[index]?  'griditem subitem' : 'griditem subitem clicked'} >
                    <Button style = {{'textTransform' : 'none', 'color' : 'inherit', }} 
                            onClick = {() => {setButton(alterItem(button, index))}} >
                        <Typography variant = 'h5' style = {{'color' : 'inherit', }}>
                            {display}
                        </Typography>
                    </Button>
                </div>)}

            </div>
        </Grid>
    )
}

export default GridItemHome
