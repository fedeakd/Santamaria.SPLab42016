miApp.controller("controlPersonaAbstracta",function($scope,$state,$auth,global){
	$scope.isAuthenticated = function() {
		 	if($auth.isAuthenticated()){//Una vez que este logeado
		 		$scope.mail=$auth.getPayload().mail;
		 		$scope.usuario=$auth.getPayload().usuario;
		 		$scope.nombre=$auth.getPayload().nombre;
		 		$scope.estado=$auth.getPayload().estado;
		 		
		 	}

		 	return $auth.isAuthenticated();
		 };

		 $scope.DesLogeo=function(){
		 	$state.go("persona.login");
		 	$auth.logout();

		 }
		 $scope.IrAAlta=function(){

		 	$state.go("persona.alta");

		 }

		 $scope.IrAGrillaDeUsuario=function(){
		 	$state.go("persona.grilla");

		 }
		 $scope.IrALogin=function(){
		 	$state.go("persona.login");

		 }
		 $scope.IrAGrillaProducto=function(){
		 	$state.go("producto.GrillaProducto");

		 }
		 $scope.IrARegistrarProducto=function(){
		 	console.log("hola");
		 	$state.go("producto.registrarProducto");

		 }
		 $scope.IrALaDirectiva=function(){
		 	$state.go("persona.directiva");
		 }
		});

miApp.controller("controlPersonaMenu",function($scope, $state,$auth){

	if(!$auth.isAuthenticated()){
		$state.go("persona.login");
	}
	$scope.irAAlta=function(){

		$state.go("persona.alta");

	}

	$scope.IrAGrilla=function(){
		$state.go("persona.grilla");
	}


	$scope.IrAlLogin=function(){
		$state.go("persona.login");
	} 
});

miApp.controller("controlPersonaalta",function($scope,$state, FileUploader, $http,$auth,global,FactoryUsuario){
	console.log(global);
	if(($auth.isAuthenticated())&& (!global.modificarPersona)){
		console.log("entro");	
		$state.go("persona.grilla");
	}
	var id=-1;
	var imagenes=[];
	var queHacer="insertar";
	var persona={};
	$scope.uploader=new FileUploader({url:'PHP/ParteImagen.php'});
	$scope.uploader.queueLimit=3;
	

	

	$scope.uploader.onSuccessItem=function(item, response, status, headers)// Sube la foto  temporal 
	{
		imagenes.push( item.file.name);
		console.log("Se insertaran "+ imagenes.length + " fotos");
		//console.info("Ya guardé el archivo.", item, response, status, headers);
	};


	$scope.IrAlMenu= function(){
		$state.go("persona.menu")
	}
	$scope.Guardar=function(){
		//console.log($scope.uploader.queue);
		FactoryUsuario.usuario=$scope.usuario;
		FactoryUsuario.nombre=$scope.nombre;
		FactoryUsuario.mail=$scope.mail;
		FactoryUsuario.clave=$scope.clave;
		FactoryUsuario.imagenes=imagenes;

		
		FactoryUsuario.Alta()
		.then(function(respuesta) { 
			console.log(respuesta);

			if(respuesta=="ok"){ 
				$state.go("persona.login");     
				bootbox.alert({
					message: "Te has registrado bien!!",
					className: 'bb-alternate-modal'
				});
			}

			else if(respuesta=="yaSeEncuentra"){
				bootbox.alert({
					message: "El mail o el usuario  ya se encuentra !!",
					className: 'bb-alternate-modal'
				});
			}
			else{
				bootbox.alert({
					message: "algo salio mal!!",
					className: 'bb-alternate-modal'
				});
			}

		},function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });
		
	}

});
miApp.controller("controlPersonaModificar",function($scope,$state, FileUploader, $http,$auth,global,FactoryUsuario){
	console.log("soy modificar en mi maxima expresion ");
	$scope.uploader=new FileUploader({url:'PHP/ParteImagen.php'});
	$scope.uploader.queueLimit=3;

	$scope.usuario= FactoryUsuario.usuario;
	$scope.nombre=FactoryUsuario.nombre;
	$scope.mail=FactoryUsuario.mail;
	$scope.clave=FactoryUsuario.clave;
	$scope.reClave=FactoryUsuario.clave;

	var num=0;
	/*FactoryUsuario.imagenesSlides.imagenes.forEach(function(imagen) {
		var url = imagen;
		$http.get(url,{responseType: "blob"}).
			success(function(data, status, headers, config) {//guardo  las imagenes  del usuario  que  quiere modificar

				var mimetype = data.type;
				var file = new File([data], "IMG_20130731_211048.jpg",{type:mimetype});
				var dummy = new FileUploader.FileItem($scope.uploader, {name:"subido"+(++num)});
				dummy._file = file;
				$scope.uploader.queue.push(dummy);
			}).
			error(function(data, status, headers, config) {
				alert("The url could not be loaded...\n (network error? non-valid url? server offline? etc?)");
			});

	})
aa*/
$scope.Guardar=function(){
		//console.log($scope.uploader.queue);
		FactoryUsuario.usuario=$scope.usuario;
		FactoryUsuario.nombre=$scope.nombre;
		FactoryUsuario.mail=$scope.mail;
		FactoryUsuario.clave=$scope.clave;

		FactoryUsuario.Modificar().then(function(respuesta) {  
			console.log(respuesta);
			if(respuesta=="ok"){
				$state.go("persona.grilla");     
				bootbox.alert({
					message: "ah sido modificado !!",
					className: 'bb-alternate-modal'
				});
			}
			else{
				bootbox.alert({
					message: "algo salio mal!!",
					className: 'bb-alternate-modal'
				});
			}
		})	

	}
})

