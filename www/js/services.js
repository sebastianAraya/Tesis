angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'a' && pw == 'a') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('User', function(DB) {
    var self = this;
    
    self.all = function() {
        return DB.query('SELECT * FROM usuario')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.newUser = function(usuario,contraseña){
        return DB.query('INSERT INTO usuario (usuario,contraseña) VALUES (?,?) ',[usuario],[contraseña])
        .then(function(result){
            return DB.fetch(result);
        })    
    };
    self.getById = function(id) {
        return DB.query('SELECT * FROM usuario WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    self.getByNombrePassword = function(nombre,contraseña) {
        return DB.query('SELECT * FROM usuario WHERE nombre = ? AND contraseña = ?', [nombre],[contraseña])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    return self;
})

.factory('ejercicios', function($cordovaSQLite,RutinaPorDefecto) {

  var f = new Date();
 /* var listaEjercicios = [{
      idResultadoEjercicio: 1,
      direccion: "app.cuestionario",
      nombre:"Cuestionario",
      estado: 0,
      tipo: 1,
      datos: [],
      fecha: f,
    },{
      idResultadoEjercicio: 2,
      direccion:"app.ejercicioTemblor",
      nombre:"Centrar Pelota 1",
      estado:0,
      tipo:2,
      instrucciones:"(intrucciones 1)Mantenga la pelota en el centro de la patalla la mayor cantidad de tiempo posible",
      parametros: 
      {
        sensibilidad:1,
        tiempo:30,
        tolerancia:30
      },      
      datos: {
        tolerancia:5,
        ejeX:[],
        ejeY:[],
        ejeZ:[],
        distancia:[],
      },
      fecha: f,
    }];
   */ var listaEjercicios = [];

  console.log( "lista ejercicio = " +listaEjercicios.length);
  return {
    all: function() {

console.log(JSON.stringify($usuario));
console.log("busca rutina")
var f = new Date();
var g = f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate();
var query = "SELECT * FROM rutina WHERE fecha='"+g+"'";


      
      return listaEjercicios;
    },
    terminarEjercicio: function(num,estado){
      listaEjercicios[num].estado=estado;
      return true;
    },
    buscar: function(tipoEjercicio,fechaInicio,fechaTermino){
      return listaEjercicios;
    },
    buscaId: function(resultadoSecion,resultadoEjercicio){
      return listaEjercicios[1];
    }
  }
})

.factory('RutinaPorDefecto',function($cordovaSQLite){
    var f = new Date();
    
    return {
      generarRutina: function($state){

        for (var i = 0; i < listaEjerciciosDefault.length; i++) {
            var f = new Date();
            var tipo_ejercicio = listaEjerciciosDefault[i].tipo;
            var fecha = f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate();
            var estado = listaEjerciciosDefault[i].estado;
            var instrucciones = new Object();
            instrucciones.instrucciones = listaEjerciciosDefault[i].instrucciones;
            instrucciones.direccion = listaEjerciciosDefault[i].direccion;
            instrucciones.nombre=listaEjerciciosDefault[i].nombre;
            instrucciones.parametros = listaEjerciciosDefault[i].parametros;
            var resultados = JSON.stringify(listaEjerciciosDefault[i].datos);

            var query = "INSERT INTO rutina (id_usuario,estado,tipo_ejercicio,fecha,instrucciones,resultados) VALUES (?,?,?,?,?,?)" ;
            $cordovaSQLite.execute(db, query, [$usuario.id_usuario,estado,tipo_ejercicio,fecha,JSON.stringify(instrucciones),resultados]).then(function(res) {
                console.log("Se ha creado una rutina");
            }, function (err) {
                console.error("Error con Base de datos crear rutina: "+JSON.stringify(err));
            });

        }
        $state.go('app.playlists' )
        ;
        console.log("Se ha creado toda la rutina");

      }
    }
})
/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});