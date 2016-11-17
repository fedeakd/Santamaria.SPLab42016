angular
.module('AngularABM')
.factory("FactoryProducto", function($http,ServicioProducto){
	producto={};
	producto.id=-1;
	producto.nombre="";
	producto.descripcion="";
	producto.cantidad=-1;

	producto.modificar=false;

	producto.TraerTodos= TraerTodos;
	producto.Borrar= Borrar;
	producto.Modificar=Modificar;
	producto.Alta= Alta;
	producto.ConfigurarGrilla=ConfigurarGrilla;
	return producto;

	function TraerTodos(){
		return ServicioProducto.TraerTodos();
	}
	function Borrar(id){
		return ServicioProducto.Borrar(id);
	}
	function Modificar(){
		return ServicioProducto.Modificar(producto);
	}

	function Alta(){
		return ServicioProducto.Alta(producto);
	}

	function ConfigurarGrilla(estado){
		console.log(estado);
		var miArray=[{ field: 'id', name: '#', width: 45},
		{ field: 'nombre', name: 'nombre',minWidth: 90},
		{ field: 'descripcion', name: 'descripcion',minWidth: 20},
		{ field: 'cantidad', name: 'cantidad',minWidth: 200}]

		if(estado=='admin' ||estado=="vendedor"){
			miArray.push( { field: 'borrar', name: 'borrar'
		,cellTemplate:'<button ng-click="grid.appScope.Borrar(row.entity,grid.renderContainers.body.visibleRowCache.indexOf(row))" class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash">&nbsp;Borrar</i></button>'
		, enableFiltering: false
	},
	{ field: 'modificar', name: 'modificar'
	,cellTemplate:'<button ng-click="grid.appScope.Modificar(row.entity)" class="btn btn-warning btn-sm"><i class="glyphicon glyphicon-erase">&nbsp;Modificar</i></button>'
	, enableFiltering: false
});

		}

		return miArray;

		return [
		{ field: 'id', name: '#', width: 45},
		{ field: 'nombre', name: 'nombre',minWidth: 90},
		{ field: 'descripcion', name: 'descripcion',minWidth: 20},
		{ field: 'cantidad', name: 'cantidad',minWidth: 200},
		{ field: 'borrar', name: 'borrar'
		,cellTemplate:'<button ng-show="false" ng-click="grid.appScope.Borrar(row.entity,grid.renderContainers.body.visibleRowCache.indexOf(row))" class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash">&nbsp;Borrar</i></button>'
		, enableFiltering: false
	},
	{ field: 'modificar', name: 'modificar'
	,cellTemplate:'<button ng-click="grid.appScope.Modificar(row.entity)" class="btn btn-warning btn-sm"><i class="glyphicon glyphicon-erase">&nbsp;Modificar</i></button>'
	, enableFiltering: false
},

];

}
})