import React from 'react'
import {Typography, Box} from '@mui/material'
import SearchBar from '../components/searchbar'
import './Home.css'

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

const homeStyle = {
    marginTop : '60px',  
    display : 'flex', 
    justifyContent : 'center', 
    height : '100%', 
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function Home(props) {
    
    return (
        <div id = 'home' style = {homeStyle}>
            
            <div id = 'main-content' style = {{'display' : 'flex', 'flexDirection' : 'column', 
                                                'textAlign' : 'center', 'justifyContent' : 'space-evenly',
                                                'width' : '60%'}}>
                    <Typography variant = 'h2' style = {{'marginBottom' : '30px', 'textAlign' : 'start'}}>
                        Wer spielt 

                        <div class = 'rw-words rw-words-1'>
                            {composerArray.map((composer, index) =>
                                {   const delay = (index * 4).toString() + 's'
                                    return(
                                    <Typography color = 'secondary' variant = 'h2' style = {{'animationDelay' : delay, 'display' : 'inline', }}>
                                        {composer}
                                    </Typography>)}
                                                    )}
                        </div>

                    </Typography>
                <Typography variant = 'h5' style = {{'marginBottom' : '50px'}}>
                    Suche aus über 1000 klassichen Konzerten in ganz Deutschland. 
                </Typography>
                <div style = {{'background' : '#fff', 'border' : 'solid #99BFD0'}}>
                    <SearchBar label = {'Ensemble, Komponist, Dirigent, Stück'}
                                concerts = {props.concerts}/>
                </div>
            </div>



        </div>
    )
}

export default Home
