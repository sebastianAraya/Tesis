// The watch id references the current `watchAcceleration`

    var goya = null;
    var posicion = new Object();
    posicion.x= 50;
    posicion.y= 50;
    sensivilidad = 1.3;
    aceleracionGravedad=0;
    var valorCirculoExterior = 0.3;
    $horaInicio= new Date();
    $iterador=0;

    function preparacion(){
        $iterador=0;
        var circuloExterior = document.getElementById('circuloExterior');
        ancho = window.innerWidth;
        largo = window.innerHeight;
        circuloRadio =ancho*valorCirculoExterior;
        $listaEjercicios[$numEjercicio].parametros.tolerancia = circuloRadio;
        $listaEjercicios[$numEjercicio].parametros.maximaDistancia = Math.pow(Math.pow((ancho/2),2) + Math.pow( (largo/2) ,2),0.5 );
        ;
        circuloExterior.style.width = circuloRadio+"px";
        circuloExterior.style.height = circuloRadio+"px";
        circuloExterior.style.margin= (-circuloRadio/2)+"px " + (-circuloRadio/2)+"px 0";
        $horaInicio= new Date();
    }

    function gelak($state) {
        $iterador=0;
        state = $state;
        var options = { frequency: 50 };
        goya = navigator.accelerometer.watchAcceleration(onAcc, offAcc, options);
    }

    function stopgelak() {
        if (goya) {
            navigator.accelerometer.clearWatch(goya);
            goya = null;
        }
    }


    function onAcc(acceleration) {
    //    var element = document.getElementById('getAccelerate');
        var circulo = document.getElementById('circulo');
        var feedback = document.getElementById('feedback');

        posicion = calculaPosicion(acceleration.x,acceleration.y,acceleration.y);
        circulo.style.left= posicion.x+"%"; 
        circulo.style.top= posicion.y+"%";

        //margen del centro
        //distancia del circulo al centro
        dis = Math.pow(Math.pow( (ancho*posicion.x/100) - (ancho/2),2  ) + Math.pow( (largo*posicion.y/100) - (largo/2) ,2),0.5 );


        if(dis < circuloRadio/2){
            feedback.style.opacity = 0.5;
     //       $parametros.datos.esValido.push(1);
        }
        else{
            feedback.style.opacity = 0;
   //         $parametros.datos.esValido.push(0);
        }

      //  var timestamp = Math.floor( ( (new Date()).getTime() - horaInicio.getTime() )/100)
        $listaEjercicios[$numEjercicio].datos.distancia.push([$iterador/10, dis]);
        $iterador += 0.5;
/*
        $parametros.datos.accelerationX.push(acceleration.x);
        $parametros.datos.accelerationY.push(acceleration.y);
        $parametros.datos.accelerationZ.push(acceleration.z);
        $parametros.datos.posicionX.push(posicion.x);
        $parametros.datos.posicionY.push(posicion.y);
        $parametros.datos.distancia.push(dis);
        $parametros.datos.circuloRadio.push(circuloRadio);

        console.log( 'Acceleration X: ' + acceleration.x         + ' --- ' +
                            
                            'posicion x: '     + posicion.x             + '<br />' +
                            'posicion y: '     + posicion.y             + '<br />' +
                            'distancia: '      + dis                    + '<br />' +
                            'radio: '          + circuloRadio           + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />' );
  */
    }

    function calculaPosicion(x,y,z){
        var posicionActual = new Object();

        posicion.x -= x*sensivilidad;
        posicion.y += y*sensivilidad 

        //agregamos un poco de aceleracion a la poiscion actual
        if(posicion.x>50)posicion.x -=aceleracionGravedad*sensivilidad; 
        if(posicion.x<50)posicion.x +=aceleracionGravedad*sensivilidad;

        if(posicion.y>50)posicion.y +=aceleracionGravedad*sensivilidad; 
        if(posicion.y<50)posicion.y -=aceleracionGravedad*sensivilidad;

        if(posicion.x<0)posicion.x=0;
        if(posicion.x>100)posicion.x=100;
        if(posicion.y<8)posicion.y=8;
        if(posicion.y>100)posicion.y=100;


        return posicion;
    }
    // onError: Failed to get the acceleration
    //
    function offAcc() {
    }