//main router, imports it's dependencies via require.js

require(["soundfile", "effects", "play", "third-party/jquery", "third-party/underscore-min", "third-party/backbone"], function(soundfile, effects, play) {

    //main program flow
    var song = new soundfile.model("sounds/song.mp3", "a short song");
    console.dir(soundfile.view);
    var songView = new soundfile.view({model: song});
    console.log(songView);
    setTimeout(function() {
       console.log(song.get("song"), song.get("url"), song.get("title"), songView);
    }, 1000);
    $("#song").html(songView.el);
    songView.render();
});
