import {Card, Typography, Button} from '@mui/material'
import {makeStyles} from '@material-ui/core/styles';
import IMG_0136 from './images/IMG_0136.jpg'

import {ExpandMore} from '@mui/icons-material'

import moment from 'moment'


const styles = makeStyles({
  'wrapper' : {
    'width' : '95%', 
  },
  'card' : { 
    'minHeight' : '20rem', 
    'marginTop' : '5rem', 
    'marginBottom' : '5rem',  
    'display' : 'flex', 
    'flexDirection' : 'row', 
  },
    'leftside' : {
      'display' : 'flex', 
      'flexDirection' : 'row',
      'width' : '20%'
    }, 
    'leftsideTextWrap' : {
      'display' : 'flex', 
      'justifyContent' : 'flex-start', 
      'alignItems' : 'center', 
      'width' : '15%', 
      'marginRight' : '2%', 
      'marginLeft' : '2%'
    }, 
    'leftsideText' : {
      'writingMode' : 'vertical-lr',
      'transform' : 'rotate(-180deg)',
      'textAlign' : 'center', 
      'fontWeight' : 'bold', 
      'fontSize' : '1.3rem'
    }, 
    'leftsidePictureWrap' : {
      'display' : 'flex', 
      'alignItems' : 'center',
      'justifyContent' : 'space-evenly', 
      'flexDirection' : 'column'
    }, 
    'leftsidePictureDate' : {
      'textAlign' : 'center', 
      'fontWeight' : 'bold', 
      'fontSize' : '1rem'
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
  let formattedDateTime = moment(concert.date).format('DD. MMM YYYY - HH:mm')

  return(
    <div className= {classes.wrapper}>
      <Card className = {classes.card}>

        <div className = {classes.leftside}>

          <div className = {classes.leftsideTextWrap}>

            <Typography  className = {classes.leftsideText}>
              {concert.city}
            </Typography>

          </div>
          <div className = {classes.leftsidePictureWrap}>
            <Typography className = {classes.leftsidePictureDate}>
               {formattedDateTime} 
            </Typography>
            <img src = {IMG_0136} alt = '' style = {{'width' : '100%'}}/>
          </div>

        </div>

        <div className = {classes.rightside}>
          <div style = {{'display' : 'flex', 'flexDirection' : 'column', 'height' : '100%', }}>
            
            <div id = {'title'} style = {{'display' : 'flex', 'justifyContent' : 'space-between', 'flexDirection' : 'column',}}>
              <div style = {{'display' : 'flex', 'justifyContent' : 'space-between', 'paddingTop' : '3%'}}>
                <Typography id = {'ensemble'} style = {{'marginBottom' : '1%'}} variant = {'h5'}>{concert.ensemble}</Typography>
                <Button variant="contained" href = {concert.link}>
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
            
            <div style = {{'borderTop' : 'solid', 'paddingTop' : '2%', 'paddingBottom' : '2%'}}>
              {composers.map(
              (composer, index) =>
              
              <div style = {{'display' : 'flex', 'paddingTop' : '1%'}}>
                <Typography style = {{'width' : '20%', 'fontWeight' : 'bold', 'marginRight' : '2%'}}> 
                  {composer}
                </Typography>
                <div style = {{'width' : '70%'}}>
                  {concert.pieces[index].map(
                    (piece) => <Typography key = {piece} style = {{'fontStyle' : 'italic'}}>{piece}</Typography>
                  )}
                </div>
              </div>
              )
              }
            </div>

            {
              concert.composers.length === 0 && 
                <td> {concert.pieces} </td>
            }
            {/* <div id = {'composersPieces'}>{concert.composers + ' - ' + concert.pieces}</div> */}
          </div>
        </div>
      </Card>
    </div>
  )
}



export default ConcertItem;



{/* <div style = {{display : 'flex', justifyContent : 'center', }}>
      <Card style = {{width : '60%', marginTop : '1rem', marginBottom : '1rem', paddingTop : '1rem', paddingBottom : '1rem'}}>
          <div>
            {concert.city}
          </div>
          <Accordion> 
            <AccordionSummary
            expandIcon={<ExpandMore/>}
            aria-controls="panel1a-content"
            id= {concert.id}
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
                            (musician) => <p key = {musician}>{musician + ' - ' + concert.musicians[musician]}</p>
                          )}</td>
                      </tr>
                      <tr>
                          <th>Pieces</th>
                              {
                                composers.map(
                              (composer, index) => <td key = {composer + index}> <b>{composer} </b> <br></br> 

                              {concert.pieces[index].map(
                                (piece) => <p key = {piece}>{piece}</p>
                              )} 
                              </td>)
                              }
                              {
                                concert.composers.length === 0 && 
                                  <td> {concert.pieces} </td>
                              }
                      </tr>
                      <tr>
                        <th>
                          <a href= {concert.link}> Details</a>
                        </th>
                      </tr>
                    </tbody>
            </table>
          </Accordion>
      </Card>
    </div> */}