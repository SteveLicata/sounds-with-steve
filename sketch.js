
  var mic, fft;
  var startTri = document.getElementById('starttri');
  var stopTri = document.getElementById('stoptri');
  var startSaw = document.getElementById('startsaw');
  var stopSaw = document.getElementById('stopsaw');
  var startSqr = document.getElementById('startsqr');
  var stopSqr = document.getElementById('stopsqr');


  // Attribution for creating 2 separate draw fields: http://www.joemckaystudio.com/multisketches/


  // Sketch One - create audio input, analyse and visualize
  var s = function( p ) { // p could be any variable name

    p.setup = function() {
      p.createCanvas(1000, 200);
      p.noFill();
      mic = new p5.AudioIn();
      mic.start();
      fft = new p5.FFT();
      fft.setInput(mic);
    };

    p.draw = function() {
      p.background(200);

      var spectrum = fft.analyze();

      p.beginShape();
      for (i = 0; i<spectrum.length; i++) {
        p.vertex(i, p.map(spectrum[i], 0, 255, p.height, 0) );
      }
      p.endShape();
    };
  };
  var myp5 = new p5(s, 'c1');


  // Sketch Two - create oscillator, start/stop, draw wavelength and change volume & frequency w mouse
  var t = function( p ) {
    p.setup = function() {
      p.createCanvas(1000, 200);

      triosc = new p5.Oscillator(); // set frequency and type
      triosc.setType('triangle');
      triosc.amp(.5);

      sawosc = new p5.Oscillator(); // set frequency and type
      sawosc.setType('saw');
      sawosc.amp(.5);

      sqrosc = new p5.Oscillator();
      sqrosc.setType('square');
      sqrosc.amp(.5);

      // **** ON - only oscillator / OFF - only mic ****
      // fft = new p5.FFT();

      // start/stop click events for 3 oscillators buttons
      // Triangle
      startTri.addEventListener('click', function(e) {
        e.preventDefault();
        triosc.start();
        sawosc.stop();
        sqrosc.stop();
      });

      stopTri.addEventListener('click', function(e) {
        e.preventDefault();
        triosc.stop();
      });

      // Sawtooth
      startSaw.addEventListener('click', function(e) {
        e.preventDefault();
        sawosc.start();
        triosc.stop();
        sqrosc.stop();
      });

      stopSaw.addEventListener('click', function(e) {
        e.preventDefault();
        sawosc.stop();
      });

      // Square
      startSqr.addEventListener('click', function(e) {
        e.preventDefault();
        sqrosc.start();
        triosc.stop();
        sawosc.stop();
      });

      stopSqr.addEventListener('click', function(e) {
        e.preventDefault();
        sqrosc.stop();
      });
    };

    p.draw = function() {
      p.background(255);
      // visualize waveforms
      var waveform = fft.waveform();  // analyze the waveform
      p.beginShape();
      p.strokeWeight(5);
      for (var i = 0; i < waveform.length; i++){
        var x = p.map(i, 0, waveform.length, 0, p.width);
        var y = p.map(waveform[i], -1, 1, p.height, 0);
        p.vertex(x, y);
      }
      p.endShape();

      // change oscillator frequency based on mouseX
      var freq = p.map(p.mouseX, 0, p.width, 20, 20000);
      triosc.freq(freq);
      sawosc.freq(freq);
      sqrosc.freq(freq);

      var amp = p.map(p.mouseY, 0, p.height, 1, .01);
      triosc.amp(amp);
      sawosc.amp(amp);
      sqrosc.amp(amp);

    };
  };
  var myp5 = new p5(t, 'c2');







// OLD REFERENCE CODE

//ORIGINAL CODE ACCORDING TO p5*JS docs

  // function setup() {
  //    createCanvas(710,400);
  //    noFill();
  //
  //    mic = new p5.AudioIn();
  //    mic.start();
  //    fft = new p5.FFT();
  //    fft.setInput(mic);
  //
  //    osc = new p5.TriOsc(); // set frequency and type
  //    osc.amp(.5);
  //
  //    fft = new p5.FFT();
  //
  //    startBtn.addEventListener('click', function(e) {
  //      e.preventDefault();
  //      osc.start();
  //    });
  //
  //    stopBtn.addEventListener('click', function(e) {
  //      e.preventDefault();
  //      osc.stop();
  //    });
  //
  // }
  //
  // function draw() {
  //    background(200);
  //
  //    var spectrum = fft.analyze();
  //
  //    beginShape();
  //    for (i = 0; i<spectrum.length; i++) {
  //     vertex(i, map(spectrum[i], 0, 255, height, 0) );
  //    }
  //    endShape();
  //
  //
  //   background(255);
  //   // visualize waveforms
  //   var waveform = fft.waveform();  // analyze the waveform
  //   beginShape();
  //   strokeWeight(5);
  //   for (var i = 0; i < waveform.length; i++){
  //     var x = map(i, 0, waveform.length, 0, width);
  //     var y = map(waveform[i], -1, 1, height, 0);
  //     vertex(x, y);
  //   }
  //   endShape();
  //
  //   // change oscillator frequency based on mouseX
  //   var freq = map(mouseX, 0, width, 20, 20000);
  //   osc.freq(freq);
  //
  //   var amp = map(mouseY, 0, height, 1, .01);
  //   osc.amp(amp);
  // }



//ORIGINAL CODE FOR 2 SEPARATE DRAW FIELDS

//   // Sketch One
// var s = function( p ) { // p could be any variable name
//   var x = 100;
//   var y = 100;
//   p.setup = function() {
//     p.createCanvas(400, 200);
//   };
//
//   p.draw = function() {
//     p.background(0);
//     p.fill(255);
//     p.rect(x,y,50,50);
//   };
// };
// var myp5 = new p5(s, 'c1');
//
// // Sketch Two
// var t = function( p ) {
//   var x = 100.0;
//   var y = 100;
//   var speed = 2.5;
//   p.setup = function() {
//     p.createCanvas(400, 200);
//   };
//
//   p.draw = function() {
//     p.background(100);
//     p.fill(1);
//     x += speed;
//     if(x > p.width){
//       x = 0;
//     }
//     p.ellipse(x,y,50,50);
//
//   };
// };
// var myp5 = new p5(t, 'c2');
