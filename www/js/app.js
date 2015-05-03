// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
 .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      cache: false,
      url: "/rutinaEjercicios",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.ejercicioTemblorInstancia', {
    url: "/ejercicioTemblorInstancia",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/ejercicio/ejercicioTemblorInstancia.html",
        controller: 'ejercicioTemblorInstancia'
      }
    }
  })

  .state('app.resultado', {
    cache: false,
    url: "/resultado/:resultadoSecion/:resultadoEjercicio",
    views: {
      'menuContent': {
        templateUrl: "templates/resultado.html",
        controller: 'Resultado'
      }
    }
  })

  .state('app.cuestionario', {
    url: "/cuestionario",
    views: {
      'menuContent': {
        templateUrl: "templates/cuestionario.html",
        controller: 'cuestionario'
      }
    }
  })

  .state('app.ejercicioTemblor', {
    url: "/ejercicioTemblor",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/ejercicio/ejercicioTemblor.html",
        controller: 'ejercicioTemblor'
      }
    }
  })
  .state('app.noEjercicios', {
    url: "/noEjercicios",
    views: {
      'menuContent': {
        templateUrl: "templates/ejercicio/noEjercicios.html",
        controller: 'noEjercicios'
      }
    }
  })
  .state('app.buscarResultados', {
    url: "/buscarResultados",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/ejercicio/buscarResultados.html",
        controller: 'buscarResultados'
      }
    }
  })
  .state('app.listaResultados', {
    url: "/listaResultados/:tipoEjercicio/:fechaInicio/:fechaTermino",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/ejercicio/listaResultados.html",
        controller: 'listaResultados'
      }
    }
  })
  ;
  $urlRouterProvider.otherwise('/login');
  //$urlRouterProvider.otherwise('/app/rutinaEjercicios');

})
