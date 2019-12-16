import React,{Component} from 'react'
import Pedidos from './Pedidos'
import Card from './Card'
import Modal from './Modal'

const url = window.location.protocol + "//" + window.location.hostname + ":4000"
export default class Home extends Component{
	render(){
	  return (
	   <div>
		<Card/>
		<Modal/>
		</div>
	  )
}
}

