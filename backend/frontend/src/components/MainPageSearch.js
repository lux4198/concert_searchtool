import React from 'react'
import { Typography } from '@mui/material';

import SearchBar from './searchbar';


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

function MainPageSearch(props) {
    return (
        <div id = 'title-page'  class = 'MainPageSearch'>
                      <Typography variant = 'h2'>
                          Wer spielt
                          <div class = 'rw-words rw-words-1'>
                              {shuffleArray(composerArray).map((composer, index) =>
                                  {   const delay = (index * 4).toString() + 's'
                                      return(
                                      <Typography color = 'secondary' variant = {composer.length > 8? 'h3' : 'h2'} style = {{'animationDelay' : delay}}>
                                          {composer} 
                                      </Typography>
                                      )}
                                                      )}
                          </div>
                      </Typography>
                  <Typography variant = 'h5'>
                      Suche aus über 1000 klassichen Konzerten in ganz Deutschland.
                  </Typography>
                  <div style = {{'background' : '#fff', 'borderRadius' : '20px'}}>
                      <SearchBar label = {'Ensemble, Komponist, Dirigent, Stück'} multiple = {false} value = {props.inputText}
                                  concerts = {props.concerts}
                                  onSubmit = {props.onSubmit}
                                  />
                  </div>
              </div>
    )
}

export default MainPageSearch
