angular
.module('AngularABM')
.service('ServicioProducto', function ($http) {
	var urlProducto= "http://localhost:81/servidor/producto/";
	this.TraerTodos=TraerTodos;
	this.Borrar=Borrar;
	this.Modificar=Modificar;
	this.Alta=Alta;
	function TraerTodos(){

		return $http.get(urlProducto).then(function(data){
			return data.data;
		});
	}
	function Borrar(id){
		return $http.delete(urlProducto+""+id)
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}
	function Modificar(producto){
		return $http.put(urlProducto+"modificar/"+JSON.stringify(producto))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}
	function Alta(producto){
		return $http.post(urlProducto+"alta/"+JSON.stringify(producto))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}


})