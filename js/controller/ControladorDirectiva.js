miApp.controller("controladorDirectiva",function($scope,$state,FactoryUsuario,FactoryProducto){
	console.log("hola");
	FactoryUsuario.TraerTodos().then(function(respuesta) { 
		$scope.listadoUsuarios=respuesta;

	})

	FactoryProducto.TraerTodos().then(function(respuesta) { 
		$scope.listadoProductos=respuesta;

	})

})