import React,{Component} from 'react';
const url = window.location.protocol + "//" + window.location.hostname + ":4000"
export default class Categorias extends Component{
	constructor(props){
		super(props)
		this.state = {categorias:null}
	}
	async componentDidMount(){
		let req = await fetch(url + '/database/categorias')
		let res = await req.json()
		var categorias = []
		for(let categoria of res){
			var scategoria = <div key={categoria.id_categoria}> {categoria.nome} </div>
			categorias.push(scategoria)
		}
		this.setState({categorias})
	}
	async _insertCategoria(data){
		let req = await fetch(url + '/insert/categorias',{
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				'Accept':'aplication/json'
			},
			body:data
		})
		let res = await req.json()
		console.log(res)
	}
	_click(){
		var nome = document.querySelector('#nome').value
		var data = JSON.stringify({nome})
		this._insertCategoria(data)
	}
	render(){
	  return (
	   <div>
		<input id="nome" type="text" placeholder="nome" /> <br/>
		<input type="button" className="btn" onClick={this._click.bind(this)} value="Criar"/>
		<div id="categorias">
			{this.state.categorias}
		</div>
		</div>
	  )
}
}
