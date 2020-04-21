import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import useForm from '../../utils/useForm.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {userLogin} from '../../api/requests.js';
import {Link} from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  card:{
    display:'flex',
    minWidth: 300,
    alignItems:'center'
  },
  loginButton:{
    margin:10,
    flexGrow:1,
  },
  registerLink:{
    textDecoration:'none',
    color:theme.palette.secondary.dark,
    flexGrow:2,
    margin:10
  },
  loginField:{
    padding:10
  },
  displayObjectNone:{
    display:'none'
  },



}));

export default function UserLogin(props) {
  const classes=useStyles();
  const theme=useTheme();
  const {input, handleInputChange, handleSubmit} = useForm(()=>{console.log(input)});
  const [errorOpen, setErrorOpen] = React.useState(false);
  const handleLogin = (event) => {
      if(event)
        event.preventDefault();
      userLogin({
        username:input.username,
        password:input.password,
        remember:true
      }).then(res=>{
        if(res.status == 200) {
          window.location.reload();
        }else {
          setErrorOpen(true);
        }
      });
  }
  return (
    <Card className={classes.card}>
      <Grid container
        direction="column">
        <CardContent>
          <form className={classes.searchForm} onSubmit={handleLogin}>
            <Grid container
              direction="column"
            >
              <TextField className={classes.loginField} variant="outlined"
              label="Username" name="username" onChange={handleInputChange} value={input.username}/>
              <TextField className={classes.loginField} variant="outlined"
              label="Password" name="password" onChange={handleInputChange} value={input.password}/>
              <Grid container
                direction="column">

                <Typography color='error' align='center' className={clsx({
                  [classes.displayObjectNone]:(!errorOpen)
                })}>
                  Username/password incorrect
                </Typography>

                <Button className={classes.loginButton} type="submit" variant="contained" color="primary">
                  Login
                </Button>
                <Link className={classes.registerLink} to={'/register'}>
                  <Typography>
                    Don't have an account?
                  </Typography>
                  <Typography>
                    Register here!
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Grid>
    </Card>
  )

}
