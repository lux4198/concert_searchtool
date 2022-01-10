import React from 'react'
import { TextField } from '@material-ui/core'

function Searchbar(props) {
    return (
        <TextField variant = 'outlined' color = 'secondary' label = 'Search' 
                    onChange = {props.onChange} type = 'text' value = {props.value} style = {props.style} size = 'large'
                    /* inputProps={{style: {fontSize: '1.5rem'}}} InputLabelProps={{style: {fontSize: '1.5rem'}}} */>

            <input/> 

        </TextField>
    )
}

export default Searchbar