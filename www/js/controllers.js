angular.module('starter.controllers', ['ionic'])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $cordovaSQLite) {
    $scope.data = {};

    $scope.login = function() {
        var query = "SELECT * FROM usuario WHERE usuario='" + $scope.data.username + "' AND contraseña='" + $scope.data.password + "'";
        console.log(query);
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if (res.rows.length > 0) {
                $usuario = res.rows.item(0);
                $state.go('app.playlists');
            } else {
                $ionicPopup.alert({
                    title: 'Usuario o contraseña inválidos',
                    template: 'Verifica tus datos he intenta nuevamente'
                })
                console.log("Usuario o contraseña inválidos");
            }
        }, function(err) {
            $ionicPopup.alert({
                title: 'Base de datos',
                template: 'Error en la conexión'
            })
            console.error("Error con Base de datos");
        });
    }
    $scope.loginDemo = function() {
        var query = "SELECT * FROM usuario WHERE usuario='test' AND contraseña='test'";
        console.log(query);
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if (res.rows.length > 0) {
                $usuario = res.rows.item(0);
                $state.go('app.playlists');
            } else {
                $ionicPopup.alert({
                    title: 'Usuario o contraseña inválidos',
                    template: 'Verifica tus datos he intenta nuevamente'
                })
                console.log("Usuario o contraseña inválidos");
            }
        }, function(err) {
            $ionicPopup.alert({
                title: 'Base de datos',
                template: 'Error en la conexión'
            })
            console.error("Error con Base de datos");
        });
    }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
    $scope.porcentaje = 50;

    $scope.exit = function() {
        navigator.app.exitApp();
    }
    if (typeof($usuario) != "undefined" && $usuario != null) {} else {
        $state.go('login');
    }
})

.controller('PlaylistsCtrl', function($scope, $stateParams, $state, $ionicPopup, ejercicios, RutinaPorDefecto, $cordovaSQLite, $timeout) {

    var f = new Date();
    var g = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
    var query = "SELECT * FROM rutina WHERE fecha='" + g + "'";
    $cordovaSQLite.execute(db, query, []).then(function(res) {
        $listaEjercicios = [];
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
                var instrucciones = new Object();
                instrucciones = eval("(" + res.rows.item(i).instrucciones + ")");
                var ejercicio = new Object();
                ejercicio.idResultadoEjercicio = res.rows.item(i).id_rutina;
                ejercicio.direccion = instrucciones.direccion;
                ejercicio.instrucciones = instrucciones.instrucciones
                ejercicio.nombre = instrucciones.nombre;
                ejercicio.estado = res.rows.item(i).estado;
                ejercicio.tipo = res.rows.item(i).tipo_ejercicio;
                ejercicio.parametros = instrucciones.parametros;
                ejercicio.datos = eval("(" + res.rows.item(i).resultados + ")");
                ejercicio.fecha = res.rows.item(i).fecha;
                ejercicio.id_seccion = res.rows.item(i).id_seccion;
                $listaEjercicios.push(ejercicio);
                console.log('agregando a rutina: ' + ejercicio.nombre);
            };
            console.log("Lista ejercicio generada");
        } else {
            id_seccion = (new Date()).getTime();
            $listaEjercicios = $listaEjerciciosDefault;
            $varI = 0;
            for (var i = 0; i < $listaEjerciciosDefault.length; i++) {
                $listaEjercicios[i].id_seccion = id_seccion;
                var f = new Date();
                var tipo_ejercicio = $listaEjerciciosDefault[i].tipo;
                var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
                $listaEjercicios[i].fecha = fecha;
                var estado = $listaEjerciciosDefault[i].estado;
                var instrucciones = new Object();
                instrucciones.instrucciones = $listaEjerciciosDefault[i].instrucciones;
                instrucciones.direccion = $listaEjerciciosDefault[i].direccion;
                instrucciones.nombre = $listaEjerciciosDefault[i].nombre;
                instrucciones.parametros = $listaEjerciciosDefault[i].parametros;
                var resultados = JSON.stringify($listaEjerciciosDefault[i].datos);
                var query = "INSERT INTO rutina (id_seccion,id_usuario,estado,tipo_ejercicio,fecha,instrucciones,resultados) VALUES (?,?,?,?,?,?,?)";
                $cordovaSQLite.execute(db, query, [id_seccion, $usuario.id_usuario, estado, tipo_ejercicio, fecha, JSON.stringify(instrucciones), resultados]).then(function(res) {
                    console.log($varI + "Se ha creado una rutina id= " + res.insertId);
                    $listaEjercicios[$varI].idResultadoEjercicio = res.insertId;
                    $varI++;
                }, function(err) {
                    console.error("Error con Base de datos crear rutina: " + JSON.stringify(err));
                });
            };
        }
        $scope.listEjercicios = $listaEjercicios;
    }, function(err) {
        console.error("Error con Base de datos");
        $scope.listEjercicios = null;
    });

    $numEjercicio = 0;

    $scope.comenzar = function() {
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

.controller('cuestionario', function($scope, $stateParams, $state, $ionicPopup, ejercicios, $cordovaSQLite) {
    $scope.data = {
        respuesta1: ''
    };
    $scope.terminar = function() {
        if ($scope.data.respuesta1 === '') {
            $ionicPopup.alert({
                title: 'Complete todo el cuestionario',
            })
        } else {
            var datos = new Object();
            datos.respuesta = [$scope.data.respuesta1];
            var query = "UPDATE rutina SET resultados='" + JSON.stringify(datos) + "',estado=" + $COMPLETED + " WHERE id_rutina=" + $listaEjercicios[$numEjercicio].idResultadoEjercicio;
            $cordovaSQLite.execute(db, query, []).then(function(res) {
                console.log("Update resulatados");
            }, function(err) {
                console.error("Error con Base: " + JSON.stringify(err));
            });
            $listaEjercicios[$numEjercicio].estado = $COMPLETED;
            calculaRuta($state);
        }
    };
})

.controller('ejercicioTemblor', function($scope, $stateParams, $state, $cordovaSQLite) {

    console.log("Ejercicio " + $listaEjercicios[$numEjercicio].nombre);

    $scope.ejercicio = $listaEjercicios[$numEjercicio];
    $scope.continuar = function() {
        $state.go('app.ejercicioTemblorInstancia');
    }
})

.controller('ejercicioTemblorInstancia', function($scope, $stateParams, $state, ejercicios, $cordovaSQLite) {
    $scope.iniciar = function() {
        preparacion();
        cuentaAtras($scope, 5);
    }
    $scope.comenzar = function() {
        gelak($state);
        cronometro($scope, $listaEjercicios[$numEjercicio].parametros.tiempo);
        // cronometro($scope,2);
    }
    $scope.continuar = function() {
        stopgelak();
        //      console.log("antes de update " + JSON.stringify($listaEjercicios[$numEjercicio].tipo, null, 4));
        var query = "UPDATE rutina SET resultados='" + JSON.stringify($listaEjercicios[$numEjercicio].datos) + "',estado=" + $COMPLETED + " WHERE id_rutina=" + $listaEjercicios[$numEjercicio].idResultadoEjercicio;
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            console.log("Update resulatados");
        }, function(err) {
            console.error("Error con Base: " + JSON.stringify(err));
        });
        $listaEjercicios[$numEjercicio].estado = $COMPLETED;
        $state.go('app.resultado');
    }
})

