import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from '../images/nyt.png';


const useStyles = makeStyles(theme => ({
  root: {
    marginBottom:theme.spacing(4),
    flexGrow: 1,
  },
  AppBar:{
    background:'black'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign:'center',
    flexGrow: 1,
  },
  image:{
    width:'50px',
    height:'50px',
  },
}));

function hello(){
  console.log('hello');
}

export default function TopBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.AppBar}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={logo} className={classes.image} alt='nyt_logo'/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.cat==='Fiction'?'Fiction':'Non Fiction'}
          </Typography>
              <Typography onClick={props.change} variant='subtitle1'>{props.cat==='Fiction'?'Non Fiction':'Fiction'}</Typography>  
        </Toolbar>
      </AppBar>
    </div>
  );
}
