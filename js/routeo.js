
var miApp= angular.module("AngularABM",['ui.router','angularFileUpload','satellizer','ngAnimate', 'ngTouch',
	'ui.grid',
	'ui.grid.pagination',
	'ui.grid.resizeColumns',
	'ui.grid.selection',
	'ui.grid.exporter',
	'ui.grid.edit']);
miApp.factory("global",function(){
	return{
		votante:'',
		modificar:false,
		persona:'',
		modificarPersona:''
	}
})

miApp.config(function($stateProvider,$urlRouterProvider,$authProvider){
	$authProvider.loginUrl='Laboratorio4/Parcial1/PHP/auth.php';
	$authProvider.tokenName="Persona";
	$authProvider.tokenPrefix="Aplicacion";
	$authProvider.authHeader="data";

	$stateProvider
	.state(
		"persona",{
			url:"/persona",
			abstract:true,
			cache:false	,
			templateUrl:"Templetes/abstractaPersona.html",
			controller:"controlPersonaAbstracta"
		}
		)
	.state(
		"producto",{
			url:"/Producto",
			abstract:true,
			cache:false	,
			templateUrl:"Templetes/abstractaPersona.html",
			controller:"controlPersonaAbstracta"
		}
		)
	.state(
		"persona.menu",{
			url:"/menu",
			views:{
				"contenido":{
					templateUrl:"Templetes/personaMenu.html",
					controller:"controlPersonaMenu"
				}
				
			}

		}
		)	
	.state(
		"persona.alta",{
			url:"/alta",
			views:{
				"contenido":{
					templateUrl:"Templetes/personaAlta.html",
					controller:"controlPersonaalta"
				}
				
			}

		}
		)	.state(
		"persona.modificar",{
			url:"/modificar",
			views:{
				"contenido":{
					templateUrl:"Templetes/personaAlta.html",
					controller:"controlPersonaModificar"
				}
				
			}

		}
		)
		.state(
			"persona.grilla",{
				url:"/grilla",
				views:{
					"contenido":{
						templateUrl:"Templetes/personaGrilla.html",
						controller:"controlPersonagrilla"
					}

				}

			}
			)	.state(
			"persona.login",{
				url:"/login",
				views:{
					"contenido":{
						templateUrl:"Templetes/personaLogin.html",
						controller:"controlPersonaLogin"
					}

				}

			}
			).state(
			"producto.registrarProducto",{
				url:"/producto/alta",
				views:{
					"contenido":{
						templateUrl:"Templetes/ProductoAlta.html",
						controller:"controlRegistrarProducto"
					}

				}

			}
			)	
			.state(
				"producto.modificarProducto",{
					url:"/producto/modificar",
					views:{
						"contenido":{
							templateUrl:"Templetes/ProductoAlta.html",
							controller:"controlModificarProducto"
						}

					}

				}
				).state(
				"producto.GrillaProducto",{
					url:"/producto/Grilla",
					views:{
						"contenido":{
							templateUrl:"Templetes/ProductoGrilla.html",
							controller:"controlGrillaProducto"
						}

					}

				}
				).state(
				"persona.directiva",{
					url:"/directiva",
					views:{
						"contenido":{
							templateUrl:"Templetes/ParteDirectiva.html",
							controller:"controladorDirectiva"
						}

					}

				}
				)


				$urlRouterProvider.otherwise("/persona/login");


			}).animation('.slide-animation', function () {
				return {
					beforeAddClass: function (element, className, done) {
						var scope = element.scope();

						if (className == 'ng-hide') {
							var finishPoint = element.parent().width();
							if(scope.direction !== 'right') {
								finishPoint = -finishPoint;
							}
							TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
						}
						else {
							done();
						}
					},
					removeClass: function (element, className, done) {
						var scope = element.scope();

						if (className == 'ng-hide') {
							element.removeClass('ng-hide');

							var startPoint = element.parent().width();
							if(scope.direction === 'right') {
								startPoint = -startPoint;
							}

							TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
						}
						else {
							done();
						}
					}
				};
			});
