import React,{Component} from 'react'
const url = window.location.protocol + "//" +window.location.hostname + ':4000'
export default class Auth extends Component{
	constructor(props){
		super(props)
	}
	async _verify(){
		var user = localStorage.getIytem("user")
		return user
	}
	async _signin(nome){
		localStorage.setItem("user",nome)
		alert(nome)
	}
	async _login(user,senha){
		var data = JSON.stringify({user,senha})
		let req = await fetch(url + '/garcon',{
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				'Accept':'aplication/json'
			},
			body:data
		})
		let res = await req.json()
		if(res.user){
			this._signin(user)
		}
	}
	_click(){
		var user = document.querySelector('#user').value
		var senha = document.querySelector('#senha').value
		this._login(user,senha)
	}
	render(){
	  return (
	   <div>
			<div>
				<input id="user" type="text" /> <br/>
				<input id="senha" type="password" /><br/>
				<input className="btn" type="button" onClick={this._click.bind(this)} value="entrar" />
			</div>
		</div>
	  )
}
}
