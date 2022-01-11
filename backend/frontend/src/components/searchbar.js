import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core';


function Searchbar(props) {
    const [inputText, setInputText] = useState('')

    return (
        <form noValidate autoComplete="off" 
                onSubmit={e => {e.preventDefault()
                                props.getAllConcerts(inputText)}}>

            <TextField variant = 'outlined' color = 'secondary' label = 'Search' onChange={e => {setInputText(e.target.value)}}
                        type = 'text' value = {props.value} style = {props.style} size = 'large'
                        /* inputProps={{style: {fontSize: '1.5rem'}}} InputLabelProps={{style: {fontSize: '1.5rem'}}} */>

                <Button color = 'primary' type = 'submit'>
                    Click 
                </Button>

            </TextField>
        </form>
    )
}

export default Searchbar