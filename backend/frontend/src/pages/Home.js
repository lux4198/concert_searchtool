import React from 'react'
import {Typography, Grid, Paper, Button, Box} from '@mui/material'
import SearchBar from '../components/searchbar'
import './Home.css'
import { styled } from "@mui/material/styles";
import { typography } from '@mui/system';
import ConcertItem from '../components/ConcertItem';


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

const composerFullName = [
    "Benjamin Britten",
    "Peter Tschaikowsky",
    "Georg Friedrich Händel",
    "Esa-Pekka Salonen",
    "Robert Schumann",
    "Sergej Rachmaninow",
    "Sergej Prokofjew",
    "Antonín Dvořák",
    "Modest Mussorgsky",
    "Franz Liszt",
    "Bedřich Smetana",
    "Jean Sibelius",
    "Giuseppe Verdi",
    "Edvard Grieg",
    "Camille Saint-Saëns",
    "Béla Bartók",
    "Edward Elgar",
    "Anton Bruckner",
    "Felix Janosa Janosa",
    "Dmitrij Schostakowitsch",
    "Ludwig van Beethoven",
    "Joseph Haydn",
    "Igor Strawinsky",
    "Antonio Vivaldi",
    "Johannes Brahms",
    "Johann Sebastian Bach",
    "Pjotr I. Tschaikowsky",
    "Richard Strauss",
    "Felix Mendelssohn Bartholdy",
    "Richard Wagner",
    "Wolfgang Amadeus Mozart",
    "Franz Schubert",
    "Sofia Gubaidulina",
    "Maurice Ravel",
    "Clara Schumann",
    "Gabriel Fauré",
    "Philip Glass",
    "Gustav Mahler",
    "Erich Wolfgang Korngold",
    "César Franck",
    "Arnold Schönberg",
    "Alexander Skrjabin",
]

const artists = [
    "Barbara Hannigan",
    "Daniel Hope",
    "Augustin Hadelich",
    "Sir András Schiff",
    "Anna Vinnitskaya",
    "Lisa Batiashvili",
    "Víkingur Ólafsson",
    "Ray Chen",
    "Janine Jansen",
    "WDR Rundfunkchor",
    "Jean-Yves Thibaudet",
    "Igor Levit",
    "Daniil Trifonov",
    "Yefim Bronfman",
    "Anne-Sophie Mutter",
    "Chen Reiss",
    "Yuja Wang",
    "Denis Matsuev",
    "Leonidas Kavakos",
    "Arthur Jussen",
]

const cities = [
    'Berlin', 
    'München', 
    'Hamburg', 
    'Dresden', 
    'Frankfurt', 
]

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color : 'black', 
    background : '#9fa6ae', 
    height : '350px', 
  }));

const homeStyle = {
    'wrapper' : {
        marginTop : '60px',  
        display : 'flex', 
        flexDirection : 'column', 
        justifyContent : 'center',
        alignItems: 'center',  
        height : '100%', 
    }, 
    'detailsWrapper' : {
        width : '100%', 
        display : 'flex', 
        justifyContent : 'center', 
        marginTop : '200px',
        backgroundColor : '#17334e', 

    },
    'details' : {
        paddingTop : '50px', 
        paddingBottom : '100px', 
        'width' : '80%',
        'display' : 'flex', 
        flexDirection : 'column', 
        justifyContent : 'center', 
        alignItems : 'center', 
        textAlign : 'center', 
    }, 


}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function shuffleArray(array) {
for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
}

function Home(props) {

    // composerArray now displays unique sequence for every render 
    shuffleArray(composerArray)
    shuffleArray(composerFullName)
    shuffleArray(artists)
    
    const concerts = props.concerts

    return (
        <div id = 'home' style = {homeStyle.wrapper}>
            
            <div id = 'title-page' style = {{'display' : 'flex', 'flexDirection' : 'column', 
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
                                    </Typography> )}
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

            <div style = {homeStyle.detailsWrapper}>
                <div id = 'title-details' style = {homeStyle.details}>
                    <Typography variant = 'h3'>
                        Konzertsuche leicht gemacht.
                    </Typography>
                    <Grid container spacing={4} style = {{'marginTop' : '40px',}}>
                        <Grid item xs={12} md={5} lg={4}>
                            <div style = {{'display' : 'flex', 'flexWrap' : 'wrap'}}>
                                
                                <div class = 'griditem firstitem' >
                                    <Typography variant = 'h4'>Stadt</Typography>
                                </div>
                                
                                {cities.map((city) => 
                                <div class = 'griditem subitem'>
                                    <Typography variant = 'h5'>{city}</Typography>
                                </div>)}

                            </div>
                        </Grid>
                        <Grid item xs={12} md={5} lg={4}>
                            <div style = {{'display' : 'flex', 'flexWrap' : 'wrap'}}>
                                <div class = 'griditem firstitem' >
                                    <Typography variant = 'h4'>Komponist:In</Typography>
                                </div>  
                                {composerFullName.slice(0,6).map((composer) => 
                                <div class = 'griditem subitem composeritem'>
                                    <Typography style = {{'marginLeft' : '2px', 'marginRight' : '2px', 'fontSize' : '1.2rem'}} variant = 'subtitle1'>{composer}</Typography>
                                </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5} lg={4}>
                            <div style = {{'display' : 'flex', 'flexWrap' : 'wrap'}}>
                                <div class = 'griditem firstitem' >
                                    <Typography variant = 'h4'>Musiker:In</Typography>
                                </div>
                                {artists.slice(0,6).map((artist) => 
                                <div class = 'griditem subitem composeritem'>
                                    <Typography style = {{'marginLeft' : '2px', 'marginRight' : '2px', 'fontSize' : '1.2rem'}} variant = 'subtitle1'>{artist}</Typography>
                                </div>
                                )}
                            </div>
                        </Grid>
                    </Grid>

                    {concerts.map((concert) => 
                        
                        <ConcertItem id = {concert.id} concert = {concert} query = {''} pieceQuery = {''} textColor = {'primary'}/>
                    
                    )}
                </div>
            </div>



        </div>
    )
}

export default Home
