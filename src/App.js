import React,{Component} from 'react';
import './App.css'
import { BrowserRouter,Switch, Route} from 'react-router-dom'
import Home from './comp/Home'
import Sobre from './comp/Sobre'
import Users from './comp/Users'
import Produtos from './comp/Produtos'
import Pedidos from './comp/Pedidos'
import Mesas from './comp/Mesas'
import Auth from './comp/Auth'
import Categorias from './comp/Categorias'
import Mobile from './comp/Mobile'

import './materialize/css/materialize.min.css'
import M from  'materialize-css'

window.document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });


const url = 'http://localhost:4000'
var user = localStorage.getItem('user')
export default class App extends Component{
render(){
  return (
  
user? (<div style={styles.app} className="App">
<BrowserRouter>
      <ul>
	  <li><a className="active" href="/">Home</a></li>
	  <li><a href="/users">Usuários</a></li>
	  <li><a href="/mesas">Mesas</a></li>
    <li><a href="/categorias">Categorias</a></li>
	  <li><a href="/produtos">Produtos</a></li>
	  <li><a href="/pedidos"> Pedidos</a></li>
    <li><a href="/mobile"> Mobile </a></li>
	  <li><a href="/sobre">Sobre</a></li>
	</ul>

<Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/sobre" component={Sobre} />
    <Route path="/mesas" component={Mesas} />
    <Route path="/users" component={Users} />
    <Route path="/produtos" component={Produtos} />
    <Route path="/pedidos" component={Pedidos} />
    <Route path="/categorias" component={Categorias} />
    <Route path="/mobile" component={Mobile} />
</Switch> 
</BrowserRouter>
	</div>) : (<Auth/>)
  )
}
}
const styles = {
	app:{
		margin:'5px'
	}
}
