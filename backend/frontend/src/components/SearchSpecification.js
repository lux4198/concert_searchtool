import React, {Component} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'

class SearchSpecification extends Component {
    constructor(){
        super();
        this.state = {
            bool : [true, true, true, true],
            city : 'city=',
            checked : [false, false, false, false], 
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query !== this.props.query) {
            this.check1().then(this.check2().then(this.check3().then(this.check4())))
        }
}

    updateBool(i, change){
        this.setState(state => {
          const list = state.bool.map((item, j) => {
            if (j === i) {
              return change;
            } else {
              return item;
            }
          });
          return ({
            bool : list,
          });
        });
      };

    updateChecked(i, change){
        this.setState(state => {
          const list = state.checked.map((item, j) => {
            if (j === i) {
              return change;
            } else {
              return item;
            }
          });
          return {
            checked : list,
          };
        });
      };

    checkConcerts(input, index){
        axios.get('/api/events/?'+ input + '&' + this.props.query)
        .then((response) => {
          if (response.data.length === 0){
              this.updateBool(index,false)
          }
          else{
            this.updateBool(index,true)
          }
        })
      };

    check1(){
        return new Promise((resolve) => {
            this.checkConcerts('city=Berlin', 0)
            resolve();
        })
    }
    check2(){
        return new Promise((resolve) => {
            this.checkConcerts('city=Hamburg', 1)
            resolve();
        })
    }
    check3(){
        return new Promise((resolve) => {
            this.checkConcerts('city=Munich', 2)
            resolve();
        })
    }
    check4(){
        this.checkConcerts('city=Frankfurt', 3)
    }


    CheckBoxonChange(event, city, index){
        
        this.updateChecked(index, event.target.checked)

        if (event.target.checked){
            this.setState({city : this.state.city + city}) 
            this.props.onClick(this.state.city + city)}

        else {
            this.setState({city : this.state.city.replace(city, '')}) 
            this.props.onClick(this.state.city.replace(city, ''))
        } 
    } 
    
    render(){
        return (
        <div>
            <Accordion>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"  expandIcon={<ExpandMoreIcon />}>
                    <Typography>City</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {console.log(this.state.city)}
                            <FormControlLabel control = {<Checkbox /* checked = {this.state.checked[0]} */ onClick = {(event) => this.CheckBoxonChange(event, ',Berlin', 0)}/>}
                            label = 'Berlin' disabled = {this.state.checked[0] ? false : !this.state.bool[0]}/>
                            <FormControlLabel control = {<Checkbox onClick = {(event) => this.CheckBoxonChange(event, ',Hamburg', 1)}/>}
                            label = 'Hamburg' disabled = {this.state.checked[1] ? false : !this.state.bool[1]}/>
                            <FormControlLabel control = {<Checkbox onClick = {(event) => this.CheckBoxonChange(event, ',Munich', 2)}/>}
                            label = 'Munich' disabled = {this.state.checked[2] ? false : !this.state.bool[2]}/>
                            <FormControlLabel control = {<Checkbox onClick = {(event) => this.CheckBoxonChange(event, ',Frankfurt', 3)}/>}
                            label = 'Frankfurt' disabled = {this.state.checked[3] ? false : !this.state.bool[3]}/>
                    </FormGroup>
                    
                </AccordionDetails>

            </Accordion>
        </div>
    )}
}

export default SearchSpecification
