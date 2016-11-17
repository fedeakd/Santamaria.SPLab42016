

miApp.controller("controlRegistrarVotante",function($http,$scope,$state,FileUploader,$stateParams,$auth,FactoryVotante){
	if(!$auth.isAuthenticated()){
		$state.go("persona.login");
	}
	var accion='InsertarVotante';
	$scope.label1="Registrar";
	$scope.label2="Registro";
	$scope.id=-1;
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});
	$scope.Aceptar=function(){
		FactoryVotante.nombre= $scope.nombre;
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
	}

	});
miApp.controller("controlModificarVotante",function($http,$scope,$state,FileUploader,$stateParams,$auth,FactoryVotante){
	//La id  ya viene de desde  grilla 
	$scope.uploader=new FileUploader({url:'PHP/nexo.php'});

	$state.go("persona.registrarVotante",{urlVotante:'Modificar123'},{notify: false, reload: false});
	$scope.label1="Modificar";
	$scope.label2="Modificacion";
	$scope.nombre=FactoryVotante.nombre;
	$scope.candidato=FactoryVotante.candidato;
	$scope.sexo=FactoryVotante.sexo;
	console.log(FactoryVotante.fecha);
	$scope.fecha=  new Date(FactoryVotante.fecha);

	$scope.id=FactoryVotante.id;
	FactoryVotante.modificar=false;

	$scope.Aceptar=function(){
		FactoryVotante.nombre= $scope.nombre;
		FactoryVotante.candidato= $scope.candidato;
		FactoryVotante.sexo=$scope.sexo;
		FactoryVotante.fecha= $scope.fecha;


		FactoryVotante.Modificar().then(function(respuesta){
			if (respuesta=="ok") {

				bootbox.alert({
					message: "Has modificado un voto!!",
					className: 'bb-alternate-modal'
				});
				$state.go("persona.GrillaVotante");


			};
			console.log(respuesta);
		})
	}
})

miApp.controller("controlGrillaVotante",function($http,$scope,$state,$auth,ServicioVotante,FactoryVotante){

	console.log(ServicioVotante);
	console.log(FactoryVotante);
	if(!$auth.isAuthenticated()){
		$state.go("persona.login");
	}

	FactoryVotante.TraerTodos().then(function(respuesta){
		$scope.ListadoVotantes =respuesta;
	},
	function errorCallback(response) {
		$scope.ListadoPersonas= [];
		console.log( response);

	});
	$scope.Borrar=function(votante,index){

		FactoryVotante.Borrar(votante.id).then(function(respuesta){ 	
			if(respuesta=="ok"){
				$scope.ListadoVotantes.splice(index, 1);
				bootbox.alert({
					message: "Votante eliminado!!",
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

	$scope.Modificar=function(votante){
		FactoryVotante.id= votante.id;
		FactoryVotante.nombre= votante.nombre;
		FactoryVotante.candidato= votante.candidato;
		FactoryVotante.sexo=votante.sexo;
		FactoryVotante.fecha= votante.fecha;
		FactoryVotante.modificar=  true;
		$state.go("persona.modificarVotante");
	}

});
