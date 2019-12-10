import React,{Component} from 'react';
import './App.css'
import { BrowserRouter,Switch, Route} from 'react-router-dom'
import Home from './comp/Home'
import Sobre from './comp/Sobre'

export default class App extends Component{
render(){
  return (

<BrowserRouter>
    <div className="App">
      <ul>
	  <li><a className="active" href="/home">Home</a></li>
	  <li><a href="/users">Usuários</a></li>
	  <li><a href="/mesas">Mesas</a></li>
	  <li><a href="/sobre">Sobre</a></li>
</ul>
</div>
<Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/sobre" component={Sobre} />
</Switch>
</BrowserRouter>
  )
}
}
