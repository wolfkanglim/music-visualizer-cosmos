//import {init, animate} from './particlesdot.js';


//init();
//animate();

const canvas = document.getElementById('canvas1');
canvas.width = 1920;
canvas.height = 1080;

const ctx = canvas.getContext('2d');

let audioSource;
let analyser;
const taeguk = new Image();
taeguk.src = './asset/3taeguk.png';

const audio1 = document.getElementById('audio1');
const playBtn = document.getElementById('playBtn');
const stopPlayBtn = document.getElementById('stopPlayBtn');
const pauseBtn = document.getElementById('pauseBtn');
playBtn.addEventListener('click', (e) => {
   e.preventDefault();
   audio1.play();
})
stopPlayBtn.addEventListener('click', (e) => {
   e.preventDefault();
   audio1.pause();
   audio1.currentTime = 0;
})
pauseBtn.addEventListener('click', (e) => {
   e.preventDefault();
   audio1.pause();
})
///touch event
playBtn.addEventListener('touchstart', () => {
   audio1.load();
   audio1.play();
})
stopPlayBtn.addEventListener('touchstart', () => {
   audio1.pause();
   audio1.currentTime = 0;
})
pauseBtn.addEventListener('touchstart', () => {
   audio1.pause();
})

const audioCtx = new AudioContext();

    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;
    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    
    let barWidth = canvas.width / bufferLength;
    let x;
    let barHeight;

    function drawVisualizer(){
      x = 0;
      /* ctx.fillStyle = 'black';
      ctx.fillRect(0,0,canvas.width,canvas.height); */
     drawText();
      analyser.getByteFrequencyData(dataArray);
      for(let i = 0; i < bufferLength; i++){
          barHeight = dataArray[i] / 2;
  
          //draw visualizer
          const h = i * barHeight / 5;
          const s = 90;
          const l = 50;
  
          ctx.fillStyle = 'white';
           ctx.fillRect(x + canvas.width / 2 , canvas.height - 45 - barHeight - 15, barWidth, 5);
  
          ctx.fillStyle = 'hsl('+ h +' , '+ s +'%, '+ l +'%)';
          ctx.fillRect(x + canvas.width / 2, canvas.height - 50 - barHeight, barWidth, barHeight);
  
          ctx.fillStyle = 'white';
          ctx.fillRect(canvas.width / 2 - x, canvas.height - 45 - barHeight - 15, barWidth, 5);
  
         ctx.fillStyle = 'hsl('+ h +' , '+ s +'%, '+ l +'%)';
         ctx.fillRect(canvas.width / 2 - x, canvas.height - 50 - barHeight , barWidth, barHeight);
  
  
          x += barWidth;
      }
      requestAnimationFrame(drawVisualizer); 
  }
  drawVisualizer();

  function drawVisualizerCircle(){
   x = 0;
     analyser.getByteFrequencyData(dataArray);
   for(let i = 0; i < bufferLength; i++){
       barHeight = dataArray[i] / 2;

       ctx.save();
       ctx.translate(canvas.width / 2, canvas.height / 2 - 30);
       ctx.rotate((i * Math.PI * 8) / bufferLength + Math.PI );
       const h = (i * barHeight) / 5 + 10;
       ctx.fillStyle = "#ddd";
       ctx.fillRect(0, canvas.height / 3- barHeight - 40, barWidth / 3, 50);
       ctx.fillStyle = "hsl(" + h + ", 100%, 50%)";
       ctx.fillRect(0, 0, barWidth, barHeight * 4);
       x += barWidth;
       ctx.restore();
       ctx.drawImage(taeguk, canvas.width / 2 - 50, canvas.height / 2 - 95, 120, 100);
   }
   requestAnimationFrame(drawVisualizerCircle); 
}
drawVisualizerCircle();
  
  //draw text
  function drawText(){
      ctx.font = "62px Ariel";
      ctx.fillStyle = 'white';
      ctx.fillText('Music Visualizer', canvas.width  / 10, canvas.height / 9);
      ctx.fillText('C O S M O S', canvas.width  / 10, canvas.height / 6);
      ctx.font = '28px Verdana';
      ctx.fillText('Make a music visible', canvas.width * 4 / 5, canvas.height / 9);
      ctx.fillText('Upload', canvas.width * 4 / 5, canvas.height / 7);
      ctx.fillText('Play', canvas.width * 4 / 5, canvas.height / 5.5);
      ctx.fillText('Record', canvas.width * 4 / 5, canvas.height / 4.5);
      ctx.fillText('Wondrous East 2022 Wolfkang', canvas.width / 3, canvas.height - 25)
   }


const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");

let recording = false;
let mediaRecorder;
let recordedChunks;


recordBtn.addEventListener("click", () => {
   let dest = audioCtx.createMediaStreamDestination();
   audioSource.connect(dest);
   audioSource.connect(audioCtx.destination);
   let audioTrack = dest.stream.getAudioTracks()[0];
   
   recording = !recording;
   if (recording) {
      recordBtn.style.backgroundColor = "#aaa";
      stopBtn.style.backgroundColor = 'blue';

      const canvasStream = canvas.captureStream(60);
         
      mediaRecorder = new MediaRecorder(canvasStream, {
        mimeType: 'video/webm;codecs=vp9'        
      }); 
      canvasStream.addTrack(audioTrack);
      recordedChunks = [];
      mediaRecorder.ondataavailable = e => {
         if (e.data.size > 0) {
            recordedChunks.push(e.data);
         }
      };
      mediaRecorder.start();
   } 
});

stopBtn.addEventListener('click', () => {
   recordBtn.style.backgroundColor = 'red';
   stopBtn.style.backgroundColor = '#aaa';
   mediaRecorder.stop();
   setTimeout(() => {
      const blob = new Blob(recordedChunks, {
         type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.webm";
      a.click();
      URL.revokeObjectURL(url);
   }, 0);
});

//choose audio file
const file = document.getElementById('fileupload');

file.addEventListener('change', function(){ 
   const files = this.files;
   audio1.src = URL.createObjectURL(files[0]);
   audio1.load();
})
 
/////////////////////////
