import React from 'react'
import moment from 'moment';
import { Button } from '@material-ui/core';

function CurrentFilters(props) {
    return (
        <div>
            Filters: <br/>
            {moment(props.date).format('DD. MMM YYYY')} <br/>
            {props.city.replace('city=', '').replace(',', '')}
            <Button onClick = {props.onClick}>
                Reset Filter
            </Button>
        </div>
    )
}

export default CurrentFilters
