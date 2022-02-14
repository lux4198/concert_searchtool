import React, {Component} from 'react'
import {Typography, Grid} from '@mui/material'

import SearchBar from '../../components/searchbar'

import './Home.css'
import ConcertItem from '../../components/ConcertItem';
import GridItemHome from '../../components/GridItemHome';
import moment from 'moment';
import axios from 'axios'
import {composerFullName, artists, cities} from '../../Assets/data/constants.js'


function RenderConcerts(props){
    return(
        <div style = {{'width' : '100%',}}>
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
        <div id = 'title-details' class = 'detailsContainer'>
            <Typography variant = 'h3'>
                Konzertsuche leicht gemacht.
            </Typography>
            <div ref = {this.props.concertRef} class = 'sticky'>
                <Grid container spacing={1}>
                    <GridItemHome item = {cities} header = 'Stadt'
                    onClick = {(text) => this.setState({city : 'city=' + text}, () => this.getAllConcerts(this.state.inputText))}/>
                    <GridItemHome item = {composerFullName} header = 'Komponist*in'
                    onClick = {(text) => this.setState({inputText : 'q=' + text}, () => this.getAllConcerts(this.state.inputText))}/>
                    <GridItemHome item = {artists} header = 'Künstler*in'
                    onClick = {(text) => {this.setState({inputText : 'q=' + text}, () => this.getAllConcerts(this.state.inputText))}
                
                    }/>
                </Grid>
            </div>
            <div style = {{'background' : '#fff', 'borderRadius' : '20px', 'width' : '80%', 
                                                        'border' : '2px solid black', 'marginTop' : '30px',}}>
                <SearchBar label = {'Ensemble, Komponist, Dirigent, Stück'} multiple = {false}
                    concerts = {this.state.allQueryConcerts} 
                    onSubmit = {(value) => console.log(value)} value = {this.props.inputText}/>
            </div>
            <RenderConcerts concerts = {this.state.allConcerts} index = {this.state.index}/>
        </div>
    )
}

}
export default Home
