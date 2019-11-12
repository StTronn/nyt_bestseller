import React from 'react';
import './App.css';
import BookCard from './components/BookCard';
import TopBar from './components/TopBar';
import List from './components/List';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component{
  //remove key into gitnore file
  constructor()
  {
    super();
    this.state={
      curr:'NonFiction'
    }
  }
  changeCurr=()=>{
    this.setState(state=>({curr:state.curr==='NonFiction'?'Fiction':'NonFiction'}))
  }
  render(){
    return(
      <List cat={this.state.curr} change={this.changeCurr} key={this.state.curr}/>
    );
  }
}
export default App;
