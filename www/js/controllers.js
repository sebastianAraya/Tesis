angular.module('starter.controllers',['ionic'])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $usuario = 1;
            $state.go('app.playlists');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Datos invalidos',
                template: 'Usuario o contraseña invalidos'
            });
        });
    }
    $scope.loginDemo = function() {
            $usuario = 1;
            $state.go('app.playlists');
    }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {
   if( typeof($usuario)!= "undefined" && $usuario==1){
    }
    else{
 //     $state.go('login');      
    }
    $scope.porcentaje=50;
    $scope.exit=function(){
      navigator.app.exitApp();
    }
})

.controller('PlaylistsCtrl', function($scope, $stateParams,$state,$ionicPopup,ejercicios) {
  $listaEjercicios = ejercicios.all();
  $scope.listaEjercicios = $listaEjercicios;
  console.log("estado 1: "+$listaEjercicios[0].estado);
  console.log("estado 1: "+$listaEjercicios[1].estado);
  $numEjercicio = 0;

  $scope.comenzar = function(){
    calculaRuta($state);
  }
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
})

.controller('cuestionario', function($scope, $stateParams,$state,$ionicPopup,ejercicios) {
  $scope.data = {respuesta1: ''};
  $scope.terminar = function() {
    if($scope.data.respuesta1 === ''){
      $ionicPopup.alert({
         title: 'Complete todo el cuestionario',
       })
    }
    else{
      ejercicios.terminarEjercicio($numEjercicio,$COMPLETED);
      calculaRuta($state);
    }
  };
})

.controller('ejercicioTemblor', function($scope, $stateParams,$state) {
  $scope.ejercicio = $listaEjercicios[$numEjercicio];

  $scope.continuar = function(){
    $state.go('app.ejercicioTemblorInstancia');
  }
})

.controller('ejercicioTemblorInstancia', function($scope, $stateParams,$state,ejercicios) {
   $scope.iniciar = function(){
     preparacion();
     cuentaAtras($scope,5);     
   }
   $scope.comenzar = function(){
   //   gelak($state);
     // cronometro($scope,$listaEjercicios[$numEjercicio].parametros.tiempo);
   cronometro($scope,2);
   }
   $scope.continuar = function(){
   //  stopgelak();     
      ejercicios.terminarEjercicio($numEjercicio,$COMPLETED);
     $state.go('app.resultado');
   }
})

.controller('Resultado', function($scope, $stateParams,$state,ejercicios, $ionicHistory) {
  var ejercicio = null;

  var esBusqueda =  true;
  if( $stateParams.resultadoSecion=="" && $stateParams.resultadoEjercicio==""){
 //   console.log("Mostrando resultado " +$stateParams.resultadoEjercicio+" - " +$stateParams.resultadoSecion);
    ejercicio = $listaEjercicios[$numEjercicio];
    esBusqueda =  false;
    console.log('viene del ejercicio');
  }
  else{
    console.log('viene de busqueda');
    ejercicio = ejercicios.buscaId($stateParams.resultadoSecion,$stateParams.resultadoEjercicio);
  }

  $scope.esBusqueda = function(){
    return esBusqueda;
  }

  $scope.iniciar = function(){
      (function mouse_zoom(container) {
      var options, graph;
        options = { selection : { mode : 'x', fps : 30 },
      };
        var d1 = [];

        d1.push([0, (ejercicio.parametros.tolerancia / 2 ) ]);
        d1.push([ejercicio.parametros.tiempo, (ejercicio.parametros.tolerancia / 2) ]);

      function drawGraph (opts) {
        var o = Flotr._.extend(Flotr._.clone(options), opts || {});
               return Flotr.draw(container,[ 
                { data : ejercicio.datos.distancia},
                { data : d1, lines : {fill : true}} ], o );
       // return Flotr.draw(container,[{ data : d1, label : 'O' }, d2,d3], o );
      }

      graph = drawGraph();          
      Flotr.EventAdapter.observe(container, 'flotr:select', function (area) {
        graph = drawGraph({
          xaxis: {min:area.x1, max:area.x2,title:"Tiempo(Seg)" },
          yaxis: {min:area.y1, max:area.y2} //$listaEjercicios[$numEjercicio].parametros.maximaDistancia
        });
      });
        
      Flotr.EventAdapter.observe(container, 'flotr:click', function () { drawGraph(); });
    })(document.getElementById("editor-render-0"));

  }
  $scope.continuar = function(){
      if(esBusqueda){
         $ionicHistory.goBack();
      }
      else{
        calculaRuta($state);
      }
  }
})

.controller('noEjercicios', function($scope, $stateParams,$state) {
   $scope.continuar = function(){
      $state.go('app.playlists');
  }
})

.controller('buscarResultados', function($scope, $stateParams,$state) {
  var fechaHOY = new Date();
  $scope.data = {tipoEjercicio:'',fechaInicio: fechaHOY, fechaTermino: fechaHOY};
  $scope.continuar = function(){
      $state.go('app.listaResultados', {tipoEjercicio: $scope.data.tipoEjercicio ,fechaInicio: $scope.data.fechaInicio,fechaTermino: $scope.data.fechaTermino} );
  }
})
.controller('listaResultados', function($scope, $stateParams,$state,ejercicios) {
  $scope.fechaToString = function toString(fecha){
    return fechaInicio.getDate() + "/" + (fechaInicio.getMonth() +1) + "/" + fechaInicio.getFullYear();
  }
  var fechaInicio = new Date($stateParams.fechaInicio);
  var fechaTermino = new Date($stateParams.fechaTermino);
  var tipoEjercicio = $stateParams.tipoEjercicio;

  $scope.listaEjercicios = ejercicios.buscar(tipoEjercicio,fechaInicio,fechaTermino);

  $scope.ver=function(ejercicio){
      $state.go('app.resultado',{resultadoSecion:ejercicio.idResultadoSecion , resultadoEjercicio:ejercicio.idResultadoEjercicio});
  }
  $scope.continuar = function(){
      $state.go('app.playlists');
  };
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
})
;
calculaRuta= function($state){
 /* $numEjercicio = 1;
  $state.go('app.resultado');
 return;*/
  for($numEjercicio;$numEjercicio<$listaEjercicios.length;$numEjercicio++){
    if($listaEjercicios[$numEjercicio].estado ==$INCOMPLETED){

      console.log("se usa calcula ruta y numEjercicio =" + $numEjercicio);
      $state.go($listaEjercicios[$numEjercicio].direccion);
      return;
    }
  }
  $state.go('app.noEjercicios');
}
