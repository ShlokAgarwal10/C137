name_of_object = "";
objects = [];
status = "";

function preload(){

}

function setup(){
    canvas = createCanvas(300,300);
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video,0,0,300,300);

    if(status != ""){
        for (i = 0; i < objects.length; i++) {
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


            if (objects[i].label == name_of_object){
                video_webcamLiveView.stop();
                objectDetector.detect(gotResult);
                document.getElementById("name_object").innerHTML=name_of_object+" found"
                var synth = window.speechSynthesis;
                speak_data = name_of_object+" found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
              }
              else{
                document.getElementById("name_object").innerHTML=name_of_object+" not found"
              }
        }
    }
  
}
function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects"
    name_of_object = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects = results;
}