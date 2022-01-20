import React, { useState } from 'react'
import { TextField, Autocomplete } from '@mui/material'


function Searchbar(props) {

    const [value, setValue] = useState('')

    if (props.concerts){
    const concerts = props.concerts
    var composers = concerts.map((concert) => concert.composers)
    composers = [].concat.apply([], composers)
    composers = [...new Set(composers)]

    var conductors = concerts.map((concert) => concert.conductor)
    conductors = [...new Set(conductors)]
    var search_suggestion = composers.concat(conductors)
    search_suggestion = [...new Set(search_suggestion)]
}

    return (
        // <form noValidate autoComplete="off" 
        //         onSubmit={props.onSubmit}>
        //     <TextField variant = 'outlined' color = 'secondary' onChange={props.onChange} label = 'Search'
        //                 type = 'text' value = {props.value} style = {props.style} size = 'medium'/>
            <Autocomplete
                disableClearable
                options={search_suggestion ? search_suggestion.map((option) => {return(option)}): ''}
                onChange = {(event, value) => {props.onSubmit(value)}}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
                )}
            />
        // </form>
    )
}

export default Searchbar