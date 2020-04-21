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
import Divider from '@material-ui/core/Divider';
import {userLogout, userData} from '../../api/requests.js';

const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
  },
  card:{
    minWidth: 300,
    alignItems:'center',
    borderRadius:10
  },
  content: {
    textAlign:'center',
    border:10
  },
  actionButton:{
    margin:'5px 10px 5px 10px'
  },
  divider:{
    marginTop:5,
    marginBottom:5
  }


}));

export default function UserInfo(props) {
  const classes=useStyles();
  const theme=useTheme();
  const [userInfo, setUserInfo] = React.useState();


  React.useEffect(()=>{
    userData().then(res=>{
      setUserInfo(res);
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
            <Typography variant="h6">
              {userInfo?userInfo.fullname:"Fullname"}
            </Typography>

            <Typography variant="h6">
              {userInfo?userInfo.email:"Email"}
            </Typography>
          </CardContent>

        </Grid>

        <Button className={classes.actionButton} variant="outlined" size="small" color="primary">
          <Link to="/reservation" style={{ textDecoration: 'none', color:theme.palette.primary.light}}>
            {userInfo?userInfo.usertype=='personal'?'My reservations':'My routes':'Reserve/routes'}
          </Link>
        </Button>

        <Button className={classes.actionButton} variant="outlined" size="small" color="primary">
          <Link to="/register" style={{ textDecoration: 'none', color:theme.palette.primary.light}}>
            Edit profile
          </Link>
        </Button>

        <Divider variant="middle" className={classes.divider}/>

        <Button className={classes.actionButton} variant="outlined"size="small" color="primary" onClick={handleLogout}>
          Logout
        </Button>

      </Grid>
    </Card>
  )

}
