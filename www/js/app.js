var db = null;

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])
    .run(function($ionicPlatform, $cordovaSQLite) {
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
            window.plugins.sqlDB.copy("Moto-DB.db", function() {
                db = $cordovaSQLite.openDB("Moto-DB.db");
            }, function(error) {
                console.error("Ya se copio ");
                db = $cordovaSQLite.openDB("Moto-DB.db");
            });

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

    .state('app.ejercicioRigidezInstrucciones', {
        url: "ejercicio2/ejercicioRigidezInstrucciones/",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/ejercicio2/ejercicioRigidezInstrucciones.html",
                controller: 'ejercicioRigidezInstrucciones'
            }
        }
    })

    .state('app.ejercicioRigidez', {
        url: "ejercicio2/ejercicioRigidez/",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/ejercicio2/ejercicioRigidez.html",
                controller: 'ejercicioRigidez'
            }
        }
    })

    .state('app.ejercicioCadenciaInstrucciones', {
        url: "ejercicio2/ejercicioCadenciaInstrucciones/",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/ejercicio2/ejercicioCadenciaInstrucciones.html",
                controller: 'ejercicioCadenciaInstrucciones'
            }
        }
    })

    .state('app.ejercicioCadencia', {
        url: "ejercicio2/ejercicioCadencia/",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/ejercicio2/ejercicioCadencia.html",
                controller: 'ejercicioCadencia'
            }
        }
    });
    $urlRouterProvider.otherwise('/login');
    //$urlRouterProvider.otherwise('/app/rutinaEjercicios');

})
