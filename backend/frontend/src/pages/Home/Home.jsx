import React, {Component, useLayoutEffect, useState} from 'react'
import {Typography} from '@mui/material'

import SearchBar from '../../components/searchbar'
import Datepicker from '../../components/Datepicker'

import './Home.css'
import ConcertItem from '../../components/ConcertItem/ConcertItem';
import GridItemHome from '../../components/GridItemHome';
import moment from 'moment';
import axios from 'axios'
import {/* composerFullName, artists, */ cities} from '../../Assets/data/constants.js'


function RenderConcerts(props){

    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        function updateWidth() {
        setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);
    
    return(
        <div style = {{'maxWidth' : '90%', 'minWidth': '70%', 'marginTop': '2rem', }}>
            {props.concerts.length > 0 ?
            
            props.concerts.slice(0, props.index).map((concert) =>
            <ConcertItem id = {concert.id} concert = {concert} query = {''} pieceQuery = {''} textColor = {'black'}
                        width = {width}/>
                
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

        axios.get('http://192.168.1.83:8000/api/events/?'+ date + '&' + this.state.city + '&' + input)
        .then((response) => {

        this.setState({allConcerts : response.data, allQueryConcerts : response.data})
        })
    };

    render(){ 
        return(
        <div id = 'title-details' class = 'detailsContainer'>
            <Typography variant = 'h3' style = {{'marginBottom': '2rem', }}>
                Konzertsuche leicht gemacht.
            </Typography>
            <div ref = {this.props.concertRef} class = 'sticky'>
                <Datepicker/>
                <GridItemHome item = {cities} header = {'Stadt'} /> 
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
