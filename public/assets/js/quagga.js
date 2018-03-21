var _scannerIsRunning = false;

function startScanner() {
    Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#scanner-container')    // Or '#yourElement' (optional) 
        },
        decoder : {
          readers : ["code_128_reader"]
        }
      }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
      });

    Quagga.onDetected(function(result) {
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]");
        Quagga.stop();
        alert("student has been scanned");
        var studentId = result.codeResult.code;
         // Send the PullUSer request.

        $.ajax("/api/riders/" + studentId, {
          type: "POST"
        }).then(
          function() {
            console.log("deleted cat", studentId);
            // Reload the page to get the updated list
            location.reload();
          });
      });

    
}


// Start/stop scanner
document.getElementById("btn").addEventListener("click", function() {
    if (_scannerIsRunning) {
        Quagga.stop();
        $("#scanner-container").hide();
    } else {
        startScanner();
    }
});