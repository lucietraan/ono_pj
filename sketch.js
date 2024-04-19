var speech;
var data_googlesheet;
var transformedData;
var nouns;
var pages = {};
var translations
var languages = ['English', 'Chinese', 'Vietnamese', 'French', 'Korean', 'Japanese', 'Spanish']

// NEEDS TO CLICK ON THE WEBSITE TO RUN SOUND
// Consider adding landing page with a button :') 
// consider detecting sounds that's not words  
// user can ask a full sentense and it spits out the words


function preload() {
  soundFormats('wav', 'mp3');

  var url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
  '1dTlV5k_M6bC2Ot06l_473ChydceeK5ldMUsUlhRWQEU' + '/values/' + 'data' +
  '?alt=json&key=' + 'AIzaSyCmBQa-xt9B7PlPodXeRJf8RkesTt7woSs';

  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(d) {
    //console.log(d);
    data_googlesheet = d;

    if (data_googlesheet) {
      console.log(data_googlesheet);
  
      const keys = data_googlesheet.values[0];
      //console.log(keys);
      const values = data_googlesheet.values.slice(1);
    
      const formattedValues = values.map(row => {
        const obj = {};
        keys.forEach((key, index) => {
          obj[key] = row[index];
        });
        return obj;
      });
  
      transformedData = formattedValues.reduce((acc, obj) => {
        acc[obj.noun] = obj;
        return acc;
      }, {});
  
      // console.log(transformedData);
      nouns = Object.keys(transformedData);
  
      console.log(transformedData);
  
      setupPages();
    
  
  
      nouns.forEach((n) => {
        pages[n] = (document.getElementById(n.toLowerCase()+'Page'))
        transformedData[n].loadedsound = ((n=="home")? null : loadSound(transformedData[n].soundurl)); 
        console.log(transformedData[n])
        if (n === "home") {
          pages[n].style.display = "flex";
        } else {
          pages[n].style.display = "none";
        }
       });
  
    console.log(pages);
    }
  })
  .catch(function(error) {
    console.error('There was a problem with the fetch operation:', error);
  });


}

// null = nothing 
var currentsound = null; 


function setup() {
  noCanvas();
  speech = new p5.SpeechRec('en-US', gotSpeech); 
  speech.continuous = true;
  speech.start();

  
 

}

function draw() {

}

function checkSpeech() { 

  if (speech.resultString) { 
    var input = speech.resultString.toLowerCase(); 

    if (input in transformedData) {
      if (currentsound) {
        currentsound.stop();
      }

      for (var page in pages) {
        if (pages.hasOwnProperty(page)) {
          pages[page].style.display = "none";
        }
      }

      pages[input].style.display = "block";

      if (input !== "home") { 
        // pages["home"].style.display = "none"; 
        currentsound = transformedData[input].loadedsound; 
        if (currentsound) { 
          currentsound.play(); 
        }
          
      } else {
        
        pages["home"].style.display = "flex";
      }
      
      }
  }
}



function setupPages() {
  if (!transformedData || !data_googlesheet || !data_googlesheet.values || data_googlesheet.values.length === 0) {
    console.error('No data available');
    return;
  }

  var pageTemplate = document.querySelector('.pageTemplate');
  var container = document.querySelector('.container'); // Assuming a container exists to append the pages

  nouns.forEach((n) => {
    if (n != 'home') {
      var clone = document.createElement("div");

      const noun_display = document.createElement("div");
      noun_display.setAttribute('class', 'nouns');
  
      const noun_display_text = document.createTextNode(n);
      noun_display.appendChild(noun_display_text)

      clone.setAttribute("style", 'background-image: url('+transformedData[n].imgurl+');')
      console.log('background-image: url('+transformedData[n].imgurl+')')
  
      clone.appendChild(noun_display); 
      clone.setAttribute('id', n.toLowerCase()+'Page');

      languages.forEach((language) => {
        const translation = document.createElement("div");
        translation.setAttribute('class', 'translation', language.toLowerCase());
        const translationText = document.createTextNode(`${language}: ${transformedData[n][language.toLowerCase()]}`);
        translation.appendChild(translationText);
        clone.appendChild(translation);
      });
  
      container.appendChild(clone);
  
      console.log('n');
    }

  });

  

} 


// CHECK CONSOLE TO SEE IF IT'S WORKING 
function gotSpeech() { 
  console.log(speech.resultString);
  checkSpeech(); 
} 