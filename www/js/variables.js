
$INCOMPLETED = 0;
$COMPLETED = 1;
$ERROR = -1;

$CUESTIONARIO = 1;
$EJERCICIO_TEMBLOR = 2;

$VERDADEROFALSO = 1;
$ABIERTA = 2;
$ALTERNATIVA = 3;

$listaEjercicios=[];
$listaEjerciciosDefault = [{
      idResultadoEjercicio: 1,
      id_seccion:0,
      direccion: "app.cuestionario",
      nombre:"Cuestionario",
      estado: 0,
      tipo:1,
      instrucciones:"",
      parametros:{},
      datos: {respuesta:[]}
    },{
      idResultadoEjercicio: 2,
      id_seccion:0,
      direccion:"app.ejercicioCadenciaInstrucciones",
      nombre:"rigidez",
      estado:0,
      tipo:4,
      instrucciones:"instrucciones rigidez",
      parametros: 
      {
        sensibilidad:1,
        tiempo:10,
        tolerancia:30
      },      
      datos: {
        tolerancia:5,
        ejeX:[],
        ejeY:[],
        ejeZ:[],
        distancia:[],
      }
    },{
      idResultadoEjercicio: 2,
      id_seccion:0,
      direccion:"app.ejercicioCadenciaInstrucciones",
      nombre:"rigidez",
      estado:0,
      tipo:4,
      instrucciones:"instrucciones rigidez",
      parametros: 
      {
        sensibilidad:1,
        tiempo:10,
        tolerancia:30
      },      
      datos: {
        tolerancia:5,
        ejeX:[],
        ejeY:[],
        ejeZ:[],
        distancia:[],
      }
    },{
      idResultadoEjercicio: 2,
      id_seccion:0,
      direccion:"app.ejercicioCadenciaInstrucciones",
      nombre:"rigidez",
      estado:0,
      tipo:4,
      instrucciones:"instrucciones rigidez",
      parametros: 
      {
        sensibilidad:1,
        tiempo:10,
        tolerancia:30
      },      
      datos: {
        tolerancia:5,
        ejeX:[],
        ejeY:[],
        ejeZ:[],
        distancia:[],
      }
    },{
      idResultadoEjercicio: 2,
      id_seccion:0,
      direccion:"app.ejercicioRigidezInstrucciones",
      nombre:"rigidez",
      estado:0,
      tipo:3,
      instrucciones:"instrucciones rigidez",
      parametros: 
      {
        sensibilidad:1,
        tiempo:10,
        tolerancia:30
      },      
      datos: {
        tolerancia:5,
        ejeX:[],
        ejeY:[],
        ejeZ:[],
        distancia:[],
      }
    },{
      idResultadoEjercicio: 2,
      id_seccion:0,
      direccion:"app.ejercicioRigidezInstrucciones",
      nombre:"rigidez",
      estado:0,
      tipo:3,
      instrucciones:"instrucciones rigidez",
      parametros: 
      {
        sensibilidad:1,
        tiempo:10,
        tolerancia:30
      },      
      datos: {
        tolerancia:5,
        ejeX:[],
        ejeY:[],
        ejeZ:[],
        distancia:[],
      }
    },{
      idResultadoEjercicio: 2,
      id_seccion:0,
      direccion:"app.ejercicioRigidezInstrucciones",
      nombre:"rigidez",
      estado:0,
      tipo:3,
      instrucciones:"instrucciones rigidez",
      parametros: 
      {
        sensibilidad:1,
        tiempo:10,
        tolerancia:30
      },      
      datos: {
        tolerancia:5,
        ejeX:[],
        ejeY:[],
        ejeZ:[],
        distancia:[],
      }
    },{
      idResultadoEjercicio: 2,
      id_seccion:0,
      direccion:"app.ejercicioRigidezInstrucciones",
      nombre:"Centrar Pelota defecto 2",
      estado:0,
      tipo:3,
      instrucciones:"(instrucciones 1)Mantenga la pelota en el centro de la patalla la mayor cantidad de tiempo posible",
      parametros: 
      {
        sensibilidad:1,
        tiempo:13,
        tolerancia:30
      },      
      datos: {
        tolerancia:5,
        ejeX:[],
        ejeY:[],
        ejeZ:[],
        distancia:[],
      }
    }];

