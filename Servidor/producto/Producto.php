<?php

class Producto{
	public $id;
	public $nombre;
	public $descripcion;
	public $cantidad;
	public $imagen;


	public function toString(){
		return "$this->nombre-$this-apellido-$this->ciudad-$this->usuario-$this-clave";

	}
	public static function InsertarProducto($producto)
	{

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into productos (nombre,descripcion,cantidad )
			values('$producto->nombre',
				'$producto->descripcion',
				$producto->cantidad)");
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();


	}
	public static function SiExiste($usuario){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios where usuario='$usuario'");
		$consulta->execute();
		return $consulta->rowCount();            

	}
	public static function VerificarLogeo($mail,$clave){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios where mail='$mail' && clave='$clave'");
		$consulta->execute();
		return $consulta->rowCount();            

	}

	public static function ComprobarUsuarioYClave($usuario,$clave){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT estado, usuario  as usuario ,clave as clave from usuarios where usuario='$usuario' && clave='$clave'");
		$consulta->execute();
		$per= $consulta->fetchObject('Persona');
		return $per; 
	}
	public static function TraerTodosLosProductos(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT *  from productos");
	  	$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Producto"); 
	}
	public static function Borrar($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			delete 
			from  productos
			WHERE id=:id"); 
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);    
		$consulta->execute();
		return $consulta->rowCount();
	}

	public static function TraerUnUsuario($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,nombre,apellido,ciudad,usuario as usuario,clave as clave from usuarios where id=$id");
		$consulta->execute();
		$per= $consulta->fetchObject('Persona');
		return $per;       

	}
	public static function Modificar($obj,$id){
		try{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE Productos
				SET nombre='$obj->nombre',
				cantidad='$obj->cantidad',
				descripcion='$obj->descripcion'
				WHERE id='$id'");
		}catch(exception $e){
			echo $e->getMessage();
		}
		return $consulta->execute();
	}
}

?>
