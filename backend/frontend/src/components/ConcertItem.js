import {Card, Typography, Button} from '@mui/material'
import {makeStyles} from '@material-ui/core/styles';
import IMG_0136 from '../Assets/images/IMG_0136.jpg'


import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')


const styles = makeStyles({
  'wrapper' : {
    'width' : '100%', 
  },
  'card' : { 
    'minHeight' : '17rem', 
    'marginTop' : '2rem', 
    'marginBottom' : '2rem',  
    'paddingRight' : '2rem', 
    'display' : 'flex', 
    'flexDirection' : 'column', 
    'background' : 'white',
    'color' : 'black', 
    'border' : '8px solid #F0C035',
    'borderRadius' : '110px',
    'padding' : '15px',    


  },
    'leftside' : {
      'width' : '18%', 
      'display' : 'flex', 
      'flexDirection' : 'column',
      'paddingLeft' : '15px', 
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
    },
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
  let formattedTime = moment(concert.date).format('HH:mm')

  return(
    <div className= {classes.wrapper}>
      <Card className = {classes.card} >
        <div style = {{'display' : 'flex',}}>
          <div style = {{'width' : '18%', 'paddingLeft' : '1%'}}></div>
          <div id = {'title'} style = {{'display' : 'flex', 'justifyContent' : 'space-between', 'flexDirection' : 'row', 
                                        'paddingTop' :'2%', 'marginLeft' : '2%', 'marginRight' : '2%', 'width' : '80%'}}>
              <Typography id = {'ensemble'} className = {checkHighlight(concert.ensemble)} style = {{'marginBottom' : '1%',}}
                          variant = {'h5'} color = {props.textColor}> {concert.ensemble} </Typography>
          
              <Button variant="contained" target="_blank" href = {concert.link} style = {{'height' : '40px', 'background' : '#10273d',}}>
                Details
              </Button>
          </div>
        </div>

        <div id = 'leftrightside' style = {{'display' : 'flex'}}>
          <div className = {classes.leftside}>
              <div style = {{'display' : 'flex', 'flexDirection' : 'column', 'paddingLeft' : '25px',
                              'paddingBottom' : '10%', }}>
                <Typography color = {props.textColor} variant = 'h6' style = {{'fontWeight' : 'bold'}}>
                  {formattedWeekday}
                </Typography>
                <Typography color = {props.textColor} variant = 'h6' style = {{'fontWeight' : 'bold'}}>
                   {formattedDate}
                </Typography>
                <Typography color = {props.textColor} variant = 'h6' style = {{}}>
                  {formattedTime + ' Uhr'}
                </Typography>
              </div>
              <div style = {{'display' : 'flex', 'justifyContent' : 'space-between'}}>
                <Typography  color = {props.textColor} className = {classes.leftsideText} style = {{'paddingLeft' : '3%'}}variant = 'h5'>
                  {concert.city}
                </Typography>
                <img src = {IMG_0136} alt = '' />
              </div>
          </div>
          <div className = {classes.rightside}>
            <div style = {{'display' : 'flex', 'flexDirection' : 'column', 'height' : '100%', }}>
          
              <div id = 'musicians' style = {{'display' : 'flex', 'flexDirection' : 'column', 'paddingBottom' : '2%'}}>
                  <div id = 'conductor' style = {{'display' : 'flex', 'flexDirection' : 'row'}}>
                    <Typography color = {props.textColor} className = {checkHighlight(concert.conductor)} style = {{'fontWeight' : 'bold', 'marginRight' : '2%'}}> {concert.conductor} </Typography>
                    <Typography color = {props.textColor} > {concert.conductor === '' ? '':'Dirigent'}</Typography>
                  </div>
                {Object.keys(concert.musicians).map((musician) =>
                    <div style = {{'display' : 'flex'}}>
                      <Typography color = {props.textColor} className = {checkHighlight(musician)} style = {{'fontWeight' : 'bold', 'marginRight' : '2%'}}> {musician} </Typography>
                      <Typography color = {props.textColor} > {concert.musicians[musician]}</Typography>
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
                          <Typography color = {props.textColor} className = {checkHighlight(composer)} style = {{'fontWeight' : 'bold', 'textAlign' : 'left'}}>
                            {pieceIndex > 0 ? '' : composer}
                          </Typography>
                        </td>
                        <td>
                          <Typography color = {props.textColor} className = {checkHighlight(piece)} style = {{'fontStyle' : 'italic', 'textAlign' : 'left'}}>
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
        </div>
      </Card>
    </div>
  )
}

export default ConcertItem;