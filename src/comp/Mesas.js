import React,{Component} from 'react';
const url = window.location.protocol + "//" + window.location.hostname + ":4000"
export default class Mesas extends Component{
	constructor(props){
		super(props)
		this.state = {mesas:null}
	}
	async componentDidMount(){
		let req = await fetch(url + '/database/mesas')
		let res = await req.json()
		var mesas = []
		for(let mesa of res){
			var smesa = <div style={styles.mesa} key={mesa.id_mesa}> {mesa.nome} </div>
			mesas.push(smesa)
		}
		this.setState({mesas})
	}
	async _insertMesa(data){
		let req = await fetch(url + '/insert/mesas',{
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
		this._insertMesa(data)
	}
	render(){
	  return (
	   <div>
		<input id="nome" type="text" placeholder="Nome da mesa" /> <br/>
		<input type="button" className="btn" onClick={this._click.bind(this)} value="Criar"/>
		<div id="mesas">
			{this.state.mesas}
		</div>
		</div>
	  )
}
}

const styles = {
	mesa:{
		border:'1px solid gray',
		padding:'5px',
		borderRadius:'10px',
		margin:'4px',
		cursor:'pointer'
	}
}