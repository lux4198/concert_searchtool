import React from 'react'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core';


function Searchbar(props) {

    return (
        <form noValidate autoComplete="off" 
                onSubmit={props.onSubmit}>

            <TextField variant = 'outlined' color = 'secondary' label = 'Search' onChange={props.onChange}
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