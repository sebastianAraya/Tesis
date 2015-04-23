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

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {
   if( typeof($usuario)!= "undefined" && $usuario==1){
    }
    else{
      $state.go('login');      
    }
})

.controller('PlaylistsCtrl', function($scope, $stateParams,$state,$ionicPopup) {
  $scope.listaEjercicios = $listaEjercicios;
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

.controller('cuestionario', function($scope, $stateParams,$state,$ionicPopup) {
  $scope.data = {respuesta1: ''};
  $scope.terminar = function() {
    if($scope.data.respuesta1 === ''){
      $ionicPopup.alert({
         title: 'Complete todo el cuestionario',
       })
    }
    else{
      $listaEjercicios[0].estado=$COMPLETED;
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

.controller('ejercicioTemblorInstancia', function($scope, $stateParams,$state) {
   $scope.iniciar = function(){
     preparacion();
     cuentaAtras($scope,6);     
   }
   $scope.comenzar = function(){
      gelak($state);
      cronometro($scope,$listaEjercicios[$numEjercicio].parametros.tiempo);
   }
   $scope.continuar = function(){
     stopgelak();
     $listaEjercicios[$numEjercicio].estado=$COMPLETED;
     $state.go('app.resultado');
   }
})

.controller('Resultado', function($scope, $stateParams,$state) {
  if($numEjercicio==-1)$state.go('app.playlists');

  $scope.iniciar = function(){
      (function mouse_zoom(container) {
      var options, graph;
         
      options = {
        selection : { mode : 'x', fps : 30 },
      };
        var d1 = [];

        d1.push([0, ($listaEjercicios[$numEjercicio].parametros.tolerancia / 2 ) ]);
        d1.push([$listaEjercicios[$numEjercicio].parametros.tiempo, ($listaEjercicios[$numEjercicio].parametros.tolerancia / 2) ]);

      function drawGraph (opts) {
        var o = Flotr._.extend(Flotr._.clone(options), opts || {});
               return Flotr.draw(container,[ 
                { data : $listaEjercicios[$numEjercicio].datos.distancia},
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
      calculaRuta($state);
  }
})

.controller('noEjercicios', function($scope, $stateParams,$state) {
});

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
