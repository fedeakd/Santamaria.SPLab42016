

miApp.controller("controlRegistrarProducto",function($http,$scope,$state,FileUploader,$stateParams,$auth,FactoryProducto){
	console.log(FactoryProducto);
	$scope.nombre="123";
	$scope.descripcion="asdasd";
	$scope.cantidad=23;
	if(!$auth.isAuthenticated()){
		$state.go("persona.login");
	}
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});

	$scope.Aceptar=function(){
		console.log("hola");
		FactoryProducto.nombre= $scope.nombre;
		FactoryProducto.descripcion= $scope.descripcion;
		FactoryProducto.cantidad=$scope.cantidad;
		console.log(FactoryProducto);
		FactoryProducto.Alta().then(function(respuesta){
			console.log(respuesta);
			if(respuesta=="ok"){
				bootbox.alert({
					message: "Has ingresado un Producto!!",
					className: 'bb-alternate-modal'
				});
				$state.go("producto.GrillaProducto");
			}
			else{
				bootbox.alert({
					message: "Algo salio mal!!",
					className: 'bb-alternate-modal'
				}); 
			}

		})
	}
	/*if(!$auth.isAuthenticated()){
		$state.go("persona.login");
	}
	var accion='InsertarVotante';
	$scope.label1="Registrar";
	$scope.label2="Registro";
	$scope.id=-1;
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
	$scope.Aceptar=function(){
		FactoryProducto.nombre= $scope.nombre;
		FactoryVotante.candidato= $scope.candidato;
		FactoryVotante.sexo=$scope.sexo;
		FactoryVotante.fecha= $scope.fecha;

		FactoryVotante.Alta().then(function(respuesta){
			console.log(respuesta);	
			if(respuesta=="ok"){
				bootbox.alert({
					message: "Has ingresado un voto!!",
					className: 'bb-alternate-modal'
				});
				$state.go("persona.GrillaVotante");
			}
			else{
				bootbox.alert({
					message: "Algo salio mal!!",
					className: 'bb-alternate-modal'
				}); 
			}

		})
}*/

});

miApp.controller("controlModificarProducto",function($http,$scope,$state,FileUploader,$stateParams,$auth,FactoryProducto){
	//La id  ya viene de desde  grilla 
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
	$scope.label1="Modificar";
	$scope.label2="Modificacion";
	console.log(FactoryProducto);

	$scope.nombre=FactoryProducto.nombre;
	$scope.cantidad=FactoryProducto.cantidad;
	$scope.descripcion=FactoryProducto.descripcion;
	$scope.id=FactoryProducto.id;
	FactoryProducto.modificar=false;

	$scope.Aceptar=function(){
		FactoryProducto.nombre= $scope.nombre;
		FactoryProducto.descripcion= $scope.descripcion;
		FactoryProducto.cantidad=$scope.cantidad;


		FactoryProducto.Modificar().then(function(respuesta){
			console.log(respuesta);
			if (respuesta=="ok") {

				bootbox.alert({
					message: "Has modificado un producto!!",
					className: 'bb-alternate-modal'
				});
				$state.go("producto.GrillaProducto");


			};
			console.log(respuesta);
		})
	}
})

miApp.controller("controlGrillaProducto",function($http,$scope,$state,$auth,ServicioVotante,FactoryProducto,$auth){


	if(!$auth.isAuthenticated()){
		$state.go("persona.login");
	}

	$scope.gridOptions = {};
	$scope.gridOptions = {
      // Configuracion para exportar datos.
      exporterCsvFilename: 'misdatos.csv',
      exporterCsvColumnSeparator: ';',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
      exporterPdfFooter: function ( currentPage, pageCount ) {
      	return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
      },
      exporterPdfCustomFormatter: function ( docDefinition ) {
      	docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      	docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      	return docDefinition;
      },
      exporterPdfOrientation: 'portrait',
      exporterPdfPageSize: 'LETTER',
      exporterPdfMaxGridWidth: 500,
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      onRegisterApi: function(gridApi){
      	$scope.gridApi = gridApi;
      }
  };
  $scope.gridOptions.enableGridMenu = true;
  $scope.gridOptions.selectAll = true;
  $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;



    FactoryProducto.TraerTodos().then(function(respuesta){
    	$scope.ListadoProductos =respuesta;
    	$scope.gridOptions.data=respuesta;
    	$scope.gridOptions.columnDefs=FactoryProducto.ConfigurarGrilla($auth.getPayload().estado);
    },
    function errorCallback(response) {
    	$scope.ListadoPersonas= [];
    	console.log( response);

    });
    $scope.Borrar=function(actor,index){

    	FactoryProducto.Borrar(actor.id).then(function(respuesta){ 	
    		if(respuesta=="ok"){
    			$scope.ListadoProductos.splice(index, 1);
    			bootbox.alert({
    				message: "Producto eliminado!!",
    				className: 'bb-alternate-modal'
    			});
    		}
    		else{
    			bootbox.alert({
    				message: "Algo salio mal !!",
    				className: 'bb-alternate-modal'
    			});	
    		}


    	},function errorCallback(response) {
    		$scope.ListadoPersonas= [];
    		console.log( response);

    	});
    }

    $scope.Modificar=function(actor){
    	FactoryProducto.id= actor.id;
    	FactoryProducto.nombre= actor.nombre;
    	FactoryProducto.cantidad= actor.cantidad;
    	FactoryProducto.descripcion=actor.descripcion;
    	FactoryProducto.modificar=  true;
    	$state.go("producto.modificarProducto");
    }

});
