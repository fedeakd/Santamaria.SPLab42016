angular
.module('AngularABM')
.service('ServicioVotante', function ($http) {
	var urlVotante= "http://localhost:81/servidor/votante/";
	this.TraerTodos=TraerTodos;
	this.Borrar=Borrar;
	this.Modificar=Modificar;
	this.Alta=Alta;
	function TraerTodos(){

		return $http.get(urlVotante).then(function(data){
			return data.data;
		});
	}
	function Borrar(id){
		return $http.delete(urlVotante+""+id)
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}
	function Modificar(votante){
		return $http.put(urlVotante+"modificar/"+JSON.stringify(votante))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}
	function Alta(votante){
		return $http.post(urlVotante+"alta/"+JSON.stringify(votante))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}


})