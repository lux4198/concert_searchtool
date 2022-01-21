import React, { useState } from 'react'
import { TextField, Autocomplete } from '@mui/material'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getplaceholder(pieces, search_suggestion, label){

    if (pieces && search_suggestion){
        return('e.g. ' + pieces[getRandomInt(pieces.length)])
    }
    else if (search_suggestion){
        return('e.g. ' + search_suggestion[getRandomInt(search_suggestion.length)])
    }
    else{
        return(label)
    }
    }


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

    if (props.piece){
        var pieces = concerts.map((concert) => concert.pieces)
        pieces = [].concat.apply([], pieces)
        pieces = [].concat.apply([], pieces)
        pieces = [...new Set(pieces)]
        console.log(pieces.length)
    }
}

    return (
            <Autocomplete
                multiple
                freeSolo
                disableClearable
                options={pieces ? pieces.map((option) => option) : 
                        search_suggestion ? search_suggestion.map((option) => option) : ''}
                onChange = {(event, value) => {props.onSubmit(value)}}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label= {props.label}
                    placeholder= {getplaceholder(pieces, search_suggestion, props.label)}
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