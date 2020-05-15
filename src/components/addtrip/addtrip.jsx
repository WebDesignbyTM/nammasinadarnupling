import React from 'react';
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

const useStyles=makeStyles((theme)=>({

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
      default:
        return 'Unknown stepIndex';
    }
  }

  return(
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Cursa a fost inregistrata</Typography>
            <Button onClick={handleReset}>Reincercati</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Inapoi
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finalizati' : 'Avansati'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
