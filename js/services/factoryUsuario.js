angular
.module('AngularABM')
.factory("FactoryUsuario", function($http,ServicioUsuario,uiGridConstants){
	usuario={};
	usuario.id=-1;
	usuario.nombre="";
	usuario.usuario="";
	usuario.mail="";
	usuario.clave="";
	usuario.reClave="";
	usuario.imagen;

	usuario.modificar=false;

	usuario.TraerTodos= TraerTodos;
	usuario.Borrar=Borrar;
	usuario.VerificarLogin=VerificarLogin;
	usuario.Alta=Alta;
	usuario.Modificar=Modificar;
	usuario.ConfigurarGrilla=ConfigurarGrilla;
	return usuario;

	function TraerTodos(){
		return ServicioUsuario.TraerTodos();
	}
	function Borrar(){
		return ServicioUsuario.Borrar(usuario.id);
	}
	function VerificarLogin(){
		return ServicioUsuario.VerificarLogin(usuario);
	}
	function Modificar(){
		return ServicioUsuario.Modificar(usuario);
	}
	function Alta(){
		return ServicioUsuario.Alta(usuario);
	}
	function ConfigurarGrilla(){
		return [
		{ field: 'id', name: '#', width: 45},
		{ field: 'usuario', name: 'usuario',minWidth: 90},
		{ field: 'nombre', name: 'nombre',minWidth: 20},
		{ field: 'mail', name: 'mail',minWidth: 200},
		{ field: 'estado', name: 'estado',minWidth: 90
		 ,filter: {
            // term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [
              {value: 'admin', label: 'admin'},
              {value: 'normal', label: 'normal'}
            ]
          } 

	},
   { field: 'borrar', name: 'borrar'
          ,cellTemplate:'<button ng-click="grid.appScope.Borrar(row.entity,grid.renderContainers.body.visibleRowCache.indexOf(row))" class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash">&nbsp;Borrar</i></button>'
          , enableFiltering: false
        },
        { field: 'modificar', name: 'modificar'
          ,cellTemplate:'<button ng-click="grid.appScope.Modificar(row.entity)" class="btn btn-warning btn-sm"><i class="glyphicon glyphicon-erase">&nbsp;Modificar</i></button>'
          , enableFiltering: false
        },

		];
	}
})