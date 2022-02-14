import {React, Component, createRef} from 'react'

import Home from './pages/Home/Home.jsx';
import NavBar from './components/NavBar.js'

import concerts from './Assets/data/concerts.json'

import './App.css'
import MainPageSearch from './components/MainPageSearch.js';
// import { Collapse } from '@mui/material';


class App extends Component {
  constructor(){
    super();
      this.state = {
        allConcerts : concerts, 
        allQueryConcerts : concerts, 
        inputText : '', 
        city: 'city=', 
        date : new Date(),  
      }
      this.concertRef = createRef()
  }


  onSubmit = (value) => {
    this.setState({inputText : value});
    this.concertRef.current.scrollIntoView({ behavior : 'smooth'});
  }

  // componentDidMount(){
  //   this.getAllConcerts(this.state.city)
  // }

    render(){
      // console.log(this.state.inputText)
      return(
        <section>
          <div id = 'App' class = 'container'>
            <div class = 'mainpage'>
              <NavBar/>
              <MainPageSearch  concerts = {this.state.allConcerts}
                              onSubmit = {this.onSubmit}
                              inputText = {this.state.inputText} />
              <div class = 'background' style = {{'padding' : '10%'}}>
                {Array(28).fill(6).map((item, index) =>
                  <div>
                    <span class = 'blackkeys' style = {{'left' : (index * 3.5).toString() + 'vw', 'opacity' : (index%7===0 | (index+3)%7 === 0)? '0' : '1',
                                     'height' : (13.69-11.99*(0.894**index)).toString() + 'vw' }}/>
                    <span class = 'whitekeys' style = {{'left' : (index * 3.5 + 1).toString() + 'vw',
                                    'height' : (17.2-14*(0.89**index)).toString() + 'vw' }}/>
                  </div>)}
              </div>
            </div>
            <section class = 'details'>
                <div class = 'content'>
                  <Home concertRef = {this.concertRef} query = {this.state.inputText} inputText = {this.state.inputText}/>
                </div>
            </section>
            <div id = 'footer' style = {{'marginTop' : '200px'}}></div>
          </div>
        </section>
        // <DetailedSearch/>
      )}
}



export default App;
