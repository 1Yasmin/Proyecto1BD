import React, { Component } from 'react';
import './App.css';
import fetch from 'node-fetch';
/*
const llamadaDB = function (props) {
		console.log('llamada a base de datos');
	};*/

class App extends Component {
  
	constructor() {
		super();
		this.state = {
			medicos: [],
			filTab: [],
			value: 'nombre',
			fil: true,
			pagina: true
		}
	}
	
	// Make ajax calls here
	componentWillMount() {
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
	} 
	
	cambiarMedico(id){
		var that = this;
		let medico_data;

		let medicos = this.state.medicos;
		let medico = medicos.find(function(medico){
			return medico.id === id
		})
		console.log(medico);
		
		var celda = this.refs.tablamedicos.childNodes;
		
		for(var i = 0; i < celda.length; i++){
			if(celda[i].id == id){
				medico_data = {
				nombre: celda[i].childNodes[0].textContent,
				especialidad: celda[i].childNodes[1].textContent
				};
			}
		}		
		
		console.log(medico_data);
		
		//xmlhttprequest()			
		fetch('http://localhost:3000/api/cambiarmedico/'+ id, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(medico_data)
		})
		.then(function(response){
			response.json()
				.then(function(data){
					that.setState({
							medicos: data
						});					
			})
		})
		.catch(function(err){
			console.log(err)
		});
		console.log('Finalizo');
		
	}
		
	removeMedico(id){
		
		var that = this;
		let medicos = this.state.medicos;
		let medico = medicos.find(function(medico){
			return medico.id === id
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
			console.log(response)
			response.json()
				.then(function(data){
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
	
	filReduc(){
		var that = this;
		let medico_data = {
			filtro: this.state.value,
			cambio: this.refs.filtro.value
		};
		console.log(medico_data.filtro);
		console.log(medico_data);
		
		if(medico_data.filtro == "Ninguno"){
			this.setState({pagina: true})
		}
		else{
			
			//xmlhttprequest()			
			fetch('http://localhost:3000/api/filtrarMedico', {
				method: 'GET',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(medico_data)
			})
			.then(function(response){
				console.log(response)
				response.json()
					.then(function(data){
					console.log(data)
				})
			})
			.catch(function(err){
				console.log(err)
			});
			/*
		fetch('http://localhost:3000/api/filtrarMedico')
			.then(function(response){
				response.json()
					.then(function(data){
						//console.log(data);
						that.setState({
							filTab: data
						});
						console.log(that.filTab);
					})		
			});
			*/
		this.setState({pagina: false});
		this.setState({fil: true});
		}
		
	}
	
	change(event){
		//this.state.value
		this.setState({value: event.target.value});
     }
	
	render() {
		if(this.state.pagina){
			return this.inicio();
		}
		else if(this.state.fil){
			return this.filtro();
		}
		else{
			return (<div> cargando... </div>)
		}
	}
	
	inicio(){
		return (
			// <meta charset="utf-8">
			<div className="App">
				<h1> Medi Lock </h1>
				<form ref="medicosForm">
					<input type="text" ref="medico_nombre" placeholder="Nombre"/>
					<input type="text" ref="medico_especialidad" placeholder="Especialidad"/>
					<button onClick={this.addMedico.bind(this)}>ADD MEDICO</button>
				</form>
				<br/>
				<select id="lang" onChange={this.change.bind(this)} value={this.state.value}>
				  <option value="nombre">Nombre</option>
				  <option value="especialidad">Especialidad</option>
				   <option value="Ninguno">Ninguno</option>
			   </select>
			   <p></p>
			   <input type = "Text" ref= "filtro" placeholder="filtro"/>
				<code> </code>
				<button onClick={this.filReduc.bind(this)}>Filtrar</button>
					{(this.tablaCompleta())}
			</div>
		);
	}
	
	tablaCompleta(){
		return(
			<table ref="tablamedicos" contentEditable="true" cellspacing="10" cellpadding="10" align="center">
					 <thead>
						<tr>
							<th>Nombre</th>
							<th>Especialidad</th>
						</tr>
					 </thead>
					{
						this.state.medicos.map(
							medico => {
								return(
									<tr ref="fila" id={medico.id}>
											<td type="text" ref="cambioNomMedico"> {medico.nombre} </td>
											<td type="text" ref="cambioEspMedico"> {medico.especialidad} </td>
											<td> <button onClick={this.removeMedico.bind(this, medico.id)}> Eliminar </button> </td>
											<td> <button onClick={this.cambiarMedico.bind(this, medico.id)}> Modificar </button> </td>
									</tr> 
								);
							}
						)
					}
				</table>
		)
	}
	
	filtro(){
		return(
			<div className="App">
				<h1> Medi Lock </h1>
				<form ref="medicosForm">
					<input type="text" ref="medico_nombre" placeholder="Nombre"/>
					<input type="text" ref="medico_especialidad" placeholder="Especialidad"/>
					<button onClick={this.addMedico.bind(this)}>ADD MEDICO</button>
				</form>
				<br/>
				<select id="lang" onChange={this.change.bind(this)} value={this.state.value}>
				  <option value="Nombre">Nombre</option>
				  <option value="Especialidad">Especialidad</option>
				   <option value="Ninguno">Ninguno</option>
			   </select>
			   <p></p>
			   <input type = "Text" ref= "filtro" placeholder="filtro"/>
				<code> </code>
				<button onClick={this.filReduc.bind(this)}>Filtrar</button>
					{(this.nuevaTabla())}
			</div>
		)	
	}
	
	nuevaTabla(){
		return(
			<table ref="tablamedicos" contentEditable="true" cellspacing="10" cellpadding="10" align="center">
					 <thead>
						<tr>
							<th>Nombre</th>
							<th>Especialidad</th>
						</tr>
					 </thead>
					{
						this.state.filTab.map(
							medico => {
								return(
									<tr ref="fila" id={medico.id}>
											<td type="text" ref="cambioNomMedico"> {medico.nombre} </td>
											<td type="text" ref="cambioEspMedico"> {medico.especialidad} </td>
									</tr> 
								);
							}
						)
					}
				</table>
		)
		
	}
	
}

export default App;
