<?php
include_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
$datosDelModeloPorPOst=file_get_contents("php://input");
$user=json_decode($datosDelModeloPorPOst);
/*$key = "example_key";
$token = array(
    "iss" => "http://example.org",
    "aud" => "http://example.com",
    "iat" => 1356999524,
    "nbf" => 1357000000
    );*/



$claveDeEncripcion="nada";
$token['mail']=$user->mail;
$token['clave']=$user->clave;
$token['nombre']=$user->nombre;
$token['estado']=$user->estado;
$token['usuario']=$user->usuario;
$token['imagen']=$user->imagen;
$token['cantidad']=$user->imagenCantidad;
$token['iat']= time();
$token['exp']= time()+23234;


$jwt = JWT::encode($token, $claveDeEncripcion); 
$arrayConToken["Persona"]=$jwt;
echo  json_encode($arrayConToken);


?>