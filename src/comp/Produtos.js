import React,{Component} from 'react';
const url = window.location.protocol + "//" + window.location.hostname + ":4000"
export default class Produtos extends Component{
	constructor(props){
		super(props)
		this.state = {produtos:null,categorias:null}
	}
	async componentDidMount(){
		let req1 = await fetch(url + '/database/produtos')
		let req2 = await fetch(url + '/database/categorias')
		let res1 = await req1.json()
		let res2 = await req2.json()
		//alert(JSON.stringify(res2))
		var produtos = []
		for(let produto of res1){
			var sproduto = <div key={produto.id_produto}> {produto.nome} </div>
			produtos.push(sproduto)
		}
		var categorias = []
		for(let categoria of res2){
			var scategoria = <option key={categoria.id_categoria} value={categoria.nome}> {categoria.nome} </option>
			categorias.push(scategoria)
		}
		this.setState({produtos,categorias})
	}
	async _insertProduto(data){
		let req = await fetch(url + '/insert/produtos',{
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
		var categoria = document.querySelector('#categoria').value
		var preco = document.querySelector('#preco').value
		var descricao = document.querySelector('#descricao').value
		var img = document.querySelector('#img').value
		
		var data = JSON.stringify({nome,categoria,preco,descricao,img,categoria})
		this._insertProduto(data)
	}
	render(){
	  return (
	   <div className="col s6">
	  
		<input id="nome" type="text" placeholder="nome" /> 	
		<input id="preco" type="text" placeholder="preço" />
		<div className="input-field col s12">
		<strong> Categoria </strong>
		<div className="input-field col s12">
    <select id="categoria" style={{display:'block'}}>
    	 <label>Materialize Select</label>
    	{this.state.categorias}
   
    </select>
    </div>
  </div>
		<textarea id="descricao" placeholder="Descrição"></textarea>
		<input type="hidden" id="img" value="default.png"/>

		<input className="btn waves-effect waves-light" type="button" onClick={this._click.bind(this)} value="Criar"/>
		<div id="mesas">
			{this.state.produtos}
		</div>
		
		</div>
	  )
	}
}
