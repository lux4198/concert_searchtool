import axios from 'axios'
import {React, useEffect, useState} from 'react'

import {Typography, Accordion, AccordionDetails, AccordionSummary} from '@mui/material'

import {ExpandMore} from '@mui/icons-material'

import moment from 'moment'


function Accordionobject(props){
  const concert = props.concert

  let formattedDate = moment(concert.date).format('DD. MMM YYYY')
  let formattedDateTime = moment(concert.date).format('DD. MMM YYYY - HH:mm')


  // console.log(concert)

  return(

  <Accordion> 
    <AccordionSummary
    expandIcon={<ExpandMore/>}
    aria-controls="panel1a-content"
    id="panel1a-header"
    >
      <Typography style = {{width : '15%'}}>{formattedDate}</Typography>
      <Typography style = {{ color: '#526268' }}>{props.subheader}</Typography>
    </AccordionSummary>
    <AccordionDetails style = {{display : 'flex', flexDirection : 'column',  }}></AccordionDetails>
    <table style = {{width : '100%'}}>
            <tbody style = {{textAlign : 'left', }}>
              <tr>
                  <th>Date</th>
                  <td>{formattedDateTime}</td>
              </tr>
              <tr>
                  <th>Ensemble</th>
                  <td>{concert.ensemble}</td>
              </tr>
              <tr>
                  <th>Conductor</th>
                  <td>{concert.conductor} </td>
              </tr>
              <tr>
                  <th>Artists</th>
                  <td>{Object.keys(concert.musicians).map(
                    (musician) => <p>{musician + ' - ' + concert.musicians[musician]} <br></br></p>
                  )}</td>
              </tr>
              <tr>
                  <th>Pieces</th>
                  <td>{concert.composers.map(
                    (composer) => <p> {composer} <br></br> 
                    
                    {concert.pieces[concert.composers.findIndex(item => composer === item)].map(
                      (piece) => <p>{piece + ', '}</p>
                    )} </p>
                  )}</td> 
              </tr>
              <tr>
                <th>
                  <td>
                    <a href= {concert.link}> Details</a>
                  </td>
                </th>
              </tr>
            </tbody>
    </table>
  </Accordion>
  )
}


function ConcertDisplay(props){

  const concerts = props.concerts

  if (props.concerts.length > 0){
    return(
        concerts.map((concert) => 
          <Accordionobject header = {concert.date} subheader = {concert.ensemble + '  -  ' + concert.conductor} concert = {concert} /> 
        
        )
    )
  }
  else {
    return(
      <div>
        Loading
      </div>
  )
}
}

function ConcertItem() {

  useEffect(() => {
    getAllConcerts();
  }, []);

  const [concerts, getConcerts] = useState('');

  const getAllConcerts = () => {
    axios.get('/api/events')
    .then((response) => {
      const allConcerts = response.data
      getConcerts(allConcerts)
    })
  }

  console.log(concerts)

    return(
      <div>
        <ConcertDisplay concerts = {concerts}/>
      </div>
    )
}



export default ConcertItem;
