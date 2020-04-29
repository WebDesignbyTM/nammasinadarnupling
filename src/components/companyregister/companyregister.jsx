import React, {useState, useEffect} from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useForm from '../../utils/useForm.js';
import {userData, registerCompany} from '../../api/requests.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  content: {
    width:500,
    flexDirection:'column',
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  userForm: {
    display:'flex',
    flexBasis:200,
    alignItems:'center '
  },
  dataField:{
    padding:10
  },
  registerButton: {
    margin:10,
    flexGrow:1,
  },
  displayObjectNone:{
    display:'none!important'
  },


}));

export default function CompanyRegister(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [userInitData, setUserInitData] = React.useState();
  const printData = () => {
    console.log(input.start, input.destination, input.company);
  };
  const {input, handleInputChange, handleSubmit} = useForm(printData);

  const [errorOpen, setErrorOpen] = React.useState(false);



  const handleRegister = (event) => {
    event.preventDefault();
    const payload={
      name:input.name,
      email:input.email,
      address:input.address,
      cui:input.cui,
      phone:input.phone
    };
    registerCompany(payload).then(res=>{
      if(res.status==200) {
        window.location.reload();
      } else {
        setErrorOpen(true);
      }
    })
  }


  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Paper>
            <form onSubmit={handleRegister}>
              <Grid container
                direction="column">
                <TextField className={classes.dataField} variant="outlined"
                label="Company name" name="name" onChange={handleInputChange}
                value={input.name}/>
                <TextField className={classes.dataField} variant="outlined"
                label="C.U.I" name="cui" onChange={handleInputChange}
                value={input.cui}/>
                <TextField className={classes.dataField} variant="outlined"
                label="Company e-mail" name="email" onChange={handleInputChange}
                value={input.email}/>
                <TextField className={classes.dataField} variant="outlined"
                label="Phone" name="phone" onChange={handleInputChange}
                value={input.phone}/>
                <TextField className={classes.dataField} variant="outlined"
                label="Address" name="address" onChange={handleInputChange}
                value={input.address}/>
                <Button className={classes.registerButton} type="submit" variant="contained" color="primary">
                  {'Register company'}
                </Button>
              </Grid>
            </form>

            <Typography color='error' align='center' className={clsx({
              [classes.displayObjectNone]:(!errorOpen)
            })}>
              Incorrect company data
            </Typography>
        </Paper>

      </div>

    </div>
  )
}
