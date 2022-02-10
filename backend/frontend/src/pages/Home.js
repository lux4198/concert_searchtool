import React, {Component, useRef, forwardRef} from 'react'
import {Typography, Grid, Paper, Button, Box} from '@mui/material'

import SearchBar from '../components/searchbar'

import './Home.css'
import { styled } from "@mui/material/styles";
import ConcertItem from '../components/ConcertItem';
import GridItemHome from '../components/GridItemHome';
import moment from 'moment';
import axios from 'axios'


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

const months = [
    'Feb', 
    'Mär', 
    'Apr', 
    'Mai', 
    'Jun', 
    'Juli', 
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

function RenderConcerts(props){
    return(
        <div ref = {props.concertRef} style = {{'width' : '100%'}}>
            {props.concerts.length > 0 ?
            
            props.concerts.slice(0, props.index).map((concert) =>
            <ConcertItem id = {concert.id} concert = {concert} query = {''} pieceQuery = {''} textColor = {'primary'}/>
                
                ):
            <div>
                Leider keine Ergebnisse.
            </div>
            }
        </div>
    )
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

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

class Home extends Component {

    constructor(){
        super();
          this.state = {
            allConcerts : [], 
            allQueryConcerts : [], 
            inputText : '', 
            city: 'city=', 
            date : new Date(), 
            index : 10, 
          }
      }

      componentDidMount(){
        this.getAllConcerts(this.state.city)
      }

      componentDidUpdate(prevProps){
            if(this.props.query !== prevProps.query){
                this.setState({inputText : 'q=' + this.props.query} , () => {this.getAllConcerts('q=' + this.props.query)})
            }
      }

    // function responsible for making the api call to get the concert items matching the query  
    getAllConcerts = (input) => {
        // date is either specified date from datePicker or default new(Date), so today 
        const date = 'date=' + moment(this.state.date).format('YYYY-MM-DD HH:mm')

        axios.get('/api/events/?'+ date + '&' + this.state.city + '&' + input)
        .then((response) => {
        // console.log(response.data)
        this.setState({allConcerts : response.data, allQueryConcerts : response.data})
        })
    };

    render(){ 
        return(
        <section class = 'background'>
            <div id = 'home' style = {homeStyle.wrapper}>
                <div style = {homeStyle.detailsWrapper}>                    
                    <div id = 'title-details' style = {homeStyle.details}>
                        <Typography variant = 'h3'>
                            Konzertsuche leicht gemacht.
                        </Typography>
                        <Grid container spacing={1} style = {{'marginTop' : '10px', 'marginBottom' : '75px'}}>
                            <GridItemHome item = {cities} header = 'Stadt' 
                            onClick = {(text) => this.setState({city : 'city=' + text}, () => this.getAllConcerts(this.state.inputText))}/>
                            <GridItemHome item = {composerFullName} header = 'Komponist*in'
                            onClick = {(text) => this.setState({inputText : 'q=' + text}, () => this.getAllConcerts(this.state.inputText))}/>
                            <GridItemHome item = {artists} header = 'Künstler*in'
                            onClick = {(text) => {this.setState({inputText : 'q=' + text}, () => this.getAllConcerts(this.state.inputText))}
                            
                            }/>
                        </Grid>
                        <div style = {{'background' : '#fff', 'borderRadius' : '20px', 'width' : '80%'}}>
                            <SearchBar label = {'Ensemble, Komponist, Dirigent, Stück'} multiple = {false}
                                concerts = {this.state.allQueryConcerts} 
                                onSubmit = {(value) => console.log(value)} value = {this.props.inputText}/>
                        </div>
                        {/* <div>hello</div> */}
                        <RenderConcerts concertRef = {this.props.concertRef} concerts = {this.state.allConcerts} index = {this.state.index}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

}
export default Home
