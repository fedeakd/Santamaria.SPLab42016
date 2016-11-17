<?php

class Persona{
	public $id;
	public $nombre;
	public $mail;
	public $usuario;
	public $clave;
	public $imagen;
	public $apellido;
	public $ciudad;
	public $estado;
	public $imagenCantidad;

	public function toString(){
		return "$this->nombre-$this-apellido-$this->ciudad-$this->usuario-$this-clave";

	}
	public function InsertarPersona()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios (nombre,mail ,usuario,clave,estado,imagen,imagenCantidad)
			values('$this->nombre',
				'$this->mail',
				'$this->usuario',
				'$this->clave',
				'$this->estado',
				'$this->imagen',
				'$this->imagenCantidad')");
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
	public static function TraerTodosLosUsuarios(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Persona"); 
	}
	public static function BorrarUsuario($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			delete 
			from Usuarios        
			WHERE id=:id"); 
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);    
		$consulta->execute();
		return $consulta->rowCount();
	}

	public static function TraerUnUsuario($mail,$clave){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios where mail='$mail' && clave='$clave'");
		$consulta->execute();
		$per= $consulta->fetchObject('Persona');
		return $per;       

	}
	public static function ModificarUsuario($obj,$id,$cambioImagen){
		try{
			$cadena="";
			if($cambioImagen){
				$cadena="UPDATE usuarios
				SET nombre='$obj->nombre',
				usuario='$obj->usuario',
				mail='$obj->mail',
				clave='$obj->clave',
				imagenCantidad='$obj->imagenCantidad'
				WHERE id='$id'";
				
			}
			else{
				$cadena="UPDATE usuarios
				SET nombre='$obj->nombre',
				usuario='$obj->usuario',
				mail='$obj->mail',
				clave='$obj->clave'
				WHERE id='$id';
				";
			}	

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta($cadena);
		}catch(exception $e){
			echo $e->getMessage();
		}
		return $consulta->execute();
	}
	public static function VerificarMail($mail){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();  
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios where mail='$mail'");
		$consulta->execute();
		return $consulta->rowCount();            

	}
}

?>
