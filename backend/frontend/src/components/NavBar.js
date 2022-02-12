import { Toolbar, Typography } from '@mui/material'
import React from 'react'   
import concerto_logo from '../Assets/images/concerto_logo.png';

function NavBar() {
    return (
            <div style = {{'width' : '80%'}}>
                <Toolbar position = 'sticky' color = 'primary'
                        style = {{'width' : '50%', 'marginTop' : '10px'}}>
                
                    <img src = {concerto_logo} style = {{'maxWidth' : '150px', 'width' : '40%', 'minWidth' : '100px'}} alt = ''></img>
                    <Typography component = 'div' variant = 'body1' style = {{'marginLeft' : '20px',}}>
                        Erweiterte Suche
                    </Typography>
                </Toolbar>
            </div>
    )
}

export default NavBar
