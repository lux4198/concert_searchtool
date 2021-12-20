import axios from 'axios'
import {React, useEffect, useState} from 'react'

import ConcertItem from "./components/ConcertItem.js";


function ConcertDisplay(props){

  const concerts = props.concerts

  if (props.concerts.length > 0){
    return(
        concerts.map((concert) => 
          <ConcertItem header = {concert.date} subheader = {concert.ensemble + '  -  ' + concert.conductor} concert = {concert} /> 
        
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

function AllConcerts() {

  useEffect(() => {
    getAllConcerts();
  }, []);

  const [concerts, getConcerts] = useState('');

  const getAllConcerts = () => {
    axios.get('/api/events')
    .then((response) => {
      const allConcerts = response.data
      getConcerts(allConcerts)
    })
  }

  console.log(concerts)

    return(
      <div>
        <ConcertDisplay concerts = {concerts}/>
      </div>
    )
}

function App() {

    return(
      <div>
        <AllConcerts />
      </div>
    )
}



export default App;
