/* JS comes here */
function runSpeechRecognition() {
    // get output div reference
    var output = document.getElementById("output");
    // get action element reference
    var action = document.getElementById("action");

    var pulseContainer = document.querySelector(".container");
    // new speech recognition object
    // all web api;s (exposed by the brower global objects)
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    // create a new instance
    var recognition = new SpeechRecognition(); 

    // we have 3 main event handlers
    // -onstart
    // -onspeechend
    // -onresesult
    // This runs when the speech recognition service starts
    // Once we begin speech recognition, the onstart event handler can be used to inform the user that speech recognition has started and they should speak into the mocrophone.
    recognition.onstart = function() {
        action.innerHTML = "<small>listening, please speak...</small>";
        pulseContainer.style.display = "flex"
    };
    
    recognition.onspeechend = function() {
        action.innerHTML = "<small>stopped listening, hope you are done...</small>";
        pulseContainer.style.display = "none"
        recognition.stop();
    }
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        console.log(transcript)
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%";
        output.classList.remove("hide");
        pulseContainer.style.display = "none"
    };
  
     // start recognition
     recognition.start();
}