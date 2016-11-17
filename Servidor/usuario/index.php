<?php use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'Personas.php';
require '../AccesoDatos.php';
$app = new \Slim\App;


$app->post('/alta/{usuario}', function (Request $request, Response $response,$args) {
	$usuario=json_decode($args['usuario']);
	$per = new Persona(); 
	$per->nombre=$usuario->nombre;
	$per->usuario=$usuario->usuario;
	$per->clave=$usuario->clave;
	$per->mail=$usuario->mail;
	$per->estado="normal";
	$per->imagen="nada";
	$per->imagenCantidad=0;

	if(Persona::VerificarMailYUsuario($per->mail,$per->usuario)){
		$response->getBody()->write("yaSeEncuentra");
		return;
	}
	/*
	$per->imagen=date("Ymd_His");
	$per->imagenCantidad=count($obj->imagenes);
	for ($i=0; $i < count($obj->imagenes); $i++) { 
		$rutaVieja="../fotos/".$obj->imagenes[$i];
		$rutaNueva=$per->imagen.($i+1).".png";
		copy($rutaVieja, "../fotos/".$rutaNueva);
		unlink($rutaVieja);


	}*/
	$per->InsertarPersona();
	$response->getBody()->write("ok");
});


$app->get('/', function (Request $request, Response $response) {
	$response->getBody()->write(json_encode(Persona::TraerTodosLosUsuarios()));

	return $response;
});

$app->get('/verificar/{usuario}', function ($request, $response, $args) {
	$usuario=json_decode($args['usuario']);
	$response->getBody()->write(json_encode(Persona::TraerUnUsuario($usuario->mail,$usuario->clave,$usuario->usuario)));

	return $response;
});
$app->delete('/{id}', function (Request $request, Response $response) {
	$id=$request->getAttribute('id');
	/*$ruta="../fotos/".$respuesta->datos->persona->imagen;ruta anterior
	for ($i=0; $i < 3; $i++) { Borro  la fotos viejas 
		if(file_exists ($ruta.($i+1).".png")){
			unlink($ruta.($i+1).".png");
		}
	}*/
	Persona::BorrarUsuario($id);
	$response->getBody()->write("ok");

	return $response;
});

$app->put('/modificar/{usuario}' , function ($request, $response, $args)  {
	$usuario=json_decode($args['usuario']);
	$per = new Persona(); 
	$per->nombre=$usuario->nombre;
	$per->usuario=$usuario->usuario;
	$per->clave=$usuario->clave;
	$per->mail=$usuario->mail;
	$id=$usuario->id;
	Persona::ModificarUsuario($per,$id,FALSE );
	$response->getBody()->write("ok");
	return $response;
});
$app->run(); 