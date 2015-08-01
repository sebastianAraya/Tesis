function getgeolocation() {
            var options = { frequency: 1, enableHighAccuracy: true  };
        navigator.geolocation.watchPosition(ongeo, offgeo,options);
    }

function ongeo(position) {
        
        console.log(JSON.stringify(position, null, 4));
      
    }

    // onError Callback receives a PositionError object
    //
    function offgeo(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
/* ================================================= */

var kacak = null;

    // device APIs are available
    //
    function watchgeo() {
        // Throw an error if no update is received every 30 seconds
        //var options = { timeout: 30000 };
        kacak = navigator.geolocation.watchPosition(onwatch, offwatch);
    }

    // onSuccess Geolocation
    //
    function onwatch(position) {
        console.log("inicial: " + JSON.stringify(position, null, 4));
        var element = document.getElementById('watchlivegeo');

    }

        // onError Callback receives a PositionError object
        //
        function offwatch(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }