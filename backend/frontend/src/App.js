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
        allQueryConcerts : [], 
        concerts : '', 
        inputText : '', 
        pieceInputText : 'p=', 
        city: 'city=', 
        date : new Date(), 
        resetFilter : false, 
        index : 10, 
      }
      this.getAllConcerts = this.getAllConcerts.bind(this)
      this.searchSubmit = this.searchSubmit.bind(this)

  }

  shouldComponentUpdate (nextProps, nextState) {

    if (this.state.concerts !== nextState.concerts | this.state.date !== nextState.date | this.state.index !== nextState.index
        | this.state.allConcerts !== nextState.allConcerts | this.state.allQueryConcerts !== nextState.allQueryConcerts | 
        this.state.pieceInputText !== nextState.pieceInputText) {
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
    const bottom = Math.floor(el.scrollHeight - el.scrollTop) === el.clientHeight;

    if (bottom) { 
      this.setState({index : this.state.index + 10})
      this.getAllConcerts(this.state.city + '&' + this.state.inputText + '&' + this.state.pieceInputText)
     }
  }

  getAllConcerts = (input, didMount) => {
    const date = 'date=' + moment(this.state.date).format('YYYY-MM-DD HH:mm')

    if (didMount === true){
      axios.get('/api/events/?'+ date + '&' + input)
    .then((response) => {
      this.setState(() => {return({allConcerts : response.data, allQueryConcerts : response.data})})
    })
    }

    else {
    const index = 'n=' + this.state.index
    axios.get('/api/events/?'+ index + '&' + date + '&' + input)
    .then((response) => {
      this.setState(() => {return ({concerts : response.data})})
    })
    axios.get('/api/events/?'+ date + '&' + input)
    .then((response) => {
      this.setState(() => {return ({allQueryConcerts : response.data})})
    })
  }
  };

  searchSubmit = (text) => 
      {
        this.setState({index : 10, inputText : 'q=' + text}, () => {this.getAllConcerts(this.state.city + '&' + this.state.inputText + '&' + this.state.pieceInputText)})
      }
  searchPiece = (text) => {
    var text = text.join('').replace(/"/g, '\\"')
    var input = this.state.city + '&' + this.state.inputText + '&p=' + text
    this.setState({index : 10, pieceInputText : 'p=' + text}, () => {this.getAllConcerts(input)})
  }
    

    render(){
      return(
        <div>  
            <Searchbar concerts = {(this.state.inputText === '' || 'q=')? this.state.allConcerts : this.state.concerts} onSubmit = {this.searchSubmit} label = {'Search for Composer, Conductor, Artists'} piece = {false}/>
            <Searchbar concerts = {this.state.allQueryConcerts} onSubmit = {this.searchPiece} label = {'Search for piece'} piece = {true} inputText = {this.state.inputText}/>

            <SearchSpecification onClick = {(text) => {this.getAllConcerts('city=' + text + '&' + this.state.inputText); this.setState({city : text});}}
            query = {this.state.inputText + '&' + this.state.pieceInputText} reset = {this.state.reset} handleReset = {() => {this.setState({reset : false})}} date = {this.state.date}/>
            
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
