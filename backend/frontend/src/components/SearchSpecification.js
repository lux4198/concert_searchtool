import React, {Component} from 'react'
import { Card, Typography, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import moment from 'moment'

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
        if (prevProps.query !== this.props.query | prevProps.date !== this.props.date) {
            this.check1().then(this.check2().then(this.check3().then(this.check4())))
        }
        if (this.props.reset & this.props.reset !== prevProps.reset){
            this.setState({checked : [false, false, false, false], city : 'city='}, () => {this.props.handleReset()})
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
        const date = 'date=' + moment(this.props.date).format('YYYY-MM-DD HH:mm')

        axios.get('/api/events/?'+ date + '&' + input + '&' + this.props.query)
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
                <Card style = {{'marginBottom' : '2rem', 'marginTop' : '2rem'}}>
                    <h2>City</h2>
                    <FormGroup style = {{'flexDirection': 'row',}}>
                            <FormControlLabel control = {<Checkbox checked = {this.state.checked[0]} onClick = {(event) => this.CheckBoxonChange(event, ',Berlin', 0)}/>}
                            label = 'Berlin' disabled = {this.state.checked[0] ? false : !this.state.bool[0]}/>
                            <FormControlLabel control = {<Checkbox checked = {this.state.checked[1]} onClick = {(event) => this.CheckBoxonChange(event, ',Hamburg', 1)}/>}
                            label = 'Hamburg' disabled = {this.state.checked[1] ? false : !this.state.bool[1]}/>
                            <FormControlLabel control = {<Checkbox checked = {this.state.checked[2]} onClick = {(event) => this.CheckBoxonChange(event, ',Munich', 2)}/>}
                            label = 'Munich' disabled = {this.state.checked[2] ? false : !this.state.bool[2]}/>
                            <FormControlLabel control = {<Checkbox checked = {this.state.checked[3]} onClick = {(event) => this.CheckBoxonChange(event, ',Frankfurt', 3)}/>}
                            label = 'Frankfurt' disabled = {this.state.checked[3] ? false : !this.state.bool[3]}/>
                    </FormGroup>
                    
                </Card>
        </div>
    )}
}

export default SearchSpecification
