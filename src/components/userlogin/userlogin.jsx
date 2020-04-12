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

const useStyles = makeStyles((theme) => ({
  card:{
    display:'flex',
    minWidth: 200,
    alignItems:'center'
  }


}));

export default function UserLogin(props) {
  const classes=useStyles();
  const theme=useTheme();
  const info={fullname:'cipri marin', email:'cipri@cuie.com'};
  const {input, handleInputChange, handleSubmit} = useForm(()=>{console.log(input)});
  const handleLogin = (event) => {
      if(event)
        event.preventDefault();
      userLogin({
        username:input.username,
        password:input.password,
        remember:true
      }).then(res=>{
        window.location.reload();
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
              <TextField label="Username" name="username" onChange={handleInputChange} value={input.username}/>
              <TextField label="Password" name="password" onChange={handleInputChange} value={input.password}/>
              <Button type="submit" variant="contained" color="secondary">
                Login
              </Button>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Link to={'/register'}>
            Register
          </Link>
        </CardActions>
      </Grid>
    </Card>
  )

}
