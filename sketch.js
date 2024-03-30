var speech;

function preload() {
  soundFormats('wav', 'mp3');

  // EARTH
  leavessound = loadSound('sounds/leaves-sound.wav');
  treessound = loadSound('sounds/trees-sound.mp3')
  mudsound = loadSound('sounds/mud-sound.wav')
  earthquakesound = loadSound('sounds/earthquake-sound.mp3')
  avalanchesound = loadSound('sounds/avalanche-sound.wav')

  // FIRE
  campfiresound = loadSound('sounds/campfire-sound.mp3')
  explosionsound = loadSound('sounds/explosion-sound.wav')
  volcanosound = loadSound('sounds/volcano-sound.wav')
  lightningsound = loadSound('sounds/lightning-sound.wav')
  matchessound = loadSound('sounds/matches-sound.wav')

  // WATER
  rainsound = loadSound('sounds/rain-sound.wav')
  icesound = loadSound('sounds/ice-sound.wav')
  oceansound = loadSound('sounds/ocean-sound.wav')
  waterfallsound = loadSound('sounds/waterfall-sound.wav')
  tsunamisound = loadSound('sounds/tsunami-sound.wav')

  // WIND 
  breezesound = loadSound('sounds/breeze-sound.wav')
  tornadosound = loadSound('sounds/tornado-sound.mp3')
  stormsound = loadSound('sounds/storm-sound.wav')
  blowsound = loadSound('sounds/blow-sound.wav')
  breathsound = loadSound('sounds/breath-sound.wav')

  // HUMAN 
  heartbeatsound = loadSound('sounds/heartbeat-sound.wav') 
  laughtersound = loadSound('sounds/laughter-sound.wav') 
  painsound = loadSound('sounds/pain-sound.mp3')
  sadnesssound = loadSound('sounds/sadness-sound.wav')
  amazementsound = loadSound('sounds/amazement-sound.mp3')
}

// null = nothing 
var currentsound = null; 


function setup() {
  noCanvas();
  speech = new p5.SpeechRec('en-US', gotSpeech); 
  speech.continuous = true;
  speech.start();


  var url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
    '1dTlV5k_M6bC2Ot06l_473ChydceeK5ldMUsUlhRWQEU' + '/values/' + 'data' +
    '?alt=json&key=' + 'AIzaSyCmBQa-xt9B7PlPodXeRJf8RkesTt7woSs';

  fetch(url, {method: 'get'
  }).then(function(response) {
    console.log(response);
  }).catch(function(err) {
    console.log("error");
  })

  // (data=$.getJSON(url, 'callback=success'))
  
  // function success(data) {
  //   console.log("hi");
  //   console.log(data)
  // };


}

function draw() {

}

function checkSpeech() { 

  if (speech.resultString) { 
    var pages = [
      document.getElementById("welcomePage"),
      document.getElementById("leavesPage"),
      document.getElementById("treesPage"), 
      document.getElementById("mudPage"), 
      document.getElementById("earthquakePage"), 
      document.getElementById("avalanchePage"), 
      document.getElementById("campfirePage"), 
      document.getElementById("explosionPage"), 
      document.getElementById("volcanoPage"), 
      document.getElementById("lightningPage"), 
      document.getElementById("matchesPage"), 
      document.getElementById("rainPage"), 
      document.getElementById("icePage"), 
      document.getElementById("oceanPage"), 
      document.getElementById("waterfallPage"), 
      document.getElementById("tsunamiPage"), 
      document.getElementById("breezePage"), 
      document.getElementById("tornadoPage"), 
      document.getElementById("stormPage"), 
      document.getElementById("blowPage"), 
      document.getElementById("breathPage"), 
      document.getElementById("heartbeatPage"), 
      document.getElementById("laughterPage"), 
      document.getElementById("painPage"), 
      document.getElementById("sadnessPage"), 
      document.getElementById("amazementPage")
    ];

    var data = {
      "home": {
        currentsound: null, 
        page: 0
      },
      "leaves": {
        currentsound: leavessound,
        page: 1
      },
      "trees": {
        currentsound: treessound,
        page: 2
      },
      "mud": {
        currentsound: mudsound,
        page: 3
      }, 
      "earthquake": { 
        currentsound: earthquakesound, 
        page: 4
      }, 
      "avalanche": { 
        currentsound: avalanchesound, 
        page: 5
      }, 
      "campfire": { 
        currentsound: campfiresound, 
        page: 6
      }, 
      "explosion": { 
        currentsound: explosionsound, 
        page: 7
      }, 
      "volcano": { 
        currentsound: volcanosound, 
        page: 8
      }, 
      "lightning": { 
        currentsound: lightningsound, 
        page: 9
      }, 
      "matches": { 
        currentsound: matchessound, 
        page: 10
      }, 
      "rain": { 
        currentsound: rainsound, 
        page: 11
      }, 
      "ice": { 
        currentsound: icesound, 
        page: 12
      }, 
      "ocean": { 
        currentsound: oceansound, 
        page: 13
      }, 
      "waterfall": { 
        currentsound: waterfallsound, 
        page: 14
      }, 
      "tsunami": { 
        currentsound: tsunamisound, 
        page: 15
      }, 
      "breeze": { 
        currentsound: breezesound, 
        page: 16
      }, 
      "tornado": { 
        currentsound: tornadosound, 
        page: 17
      }, 
      "storm": { 
        currentsound: stormsound, 
        page: 18
      }, 
      "blow": { 
        currentsound: blowsound, 
        page: 19
      }, 
      "breath": { 
        currentsound: breathsound, 
        page: 20
      }, 
      "heartbeat": { 
        currentsound: heartbeatsound, 
        page: 21
      }, 
      "laughter": { 
        currentsound: laughtersound, 
        page: 22
      }, 
      "pain": { 
        currentsound: painsound, 
        page: 23
      }, 
      "sadness": { 
        currentsound: sadnesssound, 
        page: 24
      }, 
      "amazement": { 
        currentsound: amazementsound, 
        page: 25
      }
    }

    var input = speech.resultString.toLowerCase(); 

    if (input in data) {
      if (currentsound) {
        currentsound.stop();
      }
      
      currentsound = data[input].currentsound;
      if (currentsound) {
        currentsound.play();
      }
      
      pages.forEach(function(page, index) {
        if (index === 0) {
          page.style.display = "flex";
        } else {
          page.style.display = "none";
        }
      });

      if (input !== "home") { 
        pages[data["home"].page].style.display = "none"; 
      } else {
        pages[data["home"].page].style.display = "flex";
      }
      
      // Show current page as block
      for (var i = 1; i < pages.length; i++) {
        if (i === data[input].page) {
          pages[i].style.display = "block";
        } else {
          pages[i].style.display = "none";
        }
      }
      }
    }

}


// CHECK CONSOLE TO SEE IF IT'S WORKING 
function gotSpeech() { 
  console.log(speech.resultString);
  checkSpeech(); 
} 