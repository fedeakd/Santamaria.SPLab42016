angular.module('AngularABM')
.directive('traerUsuarios', function(){

	return {
		scope: {miUsuario: '=usuarioporparametro'},
		replace: true,
		restrict: 'E',
		templateUrl: 'Templetes/directivas/DireUsuarios.html'
	};

})
.directive('traerProductos', function(){

	return {
		scope: {miProducto: '=productoporparametro'},
		replace: true,
		restrict: 'E',
		templateUrl: 'templetes/directivas/DireProductos.html'
	};

})