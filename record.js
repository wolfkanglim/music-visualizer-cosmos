////////tryto  record from canvas to video???


const canvas = document.getElementById('canvas1');


var time = 0;
var recordedChunks = [];
let mediaRecorder;

export function record(canvas, time){
    recordBtn.style.backgroudColor = '#aaa';
    stopBtn.style.backgroundColor = 'blue';

    //return new Promise(function(res, rej){
        let canvasStream = canvas.captureStream();
         
        mediaRecorder = new MediaRecorder(canvasStream, {
          mimeType: 'video/webm;codecs=vp9'        
        }); 
      /*   var stream = canvas.captureStream(60);
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9"
        }); */

        mediaRecorder.start(time || 1000);
        mediaRecorder.ondataavailable = function(e){
            if(e.data > 0){
                  recordedChunks.push(e.data);
            }          
            if(mediaRecorder.state == 'recording'){
                mediaRecorder.stop();            
            }
        }
        /* mediaRecorder.onstop = function(e){
            var blob = new Blob(recordedChunks, {
                type: "video/webm"});
                var url = URL.createObjectURL(blob);
                res(url);
        } */
   //
}
export function stopRecord(){
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
    }, 3000);
 };


    