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
        search : '', 
        inputText : '', 
      }
      this.getAllConcerts = this.getAllConcerts.bind(this)
      this.searchSubmit = this.searchSubmit.bind(this)
      this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)

  }

  shouldComponentUpdate (nextProps, nextState) {

    if (this.state.concerts !== nextState.concerts) {
      console.log('true', nextState)
      return true;
    } else {
      console.log('false')
      return false;
    }
  }

  getAllConcerts = (input) => {
    axios.get('/api/events/?'+ input)
    .then((response) => {
      this.setState(() => {return ({concerts : response.data,})})
      console.log(response.data, this.state.search)
    })
  };

  searchSubmit = (e) => 
      {e.preventDefault()
        this.setState({search : this.state.inputText})
        this.getAllConcerts(this.state.inputText)}


    render(){
      return(
        <div>  
            <Searchbar getAllConcerts = {this.getAllConcerts} onSubmit = {this.searchSubmit} onChange = {(e) => {this.setState({inputText : e.target.value})}}/>
            <SearchSpecification onClick = {this.getAllConcerts}/>
            <ConcertDisplay concerts = {this.state.concerts}/>
        </div>
      )}
}



export default App;
