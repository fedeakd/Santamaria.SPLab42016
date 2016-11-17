<?php

class Votante{
	public $id;
	public $nombre;
	public $candidato;
	public $sexo;
	public $fecha;
	public $imagen;


	public function toString(){
		return "$this->nombre-$this-apellido-$this->ciudad-$this->usuario-$this-clave";

	}
	public static function InsertarVoto($votante)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into votos (nombre,candidato,sexo,fecha )
			values('$votante->nombre',
				'$votante->candidato',
				'$votante->sexo',
				'$votante->fecha')");
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
	public static function TraerTodosLosVotante(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT *  from votos");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Votante"); 
	}
	public static function BorrarVotante($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			delete 
			from  votos   
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
	public static function ModificarVotante($obj,$id){
		try{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE votos
				SET nombre='$obj->nombre',
				candidato='$obj->candidato',
				sexo='$obj->sexo',
				fecha='$obj->fecha'
				WHERE id='$id'");
		}catch(exception $e){
			echo $e->getMessage();
		}
		return $consulta->execute();
	}
}

?>
