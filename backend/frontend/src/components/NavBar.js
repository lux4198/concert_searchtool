import { Toolbar, Typography, makeStyles } from '@mui/material'
import { Button } from '@mui/material';
import React from 'react'   
import concerto_logo from './images/concerto_logo.png';

function NavBar() {
    return (
            <Toolbar position = 'sticky' color = 'primary' 
                    style = {{'width' : '50%', 'marginTop' : '10px'}}>
                
                <img src = {concerto_logo} style = {{width : '150px'}} alt = ''></img>

                <Typography component = 'div' variant = 'body1' style = {{'marginLeft' : '20px',}}>
                    Erweiterte Suche 
                </Typography>

            </Toolbar>
    )
}

export default NavBar
