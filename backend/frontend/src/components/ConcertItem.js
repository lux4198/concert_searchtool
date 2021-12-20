import {Card, Typography, Accordion, AccordionDetails, AccordionSummary} from '@mui/material'

import {ExpandMore} from '@mui/icons-material'

import moment from 'moment'


function ConcertItem(props){
  const concert = props.concert

  let formattedDate = moment(concert.date).format('DD. MMM YYYY')
  let formattedDateTime = moment(concert.date).format('DD. MMM YYYY - HH:mm')

  // console.log(concert)

  return(
    <div style = {{display : 'flex', justifyContent : 'center', }}>
      <Card style = {{width : '60%', marginTop : '1rem', marginBottom : '1rem', paddingTop : '1rem', paddingBottom : '1rem'}}>
          <div>
            Hello There
          </div>
          <Accordion> 
            <AccordionSummary
            expandIcon={<ExpandMore/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
              <Typography style = {{width : '25%'}}>{formattedDate}</Typography>
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
      </Card>
    </div>
  )
}



export default ConcertItem;
