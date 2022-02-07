import {React, Component} from 'react'
import DetailedSearch from './pages/DetailedSearch.js';
import Home from './pages/Home.js';

import moment from 'moment';
import axios from 'axios'




class App extends Component {
  constructor(){
    super();
      this.state = {
        allConcerts : [], 
        allQueryConcerts : [], 
        inputText : '', 
        city: 'city=', 
        date : new Date(), 
      }
  }

  componentDidMount(){
    this.getAllConcerts(this.state.inputText)
  }

  // function responsible for making the api call to get the concert items matching the query  
  getAllConcerts = (input) => {
    // date is either specified date from datePicker or default new(Date), so today 
    const date = 'date=' + moment(this.state.date).format('YYYY-MM-DD HH:mm')

      axios.get('/api/events/?'+ date + '&' + input)
    .then((response) => {
      // console.log(response.data)
      this.setState({allConcerts : response.data, allQueryConcerts : response.data})
    })
  };

    render(){
      return(
        <div id = 'App'>
          <Home concerts = {this.state.allConcerts} />
        </div>
        // <DetailedSearch/>
      )}
}



export default App;
