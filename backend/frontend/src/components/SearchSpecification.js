import React, {Component} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'

class SearchSpecification extends Component {
    constructor(){
        super();
        this.state = {
            bool : [true, true, true, true],
            city : '',
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
            list,
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

    

    onChange1 = (event) => {
        this.updateChecked(0, event.target.checked)

        if (event.target.checked){
            this.setState({city : this.state.city + ',Berlin'}) 
            this.props.onClick(this.state.city + ',Berlin')}

        else {
            this.setState({city : this.state.city.replace(',Berlin', '')}) 
            this.props.onClick(this.state.city.replace(',Berlin', ''))
        } 
    } 

    onChange2 = (event) => {
        this.updateChecked(1, event.target.checked)

        if (event.target.checked){
            this.setState({city : this.state.city + ',Hamburg'}) 
            this.props.onClick(this.state.city + ',Hamburg')}
        else {
            this.setState({city : this.state.city.replace(',Hamburg', '')}) 
            this.props.onClick(this.state.city.replace(',Hamburg', ''))
        } 
    } 

    onChange3 = (event) => {
        this.updateChecked(2, event.target.checked)

        if (event.target.checked){
            this.setState({city : this.state.city + ',Munich'}) 
            this.props.onClick(this.state.city + ',Munich')}
        else {
            this.setState({city : this.state.city.replace(',Munich', '')}) 
            this.props.onClick(this.state.city.replace(',Munich', ''))
        } 
    } 
    onChange4 = (event) => {
        this.updateChecked(3, event.target.checked)

        if (event.target.checked){
            this.setState({city : this.state.city + ',Frankfurt'}) 
            this.props.onClick(this.state.city + ',Frankfurt')}
        else {
            this.setState({city : this.state.city.replace(',Frankfurt', '')}) 
            this.props.onClick(this.state.city.replace(',Frankfurt', ''))
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
                            <FormControlLabel control = {<Checkbox /* checked = {this.state.checked[0]} */ onClick = {this.onChange1}/>}
                            label = 'Berlin' disabled = {!this.state.bool[0]}/>
                            <FormControlLabel control = {<Checkbox onClick = {this.onChange2}/>}
                            label = 'Hamburg' disabled = {!this.state.bool[1]}/>
                            <FormControlLabel control = {<Checkbox onClick = {this.onChange3}/>}
                            label = 'Munich' disabled = {!this.state.bool[2]}/>
                            <FormControlLabel control = {<Checkbox onClick = {this.onChange4}/>}
                            label = 'Frankfurt' disabled = {!this.state.bool[3]}/>
                    </FormGroup>
                    
                </AccordionDetails>

            </Accordion>
        </div>
    )}
}

export default SearchSpecification