.controller('Resultado', function($scope, $stateParams, $state, ejercicios, $ionicHistory, $cordovaSQLite) {
    ejercicio = new Object();
    var titleY = "";
    var esBusqueda = true;
    console.log("datos " + $stateParams.resultadoSecion + " - " + $stateParams.resultadoEjercicio);
    if ($stateParams.resultadoSecion == "" && $stateParams.resultadoEjercicio == "") {
        ejercicio = $listaEjercicios[$numEjercicio];
        esBusqueda = false;
        console.log('viene del ejercicio tipo ' + ejercicio.tipo + " (" + $listaEjercicios[$numEjercicio].tipo + " )");
    } else {
        console.log('viene de busqueda');
        ejercicio = $ejercicioMostrar;
    }

    if (ejercicio.tipo == 1) {
        titleY = "P<br>i<br>x<br>e<br>l<br>e<br>s";
    }
    if (ejercicio.tipo == 2) {
        titleY = "(º)<br>Á<br>n<br>g<br>u<br>l<br>o";
    }
    $scope.esBusqueda = function() {
        return esBusqueda;
    }

    $scope.iniciar = function() {
        (function mouse_zoom(container) {
            var options, graph, opcionVista;
            options = {
                selection: {
                    mode: 'x',
                    fps: 30
                },
                grid: {
                    verticalLines: false,
                    backgroundColor: {
                        colors: [
                            [0, '#fff'],
                            [1, '#ccc']
                        ],
                        start: 'top',
                        end: 'bottom'
                    }
                },
                xaxis: {
                    title: 'Tiempo (Seg)',
                    tickDecimals: 0
                },
                yaxis: {
                    title: titleY,
                    tickDecimals: 0
                }
            };

            function drawGraph(opts) {
                var o = Flotr._.extend(Flotr._.clone(options), opts || {});
                if (ejercicio.tipo == 2) {
                    var d1 = [];
                    console.log(ejercicio.tipo);
                    d1.push([0, (ejercicio.parametros.tolerancia / 2)]);
                    d1.push([ejercicio.datos.distancia[ejercicio.datos.distancia.length - 1][0], (ejercicio.parametros.tolerancia / 2)]);
                    return Flotr.draw(container, [{
                        data: ejercicio.datos.distancia,
                        points: {
                            show: true
                        }
                    }, {
                        data: d1,
                        lines: {
                            fill: true
                        }
                    }], o);
                } else {
                    return Flotr.draw(container, [{
                        data: ejercicio.datos.ejeX,
                    }], o);
                }
                // return Flotr.draw(container,[{ data : d1, label : 'O' }, d2,d3], o );
            }

            graph = drawGraph();


            Flotr.EventAdapter.observe(container, 'flotr:select', function(area) {
                graph = drawGraph({
                    xaxis: {
                        min: area.x1,
                        max: area.x2,
                        title: 'Tiempo (Seg)',
                        tickDecimals: 0
                    },
                    yaxis: {
                        min: area.y1,
                        max: area.y2,
                        title: titleY,
                        tickDecimals: 0
                    } //$listaEjercicios[$numEjercicio].parametros.maximaDistancia
                });
            });

            Flotr.EventAdapter.observe(container, 'flotr:click', function() {
                drawGraph();
            });
        })(document.getElementById('editor-render-0'));

    }
    $scope.continuar = function() {
        if (esBusqueda) {
            $ionicHistory.goBack();
        } else {
            calculaRuta($state);
        }
    }
})