/*
$listaEjercicios = new Array();
  //ejercicio de preguntas
  ejercicio = new Object();
  ejercicio.estado= $INCOMPLETED;
  ejercicio.tipo = $CUESTIONARIO;
  ejercicio.direccion = "app.cuestionario";
  ejercicio.nombre = "Cuestionario";
//preguntas a realizar.
  ejercicio.pregunta= new Array();

  pregunta = new Object();
  pregunta.consulta = 'Tomo su medicina';
  pregunta.tipo = $VERDADEROFALSO;
  pregunta.respuesta= null;
  ejercicio.pregunta.push(pregunta);

  pregunta = new Object();
  pregunta.consulta = 'Como Se ha sentido';
  pregunta.tipo = $ABIERTA;
  pregunta.respuesta= null;
  ejercicio.pregunta.push(pregunta);

  $listaEjercicios.push(ejercicio);

//ejercicio de centrar pelota
  ejercicio = new Object();
  ejercicio.estado= $INCOMPLETED;
  ejercicio.tipo = $EJERCICIO_TEMBLOR;
  ejercicio.direccion = "app.ejercicioTemblor";
  ejercicio.nombre = "Centrar Pelota 1";
  ejercicio.instrucciones = "(intrucciones 1)Mantenga la pelota en el centro de la patalla la mayor cantidad de tiempo posible";

  ejercicio.parametros = new Object();
  ejercicio.parametros.sensibilidad = 1;
  ejercicio.parametros.tiempo = 30; 
  ejercicio.parametros.tolerancia = 30;

  ejercicio.datos = new Object();
  ejercicio.datos.toleranciaFallo = 5;
  ejercicio.datos.ejeX = new Array();
  ejercicio.datos.ejeY = new Array();
  ejercicio.datos.ejeZ = new Array();
  ejercicio.datos.distancia = new Array();
  ejercicio.fecha = "Datos de fecha";
  $listaEjercicios.push(ejercicio);

//ejercicio de centrar pelota
  ejercicio = new Object();
  ejercicio.estado= $INCOMPLETED;
  ejercicio.tipo = $EJERCICIO_TEMBLOR;
  ejercicio.direccion = "app.ejercicioTemblor";
  ejercicio.nombre = "Centrar Pelota 2";
  ejercicio.instrucciones = "(intrucciones 2)Mantenga la pelota en el centro de la patalla la mayor cantidad de tiempo posible";

  ejercicio.parametros = new Object();
  ejercicio.parametros.sensibilidad = 1;
  ejercicio.parametros.tiempo = 5; 
  ejercicio.parametros.tolerancia = 30;

  ejercicio.datos = new Object();
  ejercicio.datos.toleranciaFallo = 5;
  ejercicio.datos.ejeX = new Array();
  ejercicio.datos.ejeY = new Array();
  ejercicio.datos.ejeZ = new Array();
  ejercicio.datos.distancia = new Array();
  ejercicio.fecha = "Datos de fecha";
  $listaEjercicios.push(ejercicio);
*/
//ejercicios de mover mano
/*  ejercicio = new Object();
  ejercicio.estado= $INCOMPLETED;
  ejercicio.tipo = 2; //ejercicio 2
  ejercicio.nombre = "numero 2";

  ejercicio.parametros = new Object();
  ejercicio.parametros.sensibilidad= 1;
  ejercicio.parametros.tiempo = 0; 

  ejercicio.datos = new Object();
  ejercicio.datos.toleranciaFallo = 5;
  ejercicio.fecha = "Datos de fecha";

  $listaEjercicios.push(ejercicio);
  */
