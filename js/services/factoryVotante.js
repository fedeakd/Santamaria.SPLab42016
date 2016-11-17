angular
  .module('AngularABM')
 .factory("FactoryVotante", function($http,ServicioVotante){
 	votante={};
 	votante.id=-1;
 	votante.nombre="";
 	votante.candidato="";
 	votante.sexo="";
 	votante.fecha="";
 	votante.modificar=false;

 	votante.TraerTodos= TraerTodos;
 	votante.Borrar= Borrar;
 	votante.Modificar=Modificar;
 	votante.Alta= Alta;
 	
 	return votante;

 	function TraerTodos(){
 		return ServicioVotante.TraerTodos();
 	}
 	function Borrar(id){
 		return ServicioVotante.Borrar(id);
 	}
 	function Modificar(){
 		return ServicioVotante.Modificar(votante);
 	}

 	function Alta(){
 		return ServicioVotante.Alta(votante);
 	}
 })