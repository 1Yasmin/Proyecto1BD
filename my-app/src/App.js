import React, { Component } from 'react';
import './App.css';
import fetch from 'node-fetch';

const llamadaDB = function (props) {
		console.log('llamada a base de datos');
	};

class App extends Component {
  
	constructor() {
		super();
		this.state = {
			medicos: [],
		}
	}
       
	
	
	// Make ajax calls here
	componentDidMount() {
		console.log('component has mounted');
		var that = this;
		fetch('http://localhost:3000/api/Medico')
			.then(function(response){
				//console.log(that.medicos)
				response.json()
					.then(function(data){
						//console.log(data);
						that.setState({
							medicos: data
						});
					})		
			});
		console.log(that.state.medicos);
	} 
	
	removeMedico(id){
		//console.log(this);
		var that = this;
		let medicos = this.state.medicos;
		let medico = medicos.find(function(medico){
			return medico.id == id
		})
		console.log(medico);
		fetch('http://localhost:3000/api/removemedico/' + id, {
			method: 'DELETE'		
		})
		.then(function(response){
			medicos.splice(medicos.indexOf(medico), 1);
			that.setState({
				medicos: medicos
			})
			response.json()
				.then(function(data){
					console.log(data)
				})
		})
	}



	addMedico(event) {
		var that = this;

		event.preventDefault();

		let medico_data = {
			nombre: this.refs.medico_nombre.value,
			especialidad: this.refs.medico_especialidad.value
		};

		//xmlhttprequest()			
		fetch('http://localhost:3000/api/mediconuevo', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(medico_data)
		})
		.then(function(response){
			response.json()
				.then(function(data){
					console.log(data)
			})
		})
		.catch(function(err){
			console.log(err)
		});
		
		 alert("Añadido! Por favor recarge la página");
		 console.log(that.state.medicos);
		/*
		fetch('http://localhost:3000/api/Medico')
		.then(function(response){
			//console.log(that.medicos)
			response.json()
				.then(function(data){
					//console.log(data);
					that.setState({
						medicos: data
					});
				})		
		});*/
	
	}

	render() {
		let medicos = this.state.medicos;

		return (
			// <meta charset="utf-8">
			<div className="App">
				<h1> Medi Lock </h1>
				<form ref="medicosForm">
					<input type="text" ref="medico_nombre" placeholder="Nombre"/>
					<input type="text" ref="medico_especialidad" placeholder="Especialidad"/>
					<button onClick={this.addMedico.bind(this)}>ADD MEDICO</button>
				</form>
				<div>
					{
						medicos.map(
							medico =>
								<li key={medico.id}>{medico.nombre} {medico.especialidad} <button onClick={this.removeMedico.bind(this, medico.id)}> Eliminar </button> </li>
						)
					}
				</div>
			</div>
		);
	}
}

export default App;
