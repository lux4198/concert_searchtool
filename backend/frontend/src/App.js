import {React, Component, useRef, createRef} from 'react'
import DetailedSearch from './pages/DetailedSearch.js';
import {Typography, Grid, Paper, Button, Box} from '@mui/material'
import SearchBar from './components/searchbar.js';

import Home from './pages/Home.js';
import NavBar from './components/NavBar.js'

import concerts from './concerts.json'

const composerArray = [
  "Bernstein",
  "Gershwin",
  "Beethoven",
  "Schostakowitsch",
  "Brahms",
  "Korngold",
  "Grieg",
  "Mozart",
  "Bruckner",
  "Strauss",
  "Mahler",
  "Schumann",
  "Mendelssohn",
  "Liszt",
  "Haydn",
  "Varèse",
  "Rachmaninow",
  "Strawinsky",
  "Bach",
  "Tschaikowsky",
  "Schubert",
  "Smetana",
  "Puccini",
  "Verdi",
  "Dvořák",
  "Prokofjew",
  "Wagner",
  "Schönberg",
  "Ravel",
  "Debussy",
  "Bartók",
  "Elgar",
  "Sibelius",
  "Weber",
  "Vivaldi",
  "Händel",
  "Rossini",
  "Bizet",
  "Britten",
  "Fauré",
  "Skrjabin",
  "Zemlinsky",
  "Saint-Saëns",
  "Mussorgsky",
  "Gubaidulina"
]

function shuffleArray(array) {
  var shuffleArray = array.slice(0)
for (var i = shuffleArray.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var temp = shuffleArray[i];
  shuffleArray[i] = shuffleArray[j];
  shuffleArray[j] = temp;
}
return(shuffleArray)
}


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

  // componentDidMount(){
  //   this.getAllConcerts(this.state.city)
  // }

    render(){
      // console.log(this.state.inputText)
      return(
        <div id = 'App'>
          <NavBar/>
          <div id = 'title-page' style = {{'display' : 'flex', 'flexDirection' : 'column',
                                              'textAlign' : 'center', 'justifyContent' : 'space-evenly',
                                              'width' : '60%'}}>
                  <Typography variant = 'h2' style = {{ 'fontFamily' : 'Merriweather serif', 'marginBottom' : '30px', 'textAlign' : 'start'}}>
                      Wer spielt
                      <div class = 'rw-words rw-words-1'>
                          {shuffleArray(composerArray).map((composer, index) =>
                              {   const delay = (index * 4).toString() + 's'
                                  return(
                                  <Typography color = 'secondary' variant = 'h2' style = {{'fontFamily' : 'Merriweather serif', 'animationDelay' : delay, 'display' : 'inline', }}>
                                      {composer}
                                  </Typography> )}
                                                  )}
                      </div>
                  </Typography>
              <Typography variant = 'h5' style = {{'marginBottom' : '50px'}}>
                  Suche aus über 1000 klassichen Konzerten in ganz Deutschland.
              </Typography>
              <div style = {{'background' : '#fff', 'borderRadius' : '20px'}}>
                  <SearchBar label = {'Ensemble, Komponist, Dirigent, Stück'} multiple = {false} value = {this.state.inputText}
                              concerts = {this.state.allConcerts} 
                              onSubmit = {(value) => {
                                this.setState({inputText : value}); 
                                this.concertRef.current.scrollIntoView({ behavior : 'smooth'});
                              }
                              }/>
              </div>
          </div>
          <Home concertRef = {this.concertRef} query = {this.state.inputText} inputText = {this.state.inputText}/>
          <div id = 'footer' style = {{'marginTop' : '200px'}}></div>
        </div>
        // <DetailedSearch/>
      )}
}



export default App;