miApp.controller("controlPersonagrilla",function($scope,$state,$http,global,$auth, uiGridConstants,FactoryUsuario,i18nService ){
	console.log(FactoryUsuario);

	if(!$auth.isAuthenticated()){
		$state.go("persona.login");
	}

	else{
		console.log($auth.getPayload().estado);
		if($auth.getPayload().estado!=="admin"){
			bootbox.alert({
				message: "Lo siento  solo los administradores pueden ver la grilla !!",
				className: 'bb-alternate-modal'
			});
			$state.go("producto.GrillaProducto");

		}
		$scope.isAdmin=$auth.getPayload().estado=="admin"?true:false;
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
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    /*data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
  });*/



$scope.setCurrentSlideIndex = function (index,esto) {
	$scope.direction = (index > esto.index) ? 'left' : 'right';
	esto.index = index;
};

$scope.isCurrentSlideIndex = function (index,esto) {

	return esto.index === index;
};

$scope.prevSlide = function (esto) {
	$scope.direction = 'left';
	esto.index = (esto.index < esto.imagenes.length - 1) ? ++esto.index : 0;
};
$scope.nextSlide = function (esto) {
	$scope.direction = 'right';
	esto.index = (esto.index > 0) ? --esto.index : esto.imagenes.length - 1;
};


FactoryUsuario.TraerTodos().then(function(respuesta) {     	
	$scope.ListadoPersonas =respuesta;
	$scope.gridOptions.data=respuesta;

	$scope.gridOptions.columnDefs=FactoryUsuario.ConfigurarGrilla();
		//Arranca el juego jajaaj 
		$scope.ListadoPersonas.forEach(function(persona) {
			
			var imagenesSlides={index:0, imagenes:[]};
			for (var i = 0; i < persona.imagenCantidad; i++) {
				imagenesSlides.imagenes.push("fotos/"+persona.imagen+(i+1)+".png");
			};
			persona.imagenesSlides=imagenesSlides;
		});

	},function errorCallback(response) {
		$scope.ListadoPersonas= [];
		console.log( response);

	});


$scope.Borrar=function(persona,index){
	console.log(persona,index);
	FactoryUsuario.id=persona.id;
	FactoryUsuario.Borrar().then(function(respuesta) {  	
		console.log(respuesta);	
		if(respuesta=="ok"){
			$scope.ListadoPersonas.splice(index, 1);
			bootbox.alert({
				message: "Usuario eliminado!!",
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
	console.log(persona+ " "+ index);

}

$scope.Modificar=function(persona){
	console.log(persona);
	FactoryUsuario.id=persona.id;
	FactoryUsuario.usuario=persona.usuario;
	FactoryUsuario.nombre=persona.nombre;
	FactoryUsuario.mail=persona.mail;
	FactoryUsuario.clave=persona.clave;
	FactoryUsuario.imagen=persona.imagen;
	FactoryUsuario.modificar=true;
	$state.go("persona.modificar");
}

});


miApp.controller("controlPersonaLogin",function($scope, $state,$auth,$http,FactoryUsuario){
	$scope.persona={};
	$scope.CargarDatos=function(dato){


		switch(dato){
			case "usuario":

			$scope.usuario="fedeakd";
			break;
			case "mail":
			$scope.mail="soii_fede@hotmail.com";
			break;
			case "clave":
			$scope.clave="federico18";
			break;
		}

	}
	$scope.Logearse=function(){
		FactoryUsuario.mail= $scope.persona.mail.$modelValue;
		FactoryUsuario.clave=$scope.persona.clave.$modelValue;
		FactoryUsuario.usuario=$scope.persona.usuario.$modelValue;
		FactoryUsuario.VerificarLogin().then(function(respuesta) { 

			console.log(respuesta);
			
			if(respuesta!="false"){
				$auth.login(respuesta).then(function(response) {
					
					$state.go("persona.grilla");
					

				}).catch(function(r){
					console.info("lala",r)

				})
			}
			else{
				bootbox.alert({
					message: "Algo salio mal, verifique el mail y la clave ",
					callback: function () {
						console.log('This was logged in the callback!');
					}
				}) 
			}	






		},function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });


	}

	$scope.IrAlMenu= function(){
		console.log("Salta por la ventana");
		$state.go("persona.menu")
	}

	$scope.prueba=function(){
		alert("hola");
	}

});

