var speech;


function setup() {
  
  speech = new p5.SpeechRec('en-US', gotSpeech); 
  speech.continuous = true;
  speech.start();

}

function draw() {

  if (speech.resultString) { 
      
    if (speech.resultString.toLowerCase() == "rain") {
      var cardrain = document.getElementById("Rain1");
      cardrain.style.display = "block";
      cardrain = document.getElementById("Rain2");
      cardrain.style.display = "block";
  
      var cardleaves = document.getElementById("Leaves1");
      cardleaves.style.display = "none";
      cardleaves = document.getElementById("Leaves2");
      cardleaves.style.display = "none";
      
      var cardwelcome = document.getElementById("Welcome1");
      cardwelcome.style.display = "none";
      cardwelcome = document.getElementById("Welcome2");
      cardwelcome.style.display = "none";
    }
    
  if (speech.resultString.toLowerCase() == "leaves") {
      var cardleaves = document.getElementById("Leaves1");
      cardleaves.style.display = "block";
      cardleaves = document.getElementById("Leaves2");
      cardleaves.style.display = "block";
    
      var cardrain = document.getElementById("Rain1");
      cardrain.style.display = "none";
      cardrain = document.getElementById("Rain2");
      cardrain.style.display = "none";
    
      var cardwelcome = document.getElementById("Welcome1");
      cardwelcome.style.display = "none";
      cardwelcome = document.getElementById("Welcome2");
      cardwelcome.style.display = "none";
    }
    
  }

}

// Speech recognition test 
function gotSpeech()
{ 
  console.log(speech.resultString); // log the result
} 