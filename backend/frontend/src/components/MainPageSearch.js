import React from 'react'
import { Typography } from '@mui/material';

import SearchBar from './searchbar';
import { shuffleArray } from '../Helpers/helperFunctions';
import { composerArray } from '../Assets/data/constants';


function MainPageSearch(props) {
    return (
        <div id = 'title-page'  class = 'MainPageSearch'>
                    <Typography variant = 'h2' style = {{'textAlign' : 'left', 'width': '80%'}}>
                        Wer spielt
                        <div class = 'rw-words rw-words-1'>
                            {shuffleArray(composerArray).map((composer, index) =>
                                {   const delay = (index * 4).toString() + 's'
                                    return(
                                    <Typography color = 'secondary' variant = {'h2'} style = {{'animationDelay' : delay}}>
                                        {composer} 
                                    </Typography>
                                    )}
                                                    )}
                        </div>
                    </Typography>
                  <Typography variant = 'h5' style = {{'textAlign': "center"}}>
                      Suche aus über 1000 klassichen Konzerten in ganz Deutschland.
                  </Typography>
                  <div style = {{'background' : '#fff', 'borderRadius' : '20px', 'width' : '100%', }}>
                      <SearchBar label = {'Ensemble, Komponist, Dirigent, Stück'} multiple = {false} value = {props.inputText}
                                  concerts = {props.concerts}
                                  onSubmit = {props.onSubmit}
                                  />
                  </div>
              </div>
    )
}

export default MainPageSearch
