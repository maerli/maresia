import React,{Component} from 'react'
import '../css/pedidos.css'
import Modal from './Modal'

const url = window.location.protocol + "//" +window.location.hostname + ':4000'
export default class Mobile extends Component{
	constructor(props){
		super(props)
		this.state = {
			pedidos:null,mesas:null,categorias:null,sprodutos:null,
			mesa:null,
			garcon:localStorage.getItem('user'),
			data:Date.now(),
			status:0,
			total:0,
			produtos:[],
			title:"atual",
			}
	}
	async _makePedido(produto){
		var total = produto.preco
		let is_product = false
		let p;
		for(let i in this.state.produtos){
			p = this.state.produtos.slice()
			if(p[i].id_produto == produto.id_produto){
				p[i].quantidade += 1
				is_product = true
				break
			}
		}
		if(!is_product){
			produto.quantidade = 1
			p = this.state.produtos.slice()
			p = p.concat(produto)
			console.log(p)
		}
		
		this.setState({produtos:p,total:this.state.total + total})
	}
	async _getProduto(categoria){
		let req = await fetch(url + '/select/produtos/categoria/'+categoria)
		let res = await req.json()
		var sprodutos = []
		for(let produto of res){
			var sproduto = <div className="hand" onClick={this._makePedido.bind(this,produto)} key={produto.id_produto}> {produto.nome} R$ {produto.preco.toFixed(2)}</div>
			sprodutos.push(sproduto)
		}
		this.setState({sprodutos,categoria,title:"Produtos",data:sprodutos})
	}
	async _getCategorias(mesa){
		let req = await fetch(url + '/database/categorias')
		let res = await req.json()
		var categorias = []
		for(let categoria of res){
			var scategoria = <div className="hand" onClick={this._getProduto.bind(this,categoria.nome)} key={categoria.id_categoria}> {categoria.nome} </div>
			categorias.push(scategoria)
		}
		this.setState({categorias,mesa,data:categorias,title:"Categorias"})
	}
	async componentDidMount(){
		let req1 = await fetch(url + '/select/pedidos/garcon/'+this.state.garcon)
		let req2 = await fetch(url + '/database/mesas')
		let res1 = await req1.json()
		let res2 = await req2.json()
		var pedidos = []
		for(let pedido of res1){
			var prod = JSON.parse(pedido.produtos)
			let ap = []
			for(let p of prod){
				ap.push(<div>Produto <strong>{p.nome}</strong> Quantidade {p.quantidade}</div>)
			}
			var spedido = <Card key={pedido.id_pedido} title={pedido.mesa} data={ap} status={pedido.status}/>
			pedidos.push(spedido)
		}
		var mesas = []
		for(let mesa of res2){
			var smesa = (<div className="hand" onClick={this._getCategorias.bind(this,mesa.nome)} key={mesa.id_mesa} value={mesa.nome}> 
			<a className="waves-effect waves-light btn modal-trigger" href="#modal1">{mesa.nome} </a> 
			</div>)
			mesas.push(smesa)
		}
		this.setState({pedidos,mesas})
	}
	async _insertPedido(){
		let {mesa,garcon,data,status,total,produtos} = this.state
		let req = await fetch(url + '/insert/pedidos',{
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				'Accept':'aplication/json'
			},
			body:JSON.stringify({mesa,garcon,data,status,total,produtos:JSON.stringify(produtos)})
		})
		let res = await req.json()
		console.log(res)
	}
	_click(){
		this._insertPedido()
		console.log(this.state)
	}
	_table(){
		return (
		<div>
			<table> 
			<thead>
				<tr> <td> Mesa </td> <td> Preço </td> <td> Quantidade </td> </tr>
			</thead>
			<tbody>
			{this.state.produtos && this.state.produtos.map(p=>{
				return (<tr key={p.id_produto}>
						<td > {p.nome} </td> 
						<td> <strong> R$ {p.preco.toFixed(2)}</strong> </td>
						<td> <strong> {p.quantidade} </strong> </td>
						</tr>
					)
				}
			)}
			</tbody>
			</table>
			Preço total : <span> <strong>R$ {this.state.total} </strong></span>
			<button className="btn" onClick={this._click.bind(this)}>Enviar </button>
			</div>
	)
	}
	render(){
	
	  return (
	   <div>
		{this.state.mesas}
		<div>
			<div> {this._table()} </div>
			<div> {this.state.pedidos} </div>
			<Modal title={this.state.title} data={this.state.data}/>
		</div>
	   </div>
	  )
	}
}

class Card extends Component{
	constructor(props){
		super(props)
		this.state = {
			status:this.props.status
		}
	}
	_preparar(){
		this.setState({status:1})
	}
	render(){
		var colors = ["green","blue"]
		var status = ["recebido","preparando"]
		return (
			 <div className="row">
			    <div className="col s12 m6">
			      <div class={"card "+colors[this.state.status]+ " darken-1"}>
			        <div className="card-content white-text">
			          <span className="card-title">{this.props.title}</span>
			          <div>
			          	{this.props.data}
			          	{status[this.state.status]}
			          </div>
			        </div>
			        <div className="card-action">
			          <button className="btn" onClick={this._preparar.bind(this)}>Preparar</button>
			          <button className="btn">Cancelar</button>
			        </div>
			      </div>
			    </div>
  			</div>

		)
	}
}