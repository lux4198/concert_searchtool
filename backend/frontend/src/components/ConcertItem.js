import {Card, Typography, Button} from '@mui/material'
import {makeStyles} from '@material-ui/core/styles';
import IMG_0136 from './images/IMG_0136.jpg'

import {ExpandMore} from '@mui/icons-material'

import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')


const styles = makeStyles({
  'wrapper' : {
    'width' : '95%', 
  },
  'card' : { 
    'minHeight' : '17rem', 
    'marginTop' : '2rem', 
    'marginBottom' : '2rem',  
    'display' : 'flex', 
    'flexDirection' : 'row', 
  },
    'leftside' : {
      'display' : 'flex', 
      'flexDirection' : 'column',
      'paddingRight' : '1%',
      'paddingLeft' : '1%', 
      'alignItems' : 'center',
      'paddingBottom' : '2%',
    }, 
    'leftsideText' : {
      'writingMode' : 'vertical-lr',
      'transform' : 'rotate(-180deg)',
      'textAlign' : 'right', 
    }, 
    'rightside' : {
      'width' : '80%', 
      'marginRight' : '2%',
      'marginLeft' : '2%',  
    }
})


function ConcertItem(props){
  const classes = styles()

  const concert = props.concert
  const composers = concert.composers

  let formattedDate = moment(concert.date).format('DD. MMM YYYY')
  let formattedWeekday = moment(concert.date).format('dddd')
  let formattedTime = moment(concert.date).format('HH:mm')

  return(
    <div className= {classes.wrapper}>
      <Card className = {classes.card}>

        <div className = {classes.leftside}>
            <div style = {{'display' : 'flex', 'flexDirection' : 'column', 'paddingTop' : '14%', 'paddingLeft' : '20%', 
                            'paddingBottom' : '10%', }}>
              <Typography variant = 'h6' style = {{'fontWeight' : 'bold'}}>
                {formattedWeekday}
              </Typography>
              <Typography variant = 'h6' style = {{'fontWeight' : 'bold'}}>
                 {formattedDate}
              </Typography>
              <Typography variant = 'h6' style = {{}}>
                {formattedTime + ' Uhr'}
              </Typography>
            </div>

            <div style = {{'display' : 'flex', 'justifyContent' : 'space-evenly'}}>
              <Typography  className = {classes.leftsideText} variant = 'h5'>
                {concert.city}
              </Typography>
              <img src = {IMG_0136} alt = '' />
            </div>
        </div>

        <div className = {classes.rightside}>
          <div style = {{'display' : 'flex', 'flexDirection' : 'column', 'height' : '100%', }}>
            
            <div id = {'title'} style = {{'display' : 'flex', 'justifyContent' : 'space-between', 'flexDirection' : 'column',}}>
              <div style = {{'display' : 'flex', 'justifyContent' : 'space-between', 'paddingTop' : '3%'}}>
                <Typography id = {'ensemble'} style = {{'marginBottom' : '1%'}} variant = {'h5'}>{concert.ensemble}</Typography>
                <Button variant="contained" target="_blank" href = {concert.link}>
                  Details
                </Button>
              </div>

                <div id = 'conductor' style = {{'display' : 'flex', 'flexDirection' : 'row'}}>
                  <Typography style = {{'fontWeight' : 'bold', 'marginRight' : '2%'}}> {concert.conductor} </Typography>
                  <Typography > {concert.conductor === '' ? '':'Dirigent'}</Typography>
                </div>
            </div>
            <div id = 'musicians' style = {{'display' : 'flex', 'flexDirection' : 'column', 'paddingBottom' : '2%'}}>
              {Object.keys(concert.musicians).map((musician) => 
                  <div style = {{'display' : 'flex'}}>
                    <Typography style = {{'fontWeight' : 'bold', 'marginRight' : '2%'}}> {musician} </Typography>
                    <Typography > {concert.musicians[musician]}</Typography>
                  </div>
                  )}
            </div>
            
            <div id = 'composerWrap' style = {{'borderTop' : 'solid', 'paddingTop' : '2%', 'paddingBottom' : '2%'}}>
              <table>
                {composers.map(
                  (composer, index) =>
                  concert.pieces[index].map(
                    (piece, pieceIndex) =>
                    <tr>
                      <td style = {{'whiteSpace' : 'nowrap', 'paddingRight' : '15px', 
                                    'paddingBottom' : '3px', 'verticalAlign' : 'top'}}>
                        <Typography style = {{'fontWeight' : 'bold'}}>
                          {pieceIndex > 0 ? '' : composer}
                        </Typography>
                      </td>
                      <td>
                        <Typography style = {{'fontStyle' : 'italic'}}>
                          {piece}
                        </Typography>
                      </td>
                    </tr>
                  )
                )}
                {
                  concert.composers.length === 0 && 
                    <td> {concert.pieces} </td>
                }
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ConcertItem;