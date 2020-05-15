import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {createPattern} from '../../api/requests.js';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {DateTimePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles=makeStyles((theme)=>({

}));

export default function OccasionalPattern(props) {

  const [selectedDate, handleDateChange] = React.useState(new Date());

  const addPattern = () => {
    createPattern({recurring_type:0,trip_id:props.tripid,
    year:selectedDate.getFullYear(), month:selectedDate.getMonth(), day:selectedDate.getDate(), hour:selectedDate.getHours(), minute:selectedDate.getMinutes()}).
    then(res=> {
      console.log(res);
    })
  }

  return (
    <div>
      <DateTimePicker value={selectedDate} onChange={handleDateChange} />
      <Button onClick={()=>{
        addPattern();
      }}>
        Add pattern
      </Button>
    </div>
  )
}
