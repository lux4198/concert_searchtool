import axios from 'axios'
import {React, useEffect, useState} from 'react'
import moment from 'moment';

import ConcertItem from "./components/ConcertItem.js";
import Searchbar from './components/searchbar.js';

import { Button } from '@material-ui/core';


function InputFunction(props) {
  return (
      <div>
        <Searchbar onChange = {e => {props.setInput(e.target.value)}}/>
        <Button color = 'primary' onClick = {props.onClick}>
          Click 
        </Button>
      </div>
  );
}


function ConcertDisplay(props){

  const concerts = props.concerts
  const now = moment()

  if (props.concerts.length > 0){
    return(
        concerts.map((concert) => 
          moment(concert.date) > now &&
          <ConcertItem key = {concert.id} header = {concert.date} subheader = {concert.ensemble + '  -  ' + concert.conductor} concert = {concert} /> 
    )
    )
  }
  else {
    return(
      <div>
        Loading
      </div>
  )
}
}


function App() {

  const [input, setInput] = useState('');
  // const input = ''

  useEffect((input) => {
    getAllConcerts(input);
  }, []);

  const [concerts, getConcerts] = useState('');

  const getAllConcerts = (input) => {
    axios.get('/api/events/?search='+ input)
    .then((response) => {
      getConcerts(response.data)
      console.log(response.data)
    })
  }

// console.log(concerts)

    return(
      <div>
        <InputFunction setInput = {setInput} onClick = {() => {getAllConcerts(input)}}/>
        <ConcertDisplay concerts = {concerts}/>
      </div>
      )
}



export default App;
