//main router, imports it's dependencies via require.js

require(["soundfile", "effects", "play", "third-party/jquery", "third-party/underscore-min", "third-party/backbone"], function(soundfile, effects, play) {

    //main program flow
    var song = new soundfile.model("sounds/song.mp3", "a short song");
    var songView = new soundfile.view({model: song});

    $("#song").html(songView.el);
});
