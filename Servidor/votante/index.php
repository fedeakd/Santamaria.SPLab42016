<?php use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'votante.php';
require 'AccesoDatos.php';
$app = new \Slim\App;


$app->post('/alta/{votante}', function (Request $request, Response $response,$args) {
	$votante=json_decode($args['votante']);
	$date = new DateTime($votante->fecha);
	$votante->fecha= date_format($date, 'Y-m-d');
	Votante::InsertarVoto($votante);
	$response->getBody()->write("ok");

	return $response;
});


$app->get('/', function (Request $request, Response $response) {
	$response->getBody()->write(json_encode( Votante::TraerTodosLosVotante()));

	return $response;
});


$app->delete('/{idVotante}', function (Request $request, Response $response) {
	$id=$request->getAttribute('idVotante');

	Votante::BorrarVotante($id);
	$response->getBody()->write("ok");

	return $response;
});

$app->put('/modificar/{votante}' , function ($request, $response, $args)  {
	$votante=json_decode($args['votante']);

	$id=$votante->id;

	$date = new DateTime($votante->fecha);
	$votante->fecha= date_format($date, 'Y-m-d');

	Votante::ModificarVotante($votante,$id);	
	$response->getBody()->write('ok');
	return $response;
});
$app->run(); 