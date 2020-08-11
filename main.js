song = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
scoreLeftwrist = 0;
scoreRightwrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, console.log("PoseNet Is Started"));
    poseNet.on('pose', GotPoses)


}

function GotPoses(results) {
    if (results.length > 0) {
        console.log("The Result Is  ::::: ")
        console.log(results)
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + scoreLeftwrist);
        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = " + scoreRightwrist);
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX ::: " + LeftWristX + " LeftWristY ::: " + LeftWristY);
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX ::: " + RightWristX + " RightWristY ::: " + RightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    if (scoreRightwrist > 0.2) {
        circle(RightWristX, RightWristY, 20);
        if (RightWristY > 0 && RightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed : 0.5x(Very Slow)";
            song.rate(0.5)

        } else if (RightWristY > 100 && RightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed : 1x (Normal)";
            song.rate(1)

        } else if (RightWristY > 200 && RightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed : 1.5x (Little Fast)";
            song.rate(1.5)

        } else if (RightWristY > 300 && RightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed : 2x (Fast)";
            song.rate(2)

        } else if (RightWristY > 400) {
            document.getElementById("speed").innerHTML = "Speed : 2.5x (Super fast)";
            song.rate(2.5)

        }
    }
    if (scoreLeftwrist > 0.2) {
        circle(LeftWristX, LeftWristY, 20);
        InNumberleftwristY = Number(LeftWristY);
        remove_decimal = floor(InNumberleftwristY);
        volume = remove_decimal / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;


        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1)
}