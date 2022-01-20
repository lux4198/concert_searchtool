import axios from 'axios'
import {React, Component} from 'react'
import moment from 'moment';

import ConcertItem from "./components/ConcertItem.js";
import Searchbar from './components/searchbar.js';
import Datepicker from './components/Datepicker.js';
import SearchSpecification from './components/SearchSpecification.js';
import CurrentFilters from './components/CurrentFilters.js';
import { Button } from '@material-ui/core';



function ConcertDisplay(props){
  
  const concerts = props.concerts

  if (props.concerts.length > 0){
    return(
        concerts.map((concert) => 

        <ConcertItem key = {concert.id} header = {concert.date} subheader = {concert.ensemble + '  -  ' + concert.conductor}
        concert = {concert} /> 
    )
    )
  }
  else {
    return(
      <div>
        Search for conductor, composer, piece or musician.
      </div>
  )
}
}


class App extends Component {
  constructor(){
    super();
      this.state = {
        allConcerts : [], 
        concerts : '', 
        inputText : '', 
        city: 'city=', 
        date : new Date(), 
        resetFilter : false, 
        index : 10, 
      }
      this.getAllConcerts = this.getAllConcerts.bind(this)
      this.searchSubmit = this.searchSubmit.bind(this)
      this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)

  }

  shouldComponentUpdate (nextProps, nextState) {

    if (this.state.concerts !== nextState.concerts || this.state.date !== nextState.date | this.state.index !== nextState.index) {
      return true;
    } else {
      return false;
    }
  }

  

  componentDidMount(){
    this.getAllConcerts(this.state.city + '&' + this.state.inputText, true)
    this.getAllConcerts(this.state.city + '&' + this.state.inputText)
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const el = e.target.documentElement
    const bottom = el.scrollHeight - el.scrollTop === el.clientHeight;

    if (bottom) { 
      this.setState({index : this.state.index + 10})
      this.getAllConcerts(this.state.city + '&' + this.state.inputText)
     }
  }

  getAllConcerts = (input, didMount) => {
    // (didMount === undefined)? didMount = false : didMount = true

    const date = 'date=' + moment(this.state.date).format('YYYY-MM-DD HH:mm')

    if (didMount === true){
      axios.get('/api/events/?'+ date + '&' + input)
    .then((response) => {
      this.setState(() => {return ({allConcerts : response.data})})
      // console.log(response.data, this.state.search)
    })
    }

    else {
    const index = 'n=' + this.state.index
    axios.get('/api/events/?'+ index + '&' + date + '&' + input)
    .then((response) => {
      console.log(input)
      this.setState(() => {return ({concerts : response.data})})
      // console.log(response.data, this.state.search)
    })
  }
  };

  searchSubmit = (text) => 
      {
        this.setState({index : 10, inputText : 'q=' + text}, () => {this.getAllConcerts(this.state.city + '&' + this.state.inputText)})
      }
    

    render(){
      return(
        <div>  
            <Searchbar concerts = {this.state.allConcerts} onSubmit = {this.searchSubmit}
                        /* value = {} *//>

            <SearchSpecification onClick = {(text) => {this.getAllConcerts('city=' + text + '&' + this.state.inputText); this.setState({city : text});}}
            query = {this.state.inputText} reset = {this.state.reset} handleReset = {() => {this.setState({reset : false})}} date = {this.state.date}/>
            
            <div style = {{'display' : 'flex', 'flexDirection' : 'row',}}>
              <Datepicker value = {this.state.date} onChange = {(newDate) => {this.setState({date : newDate}, () => {this.getAllConcerts(this.state.city + '&' + this.state.inputText)})}}/>
              <CurrentFilters date = {this.state.date} city = {this.state.city} onClick = {() => {
                  this.setState({city : 'city=', date : new Date, reset : true}, () => {this.getAllConcerts(this.state.inputText)})}}/>
            </div>
           
            <ConcertDisplay concerts = {this.state.concerts} date = {this.state.date}/>
            <Button>
              ' '
            </Button>
        </div>
      )}
}



export default App;
