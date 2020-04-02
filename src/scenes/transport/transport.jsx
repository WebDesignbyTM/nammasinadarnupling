import React, {useState} from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useSearchForm from './useSearchForm.js';


const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
  },
  toolbarReplace: {
    ...theme.mixins.toolbar
  },
  content: {
    flex:1,
    flexDirection:'column',
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  searchForm: {
    display:'flex',
    flexDirection:'column',
  }


}));

export default function Transport(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [start, setStart] = useState();
  const [destination, setDestination] = useState();
  const [company, setCompany] = useState();
  const printData = () => {
    console.log(input.start, input.destination, input.company);
  };
  const {input, handleInputChange, handleSubmit} = useSearchForm(printData);


  return (
    <div className={classes.root}>
      <Header title='Transport'/>
      <main className={classes.content}>
        <div className={classes.toolbarReplace} />

        <div>
          <form className={classes.searchForm} onSubmit={handleSubmit}>
            <TextField label="Start" name="start" onChange={handleInputChange} value={input.start}/>
            <TextField label="Destination" name="destination" onChange={handleInputChange} value={input.destination}/>
            <TextField label="Company" name="company" onChange={handleInputChange} value={input.company}/>
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          </form>
        </div>

      </main>

    </div>
  )
}