.controller('noEjercicios', function($scope, $stateParams, $state) {
    $scope.continuar = function() {
        $state.go('app.playlists');
    }
})

.controller('buscarResultados', function($scope, $stateParams, $state) {
    var fechaHOY = new Date();
    $scope.data = {
        tipoEjercicio: '',
        fechaInicio: fechaHOY,
        fechaTermino: fechaHOY
    }
    $scope.continuar = function() {
        $state.go('app.listaResultados', {
            tipoEjercicio: $scope.data.tipoEjercicio,
            fechaInicio: $scope.data.fechaInicio,
            fechaTermino: $scope.data.fechaTermino
        })
    }
})

.controller('listaResultados', function($scope, $stateParams, $state, ejercicios, $cordovaSQLite) {
    $scope.fechaToString = function toString(fecha) {
        return fechaInicio.getDate() + "/" + (fechaInicio.getMonth() + 1) + "/" + fechaInicio.getFullYear();
    }
    var fechaInicio = new Date($stateParams.fechaInicio);
    var fechaTermino = new Date($stateParams.fechaTermino);
    var tipoEjercicio = $stateParams.tipoEjercicio;
    //(new Date()).getTime()
    var g1 = fechaInicio.getFullYear() + "-" + (fechaInicio.getMonth() + 1) + "-" + fechaInicio.getDate();
    var g2 = fechaTermino.getFullYear() + "-" + (fechaTermino.getMonth() + 1) + "-" + fechaTermino.getDate();

    console.log("tipo ejercicio " + tipoEjercicio);
    if (tipoEjercicio == '')
        var query = "SELECT * FROM rutina WHERE id_usuario=" + $usuario.id_usuario + " AND fecha>='" + g1 + "' AND fecha<='" + g2 + "' AND estado=1";
    else
        var query = "SELECT * FROM rutina WHERE id_usuario=" + $usuario.id_usuario + " AND fecha>='" + g1 + "' AND fecha<='" + g2 + "' AND estado=1 AND tipo_ejercicio=" + tipoEjercicio;
    console.log(query);

    $cordovaSQLite.execute(db, query, []).then(function(res) {
        $scope.listaEjercicios = [];
        if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
                var instrucciones = new Object();
                instrucciones = eval("(" + res.rows.item(i).instrucciones + ")");
                var ejercicio = new Object();
                ejercicio.idResultadoEjercicio = res.rows.item(i).id_rutina;
                ejercicio.direccion = instrucciones.direccion;
                ejercicio.instrucciones = instrucciones.instrucciones
                ejercicio.nombre = instrucciones.nombre;
                ejercicio.estado = res.rows.item(i).estado;
                ejercicio.tipo = res.rows.item(i).tipo_ejercicio;
                ejercicio.parametros = instrucciones.parametros;
                ejercicio.datos = eval("(" + res.rows.item(i).resultados + ")");
                ejercicio.fecha = res.rows.item(i).fecha;
                ejercicio.id_seccion = res.rows.item(i).id_seccion;
                $scope.listaEjercicios.push(ejercicio);
            };
        }
    });

    $scope.ver = function(ejercicio) {
        $ejercicioMostrar = ejercicio;
        $state.go('app.resultado', {
            resultadoSecion: ejercicio.id_seccion,
            resultadoEjercicio: ejercicio.idResultadoEjercicio
        });
    }
    $scope.continuar = function() {
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

.controller('ejercicioRigidezInstrucciones', function($scope, $stateParams, $state) {

    console.log("Ejercicio " + $listaEjercicios[$numEjercicio].nombre);

    $scope.ejercicio = $listaEjercicios[$numEjercicio];
    $scope.continuar = function() {
        $state.go('app.ejercicioRigidez');
    }
})

.controller('ejercicioRigidez', function($scope, $stateParams, $state, $cordovaSQLite) {
    var listener = function(event) {
        actual = new Date();
        if ($banderaMarcar && event.beta < 30) {
            $movimientos++;
            console.log("mov:" + $movimientos);
            $banderaMarcar = false;
        } else {
            if (event.beta > 60) {
                $banderaMarcar = true;
            }
        }
        console.log(event.beta + "\t    " + ((actual - $tiempo) / 1000));
        $listaEjercicios[$numEjercicio].datos.ejeX.push([(actual - $tiempo) / 1000, event.beta]);
    }

    $scope.iniciar = function() {
        cuentaAtras($scope, 5);
    }

    $scope.comenzar = function() {
        cronometro($scope, $listaEjercicios[$numEjercicio].parametros.tiempo);
        $tiempo = new Date();
        $movimientos = 0;
        $banderaMarcar = true;
        window.addEventListener('deviceorientation', listener, false);

        // cronometro($scope,2);
    }
    $scope.continuar = function() {
        window.removeEventListener("deviceorientation", listener, false);
        console.log("antes de update " + JSON.stringify($listaEjercicios[$numEjercicio].tipo, null, 4));
        var query = "UPDATE rutina SET resultados='" + JSON.stringify($listaEjercicios[$numEjercicio].datos) + "',estado=" + $COMPLETED + " WHERE id_rutina=" + $listaEjercicios[$numEjercicio].idResultadoEjercicio;
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            console.log("Update resulatados");
        }, function(err) {
            console.error("Error con Base: " + JSON.stringify(err));
        });
        $listaEjercicios[$numEjercicio].estado = $COMPLETED;
        $state.go('app.resultado');
    }
})


