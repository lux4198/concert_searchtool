import React, { useState } from 'react'
import { TextField, Autocomplete } from '@mui/material'


function Searchbar(props) {

    if (props.concerts){
    const concerts = props.concerts
    var composers = concerts.map((concert) => JSON.parse(concert.composers))
    composers = [].concat.apply([], composers)
    composers = [...new Set(composers)]
    composers = composers.filter(composer => typeof(composer) === 'string')


    var conductors = concerts.map((concert) => concert.conductor)
    conductors = [...new Set(conductors)]

    var artists = concerts.map((concert) => concert.musicians)
    artists = artists.map((artist) => Object.keys(artist))
    artists = [].concat.apply([], artists)
    artists = [...new Set(artists)]

    var search_suggestion = composers.concat(conductors, artists)
    search_suggestion = [...new Set(search_suggestion)]
}

    return (
            <Autocomplete
                multiple
                freeSolo
                disableClearable
                options={search_suggestion ? search_suggestion.map((option) => {return(option)}): ''}
                onChange = {(event, value) => {props.onSubmit(value)}}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    placeholder='Search for Composer, Conductor, Artists'
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
                )}
            />
    )
}

export default Searchbar