var speech;


function setup() {
  createCanvas(400, 400);
  
  speech = new p5.SpeechRec('en-US', gotSpeech); // speech recognition object (will prompt for mic access)
  
  speech.continuous = true;
  //speech.interimResults = true;
  
  speech.start(); // start listening

}

function draw() {
  background(220);
  fill(0); // Set the fill color to black
  textSize(16); // Set the text size
  textAlign(LEFT); // Align text to the left
  if (speech.resultString) { // Check if resultString is not empty
    text(speech.resultString, 10, 20); // Display the speech result on the canvas
      
    if (speech.resultString.toLowerCase() == "rain") {
      ellipse(50, 50, 10, 10)
    }
  }


}

function gotSpeech()
{ 
  console.log(speech.resultString); // log the result
}