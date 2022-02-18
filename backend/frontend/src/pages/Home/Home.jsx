import React, {Component, useLayoutEffect, useState} from 'react'
import {Typography, Button} from '@mui/material'

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
        <div style = {{'maxWidth' : '90%', 'minWidth': '80%', 'marginTop': '2rem', 'marginBottom': '5rem'}}>
            {props.concerts.length > 0 ?
            
            props.concerts.slice(0, props.index).map((concert, index) =>
                <ConcertItem id = {concert.id} concert = {concert}  pieceQuery = {''} textColor = {'black'}
                            width = {width} key = {index} query = {props.query}/>
                
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
            city: '', 
            date : new Date(), 
            index : 10, 
            reset : false, 
          }
      }

    componentDidMount(){
        this.getAllConcerts()
        this.getAllQueryConcerts()
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps){
        if(this.props.query !== prevProps.query){
            this.setState({inputText : this.props.query} , () => {this.getAllQueryConcerts()})
        }
    }

    handleScroll = (e) => {
        const el = e.target.documentElement
        const bottom = Math.floor(el.scrollHeight - el.scrollTop) <= el.clientHeight + 10;

        if (bottom) { 
            this.setState(() => {return({index : this.state.index + 10})})
            }
        }


    //   api call that runs once to get all available concerts for searchbar 
    getAllConcerts = () => {
    // date is either specified date from datePicker or default new(Date), so today 
    const date = 'date=' + moment(this.state.date).format('YYYY-MM-DD HH:mm')
    axios.get('http://192.168.1.83:8000/api/events/?'+ date)
    .then((response) => {
    this.setState({allConcerts : response.data})
    })
    };

    // function responsible for making the api call to get the concert items matching the query  
    getAllQueryConcerts = () => {
        // date is either specified date from datePicker or default new(Date), so today 
        const date = 'date=' + moment(this.state.date).format('YYYY-MM-DD HH:mm')

        axios.get('http://192.168.1.83:8000/api/events/?'+ date + '&city=' + this.state.city + '&q=' + this.state.inputText)
        .then((response) => {

        this.setState({allQueryConcerts : response.data})
        })
    };

    setCity(query){
        this.setState({city : query}, () => this.getAllQueryConcerts())
    }

    setDate = (date) => {
        this.setState({date : date}, () => this.getAllQueryConcerts())
    }

    setQuery = (value) => {
        value = value || ''
        this.setState({inputText : value},() => this.getAllQueryConcerts())
    }

    render(){ 
        return(
        <div id = 'title-details' class = 'detailsContainer'>
            <Typography variant = 'h2' style = {{'marginBottom': '4rem', 'marginTop': '3rem'}}>
                Konzertsuche leicht gemacht.
            </Typography>
            <div ref = {this.props.concertRef} class = 'sticky'>
                <Datepicker onChange = {this.setDate} value = {this.state.date} />
                <GridItemHome item = {cities} header = {'Stadt'} onClick = {(query) => this.setCity(query)} reset = {this.state.reset} />
                <Button style = {{'color': 'white', 'textTransform': 'none', 'width': '55%', 'background': '#C88861', 'zIndex': '-1','padding' : '0px', 'borderRadius': '20px',  
                                'display': this.state.city || 
                                (moment(this.state.date).format('YYYY-MM-DD HH:mm') !== moment(new Date()).format('YYYY-MM-DD HH:mm') || this.state.inputText)? 
                                'flex': 'none'}}
                                onClick = {() => this.setState({city : '', date : new Date(), inputText : '', reset : true }, () => {this.setState({reset : false}); this.getAllQueryConcerts()})}>
                    <Typography>Filter <br/>Zurücksetzen</Typography>
                </Button>
            </div>
            <div style = {{'background' : '#fff', 'borderRadius' : '20px', 'width' : '80%', 
                                                        'border' : '2px solid black', 'marginTop' : '30px',}}>
                <SearchBar label = {'Ensemble, Komponist, Dirigent, Stück'} multiple = {false}
                    concerts = {this.state.allConcerts} 
                    onSubmit = {this.setQuery} value = {this.state.inputText}/>
            </div>
            <RenderConcerts concerts = {this.state.allQueryConcerts} index = {this.state.index} query = {this.state.inputText}/>
        </div>
    )
}

}
export default Home
