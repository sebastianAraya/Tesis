
function cuentaAtras($scope,tiempo){
	var segundos = tiempo;
	function contar(){
		if(segundos <= 0){
			document.getElementById("cuentaRegresiva").innerHTML = "";
			clearInterval(runCuentaAtras);
			$scope.comenzar();
		} else {
			segundos--;
			document.getElementById("cuentaRegresiva").innerHTML = "El ejercicio comienza en <br>" + segundos + " segundos.";
		}
	}
	var runCuentaAtras = setInterval(contar,1000);
}