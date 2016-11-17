<?php
require_once"accesoDatos.php";
class Alumno
{
	private $id;
	private $nombre;
 	private $apellido;
  	private $legajo;
  	private $foto;
  	 public function GetId()
	{
		return $this->id;
	}
	public function GetApellido()
	{
		return $this->apellido;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetLegajo()
	{
		return $this->legajo;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetApellido($valor)
	{
		$this->apellido = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetLegajo($valor)
	{
		$this->legajo = $valor;
	}
		public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
		public function GetFoto()
	{
		return $this->foto;
	}
	public function __construct($legajo=NULL)
	{
		if($legajo != NULL){
			$obj = Persona::TraerUnaPersona($legajo);
			
			$this->apellido = $obj->apellido;
			$this->nombre = $obj->nombre;
			$this->legajo = $legajo;
			$this->foto = $obj->foto;
		}
	}

	public static function TraerTodasLoAlumnos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from Alumno");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "alumno");	
		return $arrPersonas;
	}
	
		public static function Insertar($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
				$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into alumno (nombre,apellido,legajo,foto)values(:nombre,:apellido,:legajo,:foto)");
				$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
				$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
				$consulta->bindValue(':legajo', $persona->legajo, PDO::PARAM_STR);
				$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
				$consulta->execute();		
				return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	


		public static function TraerUnaPersona($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from alumno where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('Alumno');
		return $personaBuscada;	
					
	}

		public static function Modificar($persona)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update alumno 
				set nombre=:nombre,
				apellido=:apellido
		
				WHERE id=:id");
			$consulta->bindValue(':id',$persona->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
			//$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}
	public static function Borrar($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from Alumno	WHERE id=:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}

//----
//----
 }