import React, {Component} from 'react'
import { Card, Typography, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import moment from 'moment'

const cities = ['Berlin', 'Hamburg', 'Frankfurt', 'Munich', 'Dresden']

class SearchSpecification extends Component {
    constructor(){
        super();
        this.state = {
          // bool and checked states : two arrays , bool keeps track whether checkbox should be disabled or not
          // checked keeps track of whether a checkbox was checked or not, see this.updateBoolChecked
            bool : Array(cities.length).fill(true),
            checked : Array(cities.length).fill(false),
          // city state is passed to query in app 
            city : 'city=', 
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // if query changes disable prop on city checkboxes is reevaluated
        if (prevProps.query !== this.props.query | prevProps.date !== this.props.date) {
            cities.map((city, i) => {this.checkConcerts('city=' + city ,i)})
        }
        // when button is clicked reset prop is passed which resets checkbox states to false and runs a new query
        if (this.props.reset & this.props.reset !== prevProps.reset){
            this.setState({checked : Array(cities.length).fill(false), city : 'city='}, () => {this.props.handleReset()})
        }
    }

    // updates corresponding element in bool or checked array while keeping the others intact 
    // which state is changed depends on whether bool parameter is passed 
    updateBoolChecked(i, change, bool){
        this.setState(state => {
          const method = bool === 'bool' ? state.bool : state.checked
          const list = method.map((item, j) => {
            if (j === i) {
              return change;
            } else {
              return item;
            }
          });
          return ( bool === 'bool' ? {
            bool : list,
          } : 
          {
            checked : list
          }
          );
        });
      };
    
    // checks if query yields result in corresponding city and changes bool state accordingly 
    checkConcerts(input, index){
        const date = 'date=' + moment(this.props.date).format('YYYY-MM-DD HH:mm')

        axios.get('/api/events/?'+ date + '&' + input + '&' + this.props.query)
        .then((response) => {
          if (response.data.length === 0){
              this.updateBoolChecked(index,false, 'bool')
          }
          else{
            this.updateBoolChecked(index,true, 'bool')
          }
        })
      };
    
    // changes responsible states everytime a checkbox is clicked -> new query with city state
    CheckBoxonChange(event, city, index){
        
        this.updateBoolChecked(index, event.target.checked)

        // if box is checked, city is added to state city  
        if (event.target.checked){
            this.setState({city : this.state.city + city}) 
            this.props.onClick(this.state.city + city)}
        
        // if box is unchecked city is removed from state city
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
              {/* creates a checkbox element for each city in cities */}
              {cities.map((city, i) => {
                return(<FormControlLabel key = {city} control = {<Checkbox checked = {this.state.checked[i]} onClick = {(event) => this.CheckBoxonChange(event, ',' + city, i)}/>}
                label = {city} disabled = {this.state.checked[i] ? false : !this.state.bool[i]}/>)
              })}

            </FormGroup>
          </Card>
        </div>
    )}
}

export default SearchSpecification