.controller('ejercicioCadenciaInstrucciones', function($scope, $stateParams, $state) {

    console.log("Ejercicio " + $listaEjercicios[$numEjercicio].nombre);

    $scope.ejercicio = $listaEjercicios[$numEjercicio];
    $scope.continuar = function() {
        $state.go('app.ejercicioCadencia');
    }
})

.controller('ejercicioCadencia', function($scope, $stateParams, $state, $cordovaSQLite) {
    var listenerCadencia = function(event) {
        actual = new Date();
        if ($banderaMarcar && event.gamma > 10) {
            $pasos++;
            console.log("------------------------------pasos:" + $pasos + "tiempo:" + ((actual - $tiempo) / 1000));
            $banderaMarcar = false;
        } else {
            if (event.gamma < -10) {
                $banderaMarcar = true;
            }
        }
        $angulo = event.beta;
          console.log( (Math.round(event.gamma*100)/100 )  );
        $listaEjercicios[$numEjercicio].datos.ejeX.push([(actual - $tiempo) / 1000, event.gamma]);
    }
    $scope.iniciar = function() {
        $banderaMarcar = true;
        $tiempo = new Date();
        $pasos = 0;
        $banderaMarcar = false;

        window.addEventListener("deviceorientation", listenerCadencia, false);
        //https://www.youtube.com/watch?v=C7JQ7Rpwn2k
        //  cuentaAtras($scope, 5);
    }


    $scope.comenzar = function() {
        cronometro($scope, $listaEjercicios[$numEjercicio].parametros.tiempo);
    }
    $scope.continuar = function() {
        window.removeEventListener("deviceorientation", listenerCadencia, false);
        console.log("antes de update " + JSON.stringify($listaEjercicios[$numEjercicio].tipo, null, 4));
        var query = "UPDATE rutina SET resultados='" + JSON.stringify($listaEjercicios[$numEjercicio].datos) + "',estado=" + $COMPLETED + " WHERE id_rutina=" + $listaEjercicios[$numEjercicio].idResultadoEjercicio;
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            console.log("Update resulatados");
        }, function(err) {
            console.error("Error con Base: " + JSON.stringify(err));
        });
        $listaEjercicios[$numEjercicio].estado = $COMPLETED;
        $state.go('app.resultado');
    }
});

calculaRuta = function($state) {
    /* $numEjercicio = 1;
     $state.go('app.resultado');
    return;*/
    for ($numEjercicio; $numEjercicio < $listaEjercicios.length; $numEjercicio++) {
        if ($listaEjercicios[$numEjercicio].estado == $INCOMPLETED) {
            $state.go($listaEjercicios[$numEjercicio].direccion);
            return;
        }
    }
    $state.go('app.noEjercicios');
}
