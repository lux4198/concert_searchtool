import React, {Component, useLayoutEffect, useState} from 'react'
import {Typography, Button, Collapse} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

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
            query : '', 
            city: '', 
            type : '', 
            today : new Date(), 
            date : new Date(), 
            index : 10, 
            reset : false, 
            apiUrl : /* 'http://192.168.1.83:8000 */'http://127.0.0.1:8000/api/events/?', 
            currentFilters : '', 
            collapse : true,
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

    componentDidUpdate(prevProps, prevState){
        if(this.props.query !== prevProps.query){
            this.setState({query : this.props.query} , () => {this.getAllQueryConcerts()})
        }
        if(this.state.city !== prevState.city || this.state.date !== prevState.date || this.state.query !== prevState.query)
        this.setFilters()
    }

    handleScroll = (e) => {
        const el = e.target.documentElement
        const bottom = Math.floor(el.scrollHeight - el.scrollTop) <= el.clientHeight + 10;

        if (bottom) { 
            this.setState(() => {return({index : this.state.index + 10})}, this.getAllQueryConcerts())
            }
        }


    //   api call that runs once to get all available concerts for searchbar 
    getAllConcerts = () => {
    // date is either specified date from datePicker or default new(Date), so today 
    const date = 'date=' + moment(this.state.date).format('YYYY-MM-DD HH:mm')
    const index = 'n=' + this.state.index
    axios.get('/api/events/?' + date + '&' + index)
    .then((response) => {
    this.setState({allConcerts : response.data},)
    }).catch(() => console.log('error'))
    };

    // function responsible for making the api call to get the concert items matching the query  
    getAllQueryConcerts = () => {
        // date is either specified date from datePicker or default new(Date), so today 
        const date = 'date=' + moment(this.state.date).format('YYYY-MM-DD HH:mm')
        const index = 'n=' + this.state.index

        axios.get(/* this.state.apiUrl */ '/api/events/?' + date + '&' + index + '&city=' + this.state.city + '&q=' + this.state.query + '&type=' + this.state.type)
        .then((response) => {

        this.setState({allQueryConcerts : response.data})
        }).catch(() => console.log('error'))
    };

    setType(query){
        this.setState({type : query}, () => this.getAllQueryConcerts())
    }

    setCity(query){
        this.setState({city : query}, () => this.getAllQueryConcerts())
    }

    setDate = (date) => {
        this.setState({date : date}, () => this.getAllQueryConcerts())
    }

    setQuery = (value) => {
        value = value || ''
        this.setState({query : value},() => this.getAllQueryConcerts())
    }

    setFilters = () => {
        this.setState({currentFilters : [this.state.city.split(',').filter(i => i), this.state.query, 
                        (moment(this.state.date).format('YYYY-MM-DD') !== moment(this.state.today).format('YYYY-MM-DD'))? moment(this.state.date).format('YYYY-MM-DD') : ''], 
                        index : 10})
    }

    render(){ 
        return(
        <div id = 'title-details' class = 'detailsContainer' ref = {this.props.concertRef}>
            <Typography variant = 'h2' style = {{'marginBottom': '4rem', 'marginTop': '3rem'}}>
                Konzertsuche leicht gemacht.
            </Typography>
            <div  class = 'sticky' style = {{'width' : this.state.collapse? '80%' : '50px',}}>
                <Button onClick = {() => this.setState({ collapse : !this.state.collapse})} style = {{'width' : '10%', }}>
                    <MenuIcon style = {{'color' : 'white'}} />
                </Button>
                <Collapse in = {this.state.collapse}>
                    <div class = 'collapseItems'>
                        <Datepicker onChange = {this.setDate} value = {this.state.date} />
                        <GridItemHome item = {['Kammermusik', 'Orchestermusik']} header = 'Konzertart' onClick = {(query) => this.setType(query)} reset = {this.state.reset}/>
                        <GridItemHome item = {cities} header = {'Stadt'} onClick = {(query) => this.setCity(query)} reset = {this.state.reset} />
                        <Button style = {{'color': 'white', 'textTransform': 'none', 'width': '55%', 'background': '#C88861', 'padding' : '0px',
                                          'borderRadius': '20px', 'minWidth' : '100px', 'maxWidth' : '35%',
                                        'display': this.state.city ||
                                        (moment(this.state.date).format('YYYY-MM-DD HH:mm') !== moment(new Date()).format('YYYY-MM-DD HH:mm') || this.state.query || this.state.type)?
                                        'flex': 'none'}}
                                        onClick = {() => this.setState(
                                            {city : '',
                                             date : new Date(),
                                             query : '',
                                             type : '',
                                             reset : true }, () => {
                                                 this.setState({reset : false});
                                                 this.getAllQueryConcerts();
                                                 this.props.scrollToTop()
                                                }
                                                 )}>
                            <Typography>Filter <br/>Zurücksetzen</Typography>
                        </Button>
                    </div>
                </Collapse>
            </div>
            <div style = {{'background' : '#fff', 'borderRadius' : '20px', 'width' : '80%', 
                                                        'border' : '2px solid black', 'marginTop' : '30px',}}>
                <SearchBar label = {'Ensemble, Komponist, Dirigent, Stück'} multiple = {false}
                    concerts = {this.state.allConcerts} 
                    onSubmit = {this.setQuery} value = {this.state.query}/>
            </div>
            <RenderConcerts concerts = {this.state.allQueryConcerts} index = {this.state.index} query = {this.state.query}/>
        </div>
    )
}

}
export default Home
