import { useState } from 'react';

import {Card, Typography, Button, Collapse} from '@mui/material'
import {makeStyles} from '@material-ui/core/styles';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import IMG_0136 from '../Assets/images/IMG_0136.jpg'

import './ConcertItem.css'


import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')


const styles = makeStyles({
    'highlighted' : {
      'backgroundColor' : '#FFFF00'
    }
})

// function CheckHighlight(text, query){
//   return(text.includes(query)? classes.highlighted : '')
// }


function ConcertItem(props){
  const classes = styles()

  const concert = props.concert
  const composers = concert.composers
  const [collapse, setCollapse] = useState(false)

  var query = props.query.replace('q=', '') + ',' + props.pieceQuery.replace('p=', '')

  query = query.split(',')

  const checkHighlight = (text) => {
    if(text&&query){
    return(query.includes(text)? classes.highlighted : '')
    }
    else{
      return('')
    }
  }

  let formattedDate = moment(concert.date).format('DD. MMM YYYY')
  let formattedWeekday = moment(concert.date).format('dddd')
  // let formattedTime = moment(concert.date).format('HH:mm')

  return(
      <Card class = 'card'  >

        <div class = 'citydate'>
          <Typography  color = {props.textColor} variant = 'h5'>
            {concert.city}
          </Typography>
          <div>
              <Typography color = {props.textColor} variant = 'h6' style = {{'fontWeight' : 'bold'}}>
                {`${formattedWeekday} - ${formattedDate}`}
              </Typography>
          </div>
        </div>

        <a target={'_blank'} rel="noreferrer"  href={concert.link}>
          <Typography id = {'ensemble'} className = {checkHighlight(concert.ensemble)} style = {{'marginBottom' : '1rem', 'marginTop': '1rem', 'textDecoration': 'underline'}}
                      variant = {'h5'} color = {'primary'}> {concert.ensemble} </Typography>
        </a>
          

        <div id = 'bottomside' class = 'cardbottom'>
              <div id = 'musicians' class = 'musicians'>
                <table>
                  <tr>
                    <td style = {{'whiteSpace': 'nowrap'}}>
                      <Typography color = {props.textColor} className = {checkHighlight(concert.conductor)} style = {{'fontWeight' : 'bold',}}> 
                        {concert.conductor} 
                      </Typography>
                    </td>
                    <td>
                      <Typography color = {props.textColor} > {concert.conductor === '' ? '':'Dirigent'}</Typography>
                    </td>
                  </tr>
                  {Object.keys(concert.musicians).map((musician) =>
                      {return(
                        <tr>
                          <td style = {{'whiteSpace': 'nowrap'}}>
                            <Typography color = {props.textColor} className = {checkHighlight(musician)} style = {{'fontWeight' : 'bold'}}> {musician} </Typography>
                          </td>
                          <td >
                            <Typography color = {props.textColor} > {concert.musicians[musician]}</Typography>
                          </td>
                        </tr>
                      )}
                      )}
                </table>
              </div>
          
              <div id = 'composerWrap' class = 'composerWrap'>
                <div class = 'composerExpand'>
                  <Button onClick = {() => setCollapse(!collapse)} style = {{'textTransform': 'none', 'display': 'block', 'padding': '0px'}}>
                    <Typography color = {props.textColor}>{`Werke von ${[...new Set(concert.composers)].join(', ')}`}</Typography>
                    <ExpandMoreIcon/>
                  </Button>
                </div>
                <Collapse in = {collapse}>
                  <table class = 'block'>
                    {composers.map(
                      (composer, index) =>
                      concert.pieces[index].map(
                        (piece, pieceIndex) =>
                        <div>
                          <tr >
                            <td style = {{'whiteSpace' : 'nowrap', 'paddingBottom' : '3px' }}>
                              <Typography color = {props.textColor} className = {checkHighlight(composer)} style = {{'fontWeight' : 'bold', 'textAlign' : 'center'}}>
                                {pieceIndex > 0 ? '' : composer}
                              </Typography>
                            </td>
                          </tr>
                          <tr >
                            <td>
                              <Typography color = {props.textColor} className = {checkHighlight(piece)} style = {{'fontStyle' : 'italic', 'textAlign' : 'center'}}>
                                {piece}
                              </Typography>
                            </td>
                          </tr>
                        </div>
                      )
                    )}
                    {
                      concert.composers.length === 0 &&
                        <td> {concert.pieces} </td>
                    }
                  </table>
                </Collapse>
              </div>
        </div>
      </Card>
  )
}

export default ConcertItem;