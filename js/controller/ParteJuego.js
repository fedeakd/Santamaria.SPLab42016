var miApp= angular.module("Juego",['ui.router']);
miApp.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state(
		"juego",{
			url:"/juego",
			abstract:true,
			templateUrl:"Templetes/abstractaJuego.html",
			controller:"controlJuego"
		}
		).state(
		"juego.menu",{
			url:"/menu",
			views:{
				"controlador":{
					templateUrl:"Templetes/juegoMenu.html",
					controller:"controlJuegoMenu"
				}
				
			}

		}
		).state(
		"juego.adivinaElNumero",{
			url:"/adivinaElNumero",
			views:{
				"controlador":{
					templateUrl:"Templetes/juegoAdivinaElNumero.html",
					controller:"controlAdivinaElNumero"
				}
				
			}

		}
		).state(
		"juego.adivinaElNumero2",{
			url:"/adivinaElNumero2",
			views:{
				"controlador":{
					templateUrl:"Templetes/juegoAdivinaElNumero2.html",
					controller:"controlAdivinaElNumero2"
				}
				
			}

		}
		)		


	});


miApp.controller("controlJuego",function($scope){



});


miApp.controller("controlJuegoMenu",function($scope){



});
miApp.controller("controlAdivinaElNumero",function($scope){
	var numeroSecreto= (Math.floor(Math.random()*100)+1);
	$scope.contadorIntentos=0;
	var gano= false;

	var total ;
	$scope.calcular=function(){
		if(gano){
			alert("Ya has ganado!!!");
			return;
		}
		var numUsuario=parseInt($scope.numUsuario);
		if(numeroSecreto == numUsuario){
			$scope.contadorIntentos++;
			alert("Usted es un ganador!!! y en solo  "+ $scope.contadorIntentos +" intentos")
			gano=true;
		}else{
			if(numUsuario>numeroSecreto){
				$scope.contadorIntentos++;
				alert("se paso  ")
			}else{
				$scope.contadorIntentos++;
				alert("falta ")
			}

		}  
	}



});
miApp.controller("controlAdivinaElNumero2",function($scope){
	var numeroSecreto= (Math.floor(Math.random()*100)+1);
	$scope.contadorIntentos=0;
	var gano= false;
	var total=0;
	$scope.comenzar= function()
	{
		if (numeroSecreto == $scope.numUsuario){
			console.log($scope.contadorIntentos)
			if($scope.contadorIntentos == 1){
				alert("Usted es un Psíquico")
			}if($scope.contadorIntentos == 2){
				alert("excelente percepcion")
			}if($scope.contadorIntentos == 3){
				alert("Esto es suerte ")
			}if($scope.contadorIntentos == 4){
				alert("Exelente tecnica")
			}if($scope.contadorIntentos == 5){
				alert("Usted esta en la medida ")
			}if(($scope.contadorIntentos>=6)&&($scope.contadorIntentos<=10)){

				alert("falta tecnica")
			}if($scope.contadorIntentos >10){
				alert("afortunado enel amor!!!")
			}

		}else{
			if($scope.numUsuario>numeroSecreto){
				$scope.contadorIntentos++;
				console.log($scope.contadorIntentos);
				alert("se paso  ")
			}else{
				$scope.contadorIntentos++;
				alert("falta ")
			}


		}


	}

	$scope.verificar= function()
	{
		alert($scope.contadorIntentos);


	}



});
