import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header.jsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useForm from '../../utils/useForm.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { createStop } from '../../api/requests.js';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddTrip from '../addtrip/addtrip.jsx';



const useStyles = makeStyles((theme) => ({
  root:{
    width: 800,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
    padding: theme.spacing(2),
  },
  dataField: {
    margin: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.9),
    flexGrow:1,
  },
  form: {
    margin: theme.spacing(1),
  },


}));

export default function CompanyCtrlPanel(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dialog, setDialog] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway')
      return;

    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const addStop = () => {
    const payload = {name: stopForm.input.stop};
    createStop(payload).then(res => {
      console.log(res);
      setIsError(false);
      setMessage('Adăugarea stației ');
      handleOpen();
    }).catch(err => {
      console.log(err);
      setIsError(true);
      setMessage('Adăugarea stației ');
      handleOpen();
    })
  };
  const stopForm = useForm(addStop);


  return (
    <Card className={classes.root} variant="outlined">
      <form className={classes.form} onSubmit={stopForm.handleSubmit}>
        <TextField className={classes.dataField} variant="outlined"
        label="Stație nouă" name="stop" onChange={stopForm.handleInputChange}/>
        <Button className={classes.submitButton} variant="contained"
        color="primary" type="submit">
          Adaugă stație
        </Button>
      </form>

      <Button onClick={()=>{setDialog(true)}}>
        Adauga cursa
      </Button>

      <Dialog open={dialog} onClose={()=>{setDialog(false)}}>
        <DialogTitle>Cursa Noua</DialogTitle>
        <AddTrip companyid={props.company?props.company.id:undefined}/>
      </Dialog>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        {function () {
          if (isError)
            return (
              <Alert severity="error" variant="filled" onClose={handleClose}>
                <b>{ message }a eșuat</b>
              </Alert>);
          else
              return (
                <Alert severity="success" variant="filled" onClose={handleClose}>
                  <b>{ message }s-a efectuat cu succes</b>
                </Alert>);
        }()}
      </Snackbar>
    </Card>
  )
}
