import axios from 'axios'
import {React, useEffect, useState} from 'react'
import moment from 'moment';

import ConcertItem from "./components/ConcertItem.js";
import Searchbar from './components/searchbar.js';


function InputFunction() {
  const [input, setInput] = useState('');
  return (
      <div>
        <Searchbar value = {input} onChange = {e => setInput(e.target.value)}/>
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

function AllConcerts(props) {

  useEffect(() => {
      getAllConcerts();
    }, []);

    const [concerts, getConcerts] = useState('');

    const getAllConcerts = () => {
      axios.get('/api/events/?search='+ props.search)
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
        <InputFunction/>
          {/* <AllConcerts search = /> */}
      </div>
    )
}



export default App;
