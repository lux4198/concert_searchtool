import React from 'react'
import { TextField, Autocomplete } from '@mui/material'

import { createFilterOptions } from '@mui/material/Autocomplete';

import { styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    color : 'white'
  },
  "& .MuiInputLabel-root.Mui-focused" : {
      color : 'white', 
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      color : 'white', 
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    }
  }
});


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getplaceholder(pieces, search_suggestion, label, concerts, inputText, composers){

    if (pieces && composers.includes(inputText)){
        var composer_pieces = getPiecesbyComposer(concerts, inputText)
        return(getPiecesbyComposer(concerts, inputText)[getRandomInt(composer_pieces.length)])
    }
    else if (pieces && search_suggestion){
        return('z.B. ' + pieces[getRandomInt(pieces.length)])
    }
    else if (search_suggestion){
        return('z.B. ' + search_suggestion[getRandomInt(search_suggestion.length)])
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
    limit : 5, 
})



function Searchbar(props) {
    const classes = props.classes

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

    const [inputValue, setInputValue] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        if (inputValue.length > 0) {
        setOpen(true);
        }
    };
    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        if (newInputValue.length > 0) {
        setOpen(true);
        } else {
        setOpen(false);
        }
    };

    return (
            <StyledAutocomplete
                open={open}
                onOpen={handleOpen}
                onClose={() => setOpen(false)}
                inputValue={inputValue}
                onInputChange={handleInputChange}

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
                    // variant = 'filled'
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