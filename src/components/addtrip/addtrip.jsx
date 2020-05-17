import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddRoute from '../addroute/addroute.jsx';
import AddTripPattern from '../addtrippattern/addtrippattern.jsx';
import AddTripDetails from '../addtripdetails/addtripdetails.jsx';
import {createTrip} from '../../api/requests.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles=makeStyles((theme)=>({
  root: {
    minWidth: 350
  },
  stepper: {
    paddingBottom: theme.spacing(0),
    marginBottom: theme.spacing(0),
  }
}));

function getSteps() {
  return ['Ruta', 'Orarul', 'Detalii'];
}

export default function AddTrip(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [route, setRoute] = React.useState();
  const [trip, setTrip] = React.useState();
  const steps = getSteps();
  const [message, setMessage] = useState('Înregistrarea cursei ');
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') 
      return;

    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleNext = () => {
    if(activeStep==0) {
      makeTrip();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const makeTrip = () => {
    createTrip({company_id:props.companyid, route_id:route}).then(res=>{
      setTrip(res.data.tripid)
    })
  }

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <AddRoute setRoute={setRoute}/>
      case 1:
        return <AddTripPattern tripid={trip}/>
      case 2:
        return <AddTripDetails/>
      case 3:
        return <p>Cererea dvs. a fost înregistrată</p>
      default:
        return 'Unknown stepIndex';
    }
  }

  useEffect(() => {
    if (activeStep == 3) {
      handleOpen();
      setTimeout(() => { props.onFinish(); }, 3000);
    }
  }, [activeStep]);

  return(
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
              <DialogContent>
                {getStepContent(activeStep)}
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Înapoi
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finalizați' : 'Avansați'}
                </Button>
              </DialogActions>
           
      </div>
      
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
    </div>
  )
}
