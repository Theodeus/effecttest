//main router, imports it's dependencies via require.js
window.onload = function(){
    require(["soundfile", "effects", "play", "preset", "third-party/jquery", "third-party/underscore-min", "third-party/backbone"], function(soundfile, effects, play, preset) {
    
        //main program flow
        var song = new soundfile.model("sounds/song.mp3", "a short song");
        var songView = new soundfile.view({model: song});
    
        $("#song").html(songView.el);
    
        var delay = new effects.delay.model();
        var delay2 = new effects.delay.model();
        
       // $("#effects").append(delayView.el);
        
        var presets = new preset.collection();
        presets.add(delay);
        presets.add(delay2);
        console.log(presets);
        var presetView = new preset.view({model: presets});
        
        $("#effects").append(presetView.el);
    });
};
