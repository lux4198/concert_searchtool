import axios from 'axios'
import {React, useEffect, useState, Component} from 'react'
import moment from 'moment';

import ConcertItem from "./components/ConcertItem.js";
import Searchbar from './components/searchbar.js';
import SearchSpecification from './components/SearchSpecification.js';



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


class App extends Component {
  constructor(){
    super();
      this.state = {
        concerts : '', 
      }
      this.getAllConcerts = this.getAllConcerts.bind(this)

  }

  // const [concerts, getConcerts] = useState('');

  getAllConcerts = (input) => {
    axios.get('/api/events/?'+ input)
    .then((response) => {
      this.setState({concerts : response.data})
      console.log(response.data)
    })
  };

    render(){
      return(
        <div>  
            <Searchbar getAllConcerts = {this.getAllConcerts}/>
            <SearchSpecification onClick = {this.getAllConcerts}/>
            <ConcertDisplay concerts = {this.state.concerts}/>
        </div>
      )}
}



export default App;
