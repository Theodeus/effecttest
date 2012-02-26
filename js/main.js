//main router, imports it's dependencies via require.js

require(["third-party/underscore-min", "third-party/backbone-min", "soundfile", "effects", "play"], function(_, backbone, soundfile, effects, play){
    console.log(_, backbone, soundfile, effects, play);
    //main program flow
    console.log(soundfile.getSong());
    soundfile.changeFile("sounds/song.mp3");
    setTimeout(function(){console.log(soundfile.getSong())},1000);
    
});
