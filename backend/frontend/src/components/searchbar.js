import React, { useEffect } from 'react'
import { TextField, Autocomplete, Paper } from '@mui/material'

import { createFilterOptions } from '@mui/material/Autocomplete';

import { styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)({
    // these apply to a variant = filled component 
    '& .css-wb57ya-MuiFormControl-root-MuiTextField-root' : {
        border : '0px solid #F0C035', 
        borderRadius : '20px', 
    },
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    color : 'black', 
  },
  '& .css-usxwt7-MuiFormLabel-root-MuiInputLabel-root' : {
    fontSize : '1.5rem', 
  },
  '& .css-dslm2c-MuiFormLabel-root-MuiInputLabel-root': {
    //   label unfocused
      color : 'black', 
        },
    '& .css-1tvh079-MuiFormLabel-root-MuiInputLabel-root' : {
    // label unfocused with Text 
        color : 'transparent', 
    },
  "& .MuiInputLabel-root.Mui-focused" : {
    //   label focused
      color : 'transparent', 
  },
  "& .MuiAutocomplete-inputRoot": {
    //   placeholder und input text color
    // color: "#010645",
    color : 'black', 
    fontSize : '1.5rem', 
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent"
    },
  }, 
  '& .css-76lyfj-MuiInputBase-root-MuiFilledInput-root:after' : {
    //   bottom border animation on focus 
      borderBottom : ' 0px solid #F0C035', 
  }, 
  '& .css-1voj87v-MuiInputBase-root-MuiOutlinedInput-root:focus-visible' : {
      outline : '-webkit-focus-ring-color auto 0px', 
      border : 'white 0px', 
  }, 
  '& .css-1ljhe6a-MuiAutocomplete-root' : {
    outline : '-webkit-focus-ring-color auto 0px', 
  }, 
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
        else{
            return('')
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
        inputText = false 
        
    }
}
    const [inputValue, setInputValue] = React.useState(props.value);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setInputValue(props.value)
    }, [props.value])

    
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

                multiple = {props.multiple}
                freeSolo
                disableClearable
                filterOptions = {filterOptions}
                options={pieces && composers.includes(inputText) ? getPiecesbyComposer(props.concerts, inputText) : pieces ? pieces.map((option) => option) : 
                        search_suggestion ? search_suggestion.map((option) => option) : ''}

                onChange = {(event, value) => {props.onSubmit(value)}}

                PaperComponent={({ children }) => (
                    <Paper style={{ background: "#1A3E64", fontSize : '1.35rem'}}>{children}</Paper>
                  )}

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
                    // variant = 'outlined'
                    placeholder= {getplaceholder(pieces, search_suggestion, props.label, props.concerts, inputText, composers) }
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    style : {'borderRadius' : '20px',}
                    }}
                />
                )}
            />
    )
}

export default Searchbar