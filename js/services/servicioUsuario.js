angular
.module('AngularABM')
.service('ServicioUsuario', function ($http) {
	var urlUsuario= "http://localhost:81/servidor/usuario/";
	this.TraerTodos=TraerTodos;
	this.Borrar=Borrar;
	this.VerificarLogin=VerificarLogin;
	this.Alta=Alta;
	this.Modificar=Modificar
	function TraerTodos(){

		return $http.get(urlUsuario).then(function(data){
			return data.data;
		});
	}

	function Borrar(id){
		return $http.delete(urlUsuario+""+id)
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}
	function VerificarLogin(usuario){
		return $http.get(urlUsuario+"/verificar/"+JSON.stringify(usuario)).then(function(data){
			return data.data;
		});
	}


	function Alta(usuario){
		return $http.post(urlUsuario+"alta/"+JSON.stringify(usuario))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}
	function Modificar(usuario){
		return $http.put(urlUsuario+"modificar/"+JSON.stringify(usuario))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 
	}
})