import axios from 'axios'
import {React, Component} from 'react'
import moment from 'moment';

import ConcertItem from "../components/ConcertItem.js";
import Searchbar from '../components/searchbar.js';
import Datepicker from '../components/Datepicker.js';
import SearchSpecification from '../components/SearchSpecification.js';
import CurrentFilters from '../components/CurrentFilters.js';

function RenderConcerts(props){
 return( props.concerts.length > 0 ? 

      <div style = {{'display' : 'flex', 'flexDirection' : 'column', 'alignItems' : 'center'}}>
        {props.concerts.slice(0, props.index).map((concert) =>
        <ConcertItem key = {concert.id} concert = {concert} query = {props.query} pieceQuery = {props.pieceQuery}/>)}
      </div>
      :
      <div>
        Search for conductor, composer, piece or musician.
      </div>)
}



class DetailedSearch extends Component {
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
        displayIndex : 10, 
      }
      this.getAllConcerts = this.getAllConcerts.bind(this)
      this.searchSubmit = this.searchSubmit.bind(this)

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
      this.setState({displayIndex : this.state.displayIndex + 10})
      // this.getAllConcerts(this.state.city + '&' + this.state.inputText + '&' + this.state.pieceInputText)
     }
  }

  // function responsible for making the api call to get the concert items matching the query  
  getAllConcerts = (input, didMount) => {
    // date is either specified date from datePicker or default new(Date), so today 
    const date = 'date=' + moment(this.state.date).format('YYYY-MM-DD HH:mm')

    // didMount variable is only given once in componentDidMount method -> purpose is to get all concerts on page load and save them in state
    if (didMount === true){
      axios.get('/api/events/?'+ date + '&' + input)
    .then((response) => {
      // console.log(response.data)
      this.setState({allConcerts : response.data, allQueryConcerts : response.data})
    })
    }
    // if didMount variable is not specified, only allQueryConcert is changed 
    else {
    axios.get('/api/events/?'+ date + '&' + input)
    .then((response) => {
      this.setState(() => {return ({allQueryConcerts : response.data})})
    })
  }
  };

  searchSubmit = (text) => 
      {
        this.setState({displayIndex : 10, inputText : 'q=' + text}, () => {
          this.getAllConcerts(this.state.city + '&' + this.state.inputText + '&' + this.state.pieceInputText);
        })
      }

  searchPiece = (text) => {
    var text = text.join('').replace(/"/g, '\\"')
    var input = this.state.city + '&' + this.state.inputText + '&p=' + text
    this.setState({index : 10, pieceInputText : 'p=' + text}, () => {this.getAllConcerts(input)})
  }
    

    render(){
      return(
        <div>
            {/* render searchbar for composers etc. and pieces  */}
            <Searchbar concerts = {this.state.allQueryConcerts} onSubmit = {this.searchSubmit} label = {'Search for Composer, Conductor, Artists or Ensemble'} piece = {false}/>
            <Searchbar concerts = {this.state.allQueryConcerts} onSubmit = {this.searchPiece} label = {'Search for piece'} piece = {true} inputText = {this.state.inputText}/>

            {/* searchspecification renders checkboxes for each city to narrow down the query for one or more cities */}
            <SearchSpecification onClick = {(text) => {this.getAllConcerts('city=' + text + '&' + this.state.inputText); this.setState({city : text});}}
            query = {this.state.inputText + '&' + this.state.pieceInputText} reset = {this.state.reset} handleReset = {() => {this.setState({reset : false})}} date = {this.state.date}/>
            
            {/* renders a Datepicked to show only concert from specified date  */}
            <div style = {{'display' : 'flex', 'flexDirection' : 'row',}}>
              <Datepicker value = {this.state.date} onChange = {(newDate) => {this.setState({date : newDate}, () => {this.getAllConcerts(this.state.city + '&' + this.state.inputText)})}}/>
              <CurrentFilters date = {this.state.date} city = {this.state.city} onClick = {() => {
                  this.setState({city : 'city=', date : new Date, reset : true}, () => {this.getAllConcerts(this.state.inputText + '&' + this.state.pieceInputText)})}}/>
            </div>

          {/* render concert items from state (only 10 at a time) */}

            <RenderConcerts concerts = {this.state.allQueryConcerts} index = {this.state.displayIndex} query = {this.state.inputText}
            pieceQuery = {this.state.pieceInputText} />
          
        </div>
      )}
}



export default DetailedSearch;
