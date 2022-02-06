import React, { useState } from 'react'
import { TextField, Autocomplete, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon } from '@mui/material'
import { Delete } from '@mui/icons-material';

import { createFilterOptions } from '@mui/material/Autocomplete';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getplaceholder(pieces, search_suggestion, label, concerts, inputText, composers){

    if (pieces && composers.includes(inputText)){
        var composer_pieces = getPiecesbyComposer(concerts, inputText)
        return(getPiecesbyComposer(concerts, inputText)[getRandomInt(composer_pieces.length)])
    }
    else if (pieces && search_suggestion){
        return('e.g. ' + pieces[getRandomInt(pieces.length)])
    }
    else if (search_suggestion){
        return('e.g. ' + search_suggestion[getRandomInt(search_suggestion.length)])
    }
    else{
        return(label)
    }
    }

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

function getPiecesbyComposer(concerts, composer){
    var pieces = concerts.map((concert) => {
        if (concert.composers.includes(composer)){
            var composers = concert.composers
            var index = getAllIndexes(composers, composer), i
            var piece = []
            for(i = 0; i < index.length; i++){
                piece.push(concert.pieces[index[i]])
            };
            return(piece)
        }
        
    })
    pieces = pieces.filter((item) => item !== undefined)

    pieces = pieces.concat.apply([], pieces)
    pieces = pieces.concat.apply([], pieces)
    pieces = [...new Set(pieces)]

    return(pieces)
}

const filterOptions = createFilterOptions({
    limit : 10, 
})


function Searchbar(props) {

    if (props.concerts){
    const concerts = props.concerts
    var composers = concerts.map((concert) => concert.composers)
    composers = [].concat.apply([], composers)
    composers = [...new Set(composers)]
    composers = composers.filter(composer => typeof(composer) === 'string')


    var conductors = concerts.map((concert) => concert.conductor)
    conductors = [...new Set(conductors)]

    var artists = concerts.map((concert) => concert.musicians)
    artists = artists.map((artist) => Object.keys(artist))
    artists = [].concat.apply([], artists)
    artists = [...new Set(artists)]

    var ensembles = concerts.map((concert) => concert.ensemble)
    ensembles = [...new Set(ensembles)]

    var search_suggestion = composers.concat(conductors, artists, ensembles)
    search_suggestion = [...new Set(search_suggestion)]

    if (props.piece){
        var pieces = concerts.map((concert) => concert.pieces)
        pieces = [].concat.apply([], pieces)
        pieces = [].concat.apply([], pieces)
        pieces = [...new Set(pieces)]
    }
    if (props.inputText){
        var inputText = props.inputText.replace('q=', '')
    }
    else{
        var inputText = false 
    }
}

    return (
            <Autocomplete
                multiple
                freeSolo
                disableClearable
                filterOptions = {filterOptions}
                options={pieces && composers.includes(inputText) ? getPiecesbyComposer(props.concerts, inputText) : pieces ? pieces.map((option) => option) : 
                        search_suggestion ? search_suggestion.map((option) => option) : ''}

                onChange = {(event, value) => {props.onSubmit(value)}}

                renderOption={(props, option) => {
                    return(
                        <li {...props}>
                            {option}
                        </li>
                        )
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label= {props.label}
                    placeholder= {getplaceholder(pieces, search_suggestion, props.label, props.concerts, inputText, composers) }
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