<?php use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'Producto.php';
require '../AccesoDatos.php';
$app = new \Slim\App;


$app->post('/alta/{producto}', function (Request $request, Response $response,$args) {
	$producto=json_decode($args['producto']);
	Producto::InsertarProducto($producto);
	$response->getBody()->write("ok")	;
	return $response;
});


$app->get('/', function (Request $request, Response $response) {
	$response->getBody()->write(json_encode(Producto::TraerTodosLosProductos()));

	return $response;
});


$app->delete('/{id}', function (Request $request, Response $response) {
	$id=$request->getAttribute('id');

	Producto::Borrar($id);
	$response->getBody()->write("ok");

	return $response;
});

$app->put('/modificar/{producto}' , function ($request, $response, $args)  {
	$producto=json_decode($args['producto']);

	$id=$producto->id;

	Producto::Modificar($producto,$id);	
	$response->getBody()->write("ok");
	return $response;
});
$app->run(); 