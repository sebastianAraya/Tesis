// The watch id references the current `watchHeading`
    tiempoEjercicio2=

    function prepEjercicio2(){
        tiempoEjercicio2=new Date();
        
    }

    function onCompass(event) {
        console.log('('+event.beta+','+event.gamma+','+event.alpha+')'+ event.timeStamp);
    }
