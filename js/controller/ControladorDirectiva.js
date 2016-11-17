miApp.controller("controladorDirectiva",function($scope,$state,FactoryUsuario,FactoryProducto,NgMap){
	$scope.map = {};
	$scope.map.name = "Alarmas";
	$scope.map.latitud = -34.6671999;
	$scope.map.longitud = -58.35926;
	FactoryUsuario.TraerTodos().then(function(respuesta) { 
		$scope.listadoUsuarios=respuesta;

	})

	FactoryProducto.TraerTodos().then(function(respuesta) { 
		$scope.listadoProductos=respuesta;

	})

})