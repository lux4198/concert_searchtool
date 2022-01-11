import axios from 'axios'
import {React, useEffect, useState} from 'react'
import moment from 'moment';

import ConcertItem from "./components/ConcertItem.js";
import Searchbar from './components/searchbar.js';



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

  const [concerts, getConcerts] = useState('');

  const getAllConcerts = (input) => {
    axios.get('/api/events/?'+ input)
    .then((response) => {
      getConcerts(response.data)
      console.log(response.data)
    })
  }

    return(
      <div>  
          <Searchbar getAllConcerts = {getAllConcerts}/>

          <ConcertDisplay concerts = {concerts}/>
      </div>
      )
}



export default App;
