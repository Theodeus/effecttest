//main router, imports it's dependencies via require.js

require(["third-party/underscore-min", "third-party/backbone-min", "soundfile", "effects", "play"], function(_, backbone, soundfile, effects, play) {

    //main program flow
    var song = new soundfile.model("sounds/song.mp3", "a short song");
    console.dir(soundfile.view);
    var songView = new soundfile.view({model: song});
    console.log(songView);
    setTimeout(function() {
       console.log(song.get("song"), song.get("url"), song.get("title"));
    }, 1000);
});
