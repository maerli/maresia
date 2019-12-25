import React,{Component} from 'react';
import './App.css'
import { BrowserRouter,Switch, Route, Link} from 'react-router-dom'
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
	  <li><Link className="active" to="/">Home</Link></li>
	  <li><Link to="/desktop/users">Usuários</Link></li>
	  <li><Link to="/desktop/mesas">Mesas</Link></li>
    <li><Link to="/desktop/categorias">Categorias</Link></li>
	  <li><Link to="/desktop/produtos">Produtos</Link></li>
	  <li><Link to="/desktop/pedidos"> Pedidos</Link></li>
    <li><Link to="/desktop/mobile"> Mobile </Link></li>
	  <li><Link to="/desktop/sobre">Sobre</Link></li>
	</ul>

<Switch>
    <Route path="/desktop" exact={true} component={Home} />
    <Route path="/desktop/sobre" component={Sobre} />
    <Route path="/desktop/mesas" component={Mesas} />
    <Route path="/desktop/users" component={Users} />
    <Route path="/desktop/produtos" component={Produtos} />
    <Route path="/desktop/pedidos" component={Pedidos} />
    <Route path="/desktop/categorias" component={Categorias} />
    <Route path="/desktop/mobile" component={Mobile} />
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
