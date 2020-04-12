import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {userLogout, userData} from '../../api/requests.js';

const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
  },
  card:{
    minWidth: 200,
    alignItems:'center'
  },
  content: {
    textAlign:'center'
  }


}));

export default function UserInfo(props) {
  const classes=useStyles();
  const theme=useTheme();
  const [userEmail, setUserEmail]=React.useState();
  const [userFullname, setUserFullname]=React.useState();
  const [userUsername, setUserUsername]=React.useState();

  React.useEffect(()=>{
    userData().then(res=>{
      setUserEmail(res.email);
      setUserFullname(res.fullname);
      setUserUsername(res.username);
    })
  })

  const handleLogout = () => {
    userLogout().then(res=>{
      window.location.reload();
    })
  };


  return (
    <Card className={classes.card}>
      <Grid container
        direction="column"
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <AccountCircleIcon fontSize='large'/>
          <CardContent classes={classes.content}>
            <Typography>
              {userFullname}
            </Typography>

            <Typography>
              {userEmail}
            </Typography>
          </CardContent>
        </Grid>
        <Grid container
          direction="row-reverse"
        >
          <CardActions>
            <Button size="small" color="primary">
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Edit
              </Link>
            </Button>
            <Button size="small" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </CardActions>
        </Grid>


      </Grid>
    </Card>
  )

}
