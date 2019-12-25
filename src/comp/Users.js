import React,{Component} from 'react';
const url = window.location.protocol + '//' + window.location.hostname + ':4000'
export default class Users extends Component{
constructor(props){
	super(props)
	this.state = {
		garcon:null
	}
}
async componentDidMount(){
	let req = await fetch(url+'/database/garcon')
	let res = await req.json()
	let garcon = []
	for(let g of res){
		garcon.push(<div key={g.id_garco}>{g.nome} {g.sobrenome}</div>)
	}
	this.setState({garcon})
}
async _addGarcon(){
	var nome = document.querySelector('#nome').value
	var sobrenome = document.querySelector('#sobrenome').value
	var senha = document.querySelector('#senha').value
	var src = document.querySelector('#src').value
	var dados = {nome,sobrenome,senha,src}
	var req = await fetch(url + '/insert/garcon',{
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify(dados)
	})
	var res = await req.json()
	console.log(res)
}
render(){
  return (
   <div>
	<input type="text" id="nome" placeholder="nome"/><br/>
	<input type="text" id="sobrenome" placeholder="sobrenome"/><br/>
	<input type="password" id="senha" placeholder="senha"/><br/>
	<input type="hidden" id="src" value="null"/>
	<input type="submit" onClick={this._addGarcon} value="Criar" className="btn green"/>
	{this.state.garcon}
    </div>
  )
}
}
