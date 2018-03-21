import React, { Component } from 'react';
import './App.css';
import fetch from 'node-fetch';

class App extends Component {
  
	constructor() {
		super();
		this.state = {
			medicos: []
		}
	}

	// Make ajax calls here
	componentDidMount() {
		console.log('component has mounted');
		var that = this;
		fetch('http://localhost:3000/api/Medico')
			.then(function(response){
				console.log(response)
				response.json()
					.then(function(data){
						that.setState({
							medicos: data						
						});
					})		
			});
	} 

	addMedico(event) {
		var that = this;

		event.preventDefault();

		let medico_data = {
			nombre: this.refs.medico_nombre.value,
			especialidad: this.refs.medico_especialidad.value
		};

		let medicos = that.state.medicos;

		medicos.push(medico_data);

		console.log(medicos);

		that
			.setState({
				medicos: medicos
			})
			//xmlhttprequest()			
			fetch('http://localhost:3000/api/mediconuevo', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(medico_data)
			})
			.then(function(response){
				response.json()
					.then(function(data){	
				})
			})
			.catch(function(err){
				console.log(err)
			});
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
								<li>{medico.nombre} {medico.especialidad}</li>
						)
					}
				</div>
			</div>
		);
	}
}

export default App;
