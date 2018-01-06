
  // Attribution for creating 2 separate draw fields: http://www.joemckaystudio.com/multisketches/

  var mic, fft;

  // Sketch One - create audio input, analyse and visualize
  var s = function( p ) { // p could be any variable name

    p.setup = function() {
      p.createCanvas(1000, 200);
      p.noFill();

      //MICROPHONE
      mic = new p5.AudioIn();
      mic.start();

      //MIC On BUTTON
      var micOn = document.getElementById('micon');
      micOn.addEventListener('click', function(e){
        e.preventDefault();
        mic.start();
      });

      //MIC OFF BUTTON
      var micOff = document.getElementById('micoff');
      micOff.addEventListener('click', function(e){
        e.preventDefault();
        mic.stop();
      });

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

      sinosc = new p5.Oscillator();
      sinosc.setType('sine');
      sinosc.amp(.5);

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
      //sine
      var startSin = document.getElementById('startsin');
      startSin.addEventListener('click', function(e) {
        e.preventDefault();
        sinosc.start();
        triosc.stop();
        sawosc.stop();
        sqrosc.stop();
      });

      var stopSin = document.getElementById('stopsin');
      stopSin.addEventListener('click', function(e) {
        e.preventDefault();
        sinosc.stop();
      });

      // Triangle
      var startTri = document.getElementById('starttri');
      startTri.addEventListener('click', function(e) {
        e.preventDefault();
        triosc.start();
        sinosc.stop();
        sawosc.stop();
        sqrosc.stop();
      });

      var stopTri = document.getElementById('stoptri');
      stopTri.addEventListener('click', function(e) {
        e.preventDefault();
        triosc.stop();
      });

      // Sawtooth
      var startSaw = document.getElementById('startsaw');
      startSaw.addEventListener('click', function(e) {
        e.preventDefault();
        sawosc.start();
        sinosc.stop();
        triosc.stop();
        sqrosc.stop();
      });

      var stopSaw = document.getElementById('stopsaw');
      stopSaw.addEventListener('click', function(e) {
        e.preventDefault();
        sawosc.stop();
      });

      // Square
      var startSqr = document.getElementById('startsqr');
      startSqr.addEventListener('click', function(e) {
        e.preventDefault();
        sqrosc.start();
        sinosc.stop();
        triosc.stop();
        sawosc.stop();
      });

      var stopSqr = document.getElementById('stopsqr');
      stopSqr.addEventListener('click', function(e) {
        e.preventDefault();
        sqrosc.stop();
      });


      //NOISE
      //WHITE
      whitenoise = new p5.Noise();
      whitenoise.setType('white');
      whitenoise.amp(.5)

      //BROWN
      brownnoise = new p5.Noise();
      brownnoise.setType('brown');
      brownnoise.amp(.5)

      //PINK
      pinknoise = new p5.Noise();
      pinknoise.setType('pink');
      pinknoise.amp(.5)

      //WHITE NOISE BUTTONS
      var startWhNoise = document.getElementById('startwhnoise');
      startWhNoise.addEventListener('click', function(e){
        e.preventDefault();
        whitenoise.start();
        brownnoise.stop();
        pinknoise.stop();
      });

      var stopWhNoise = document.getElementById('stopwhnoise');
      stopWhNoise.addEventListener('click', function(e){
        e.preventDefault();
        whitenoise.stop();
      });

      //BROWN NOISE BUTTONS
      var startBrNoise = document.getElementById('startbrnoise');
      startBrNoise.addEventListener('click', function(e){
        e.preventDefault();
        brownnoise.start();
        whitenoise.stop();
        pinknoise.stop();
      });

      var stopBrNoise = document.getElementById('stopbrnoise');
      stopBrNoise.addEventListener('click', function(e){
        e.preventDefault();
        brownnoise.stop();
      });

      //PINK NOISE BUTTONS
      var startPkNoise = document.getElementById('startpknoise');
      startPkNoise.addEventListener('click', function(e){
        e.preventDefault();
        pinknoise.start();
        brownnoise.stop();
        whitenoise.stop();
      });

      var stopPkNoise = document.getElementById('stoppknoise');
      stopPkNoise.addEventListener('click', function(e){
        e.preventDefault();
        pinknoise.stop();
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
      sinosc.freq(freq);
      triosc.freq(freq);
      sawosc.freq(freq);
      sqrosc.freq(freq);

      // change amplification of oscillators and noises based on mouseY
      var amp = p.map(p.mouseY, 0, p.height, 1, .01);
      sinosc.amp(amp);
      triosc.amp(amp);
      sawosc.amp(amp);
      sqrosc.amp(amp);
      whitenoise.amp(amp);
      brownnoise.amp(amp);
      pinknoise.amp(amp);

    };
  };
  var myp5 = new p5(t, 'c2');


//jQuery button collapse
$('.collapseOne').collapse()




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
