<?php 
$DatosPorPost = file_get_contents("php://input");
$respuesta = json_decode($DatosPorPost);
include_once ("clases/AccesoDatos.php");
include_once ("clases/Personas.php");
include_once ("clases/Votante.php");
include_once ("clases/Producto.php");
switch ($respuesta->datos->accion) {
	case 'insertar':
		$obj=$respuesta->datos->persona;
		$per = new Persona(); 
		$per->nombre=$obj->nombre;
		$per->usuario=$obj->usuario;
		$per->clave=$obj->clave;
		$per->mail=$obj->mail;
		$per->estado="normal";
		if(Persona::VerificarMail($per->mail)){
			echo "yaSeEncuentra";
			break;
		}
		$per->imagen=date("Ymd_His");
		$per->imagenCantidad=count($obj->imagenes);
		for ($i=0; $i < count($obj->imagenes); $i++) { 
			$rutaVieja="../fotos/".$obj->imagenes[$i];
			$rutaNueva=$per->imagen.($i+1).".png";
			copy($rutaVieja, "../fotos/".$rutaNueva);
			unlink($rutaVieja);

			
		}
		$per->InsertarPersona();
		echo "ok" ;
			# code...
	break;
	case 'Verificar':
		$obj=$respuesta->datos->persona;
		$persona=Persona::TraerUnUsuario($obj->mail,$obj->clave);
		echo json_encode(Persona::TraerUnUsuario($obj->mail,$obj->clave));
		# code...
	break;
	case 'InsertarVotante':
		$obj=$respuesta->datos->votante;
		$date = new DateTime($obj->fecha);
		$obj->fecha= date_format($date, 'Y-m-d');
		$votante=new Votante();
		Votante::InsertarVoto($obj);
		echo "okAlta";
		# code...
		break;
	case 'ModificarPersona':
		$p=$respuesta->datos->persona;
		$per = new Persona(); 
		$per->nombre=$p->nombre;
		$per->usuario=$p->usuario;
		$per->clave=$p->clave;
		$per->mail=$p->mail;
		$per->imagen=$p->imagen;
		if(count($p->imagenes)!=0){
			
			$ruta="../fotos/".$per->imagen;//ruta anterior

		    for ($i=0; $i < 3; $i++) { //Borro  la fotos viejas 
				if(file_exists ($ruta.($i+1).".png")){
					unlink($ruta.($i+1).".png");
				}
			}
			$per->imagenCantidad=count($p->imagenes);//Parte que va a la bd


			for ($i=0; $i < count($p->imagenes); $i++) { //Guardo la nueva fotos
				$rutaVieja="../fotos/".$p->imagenes[$i];
				$rutaNueva=$per->imagen.($i+1).".png";
				copy($rutaVieja, "../fotos/".$rutaNueva);
				unlink($rutaVieja);
			}
			Persona::ModificarUsuario($per,$respuesta->datos->id,TRUE );

		}
		else{
			Persona::ModificarUsuario($per,$respuesta->datos->id,FALSE );

			//$per->imagen=count($p->imagenes)>0? $p->usuario.$p->clave:"";//Parte que va a la bd
			//$per->imagenCantidad=count($p->imagenes);//Parte que va a la bd
		}
		
	
		echo "okModificar";
		# code...
		break;
	case 'BorrarUsuario':
			$ruta="../fotos/".$respuesta->datos->persona->imagen;//ruta anterior
	 		for ($i=0; $i < 3; $i++) { //Borro  la fotos viejas 
				if(file_exists ($ruta.($i+1).".png")){
					unlink($ruta.($i+1).".png");
				}
			}
		Persona::BorrarUsuario($respuesta->datos->persona->id);
		echo "ok";
		break;
	case  'TraerUsuarios':
		echo json_encode(Persona::TraerTodosLosUsuarios());
		# code...
		break;
	case 'ModificarVotante':
		$obj=$respuesta->datos->votante;
		$id=$respuesta->datos->id;

		$date = new DateTime($obj->fecha);
		$obj->fecha= date_format($date, 'Y-m-d');
		
		Votante::ModificarVotante($obj,$id);	
		echo 'okModificar';
		# code...
		break;
	case 'TraerVotantes':
		echo json_encode( Votante::TraerTodosLosVotante());
		# code...
		break;
	case 'BorrarVotante':


		 
		Votante::BorrarVotante($respuesta->datos->votante->id);
		echo "ok";
		# code...
		break;
	case 'prueba':
		var_dump( Producto::TraerTodosLosProductos());
		# code...
		break;
	default:
			# code...
	break;
}


?>