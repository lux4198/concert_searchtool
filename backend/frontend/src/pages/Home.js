import React from 'react'
import {Typography} from '@mui/material'
import SearchBar from '../components/searchbar'

const homeStyle = {
    color : 'white', 
    marginTop : '200px',  
    display : 'flex', 
    justifyContent : 'center', 
    height : '100%', 
}

function Home(props) {

    return (
        <div id = 'home' style = {homeStyle}>
            
            <div id = 'main-content' style = {{'display' : 'flex', 'flexDirection' : 'column', 
                                                'textAlign' : 'center', 'justifyContent' : 'space-evenly',
                                                'width' : '60%'}}>
                <Typography variant = 'h2' style = {{'marginBottom' : '30px'}}>
                    Wer spielt 
                    Beethoven ?
                </Typography>
                <Typography variant = 'h5' style = {{'marginBottom' : '30px'}}>
                    Suchen Sie aus über 1000 klassichen Konzerten in ganz Deutschland. 
                </Typography>
                <div >
                    <SearchBar label = {'Ensemble, Komponist, Dirigent'}
                                concerts = {props.concerts}/>
                </div>
            </div>



        </div>
    )
}

export default Home
