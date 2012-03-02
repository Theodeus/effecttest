//This is the heart of the app.

 // The idea behind the app is that the user can add musical effects to an mp3 and play it with the effects added.
 
 // To achieve this I've got at collection of effects that the user can add, edit and remove effects from via the GUI.
 // When the user decides it's time to start the playback I loop trough the effect collection and set up an effect chain in the order the effects are stated in the collection and apply any custom settings.
 
 // This means there are no actuall Web Audio effects being handled until the very moment the user starts playback. While this makes the CRUD:ing of effects and code structure a breeze (everything is abstract data), it also means that effect settings can't be changed in real time. A restart of the song is needded to make the new settings apply.

//Here we go!
define(["soundfile", "play", "patch", "backbone", "AudioNodes"], function(soundfile, play, patch, Backbone) {
    //These should not be attached to the main view, but rather be kept here as privates
    var context = new webkitAudioContext(),
        playing = false,
        currentSong, 
        animationTimer;
    
    //This is the main view, and the main flow controller
    var app = Backbone.View.extend({
        //keep a reference to the currently selected song/mp3
        song : null,
        init : function() {
            //Load a default mp3 and set the title (which will be displayed in the box in the GUI) to something instructive
            song = new soundfile.model("sounds/song.mp3", "Click to change song");
            
            //The song box in the GUI
            var songView = new soundfile.view({
                model : song
            });
            //Attach it to the predefined song div
            $("#song").html(songView.el);
            
            //The collection that holds the effects one adds to the mp3
            var presets = new patch.collection();
            //Check if there's models in the localStorage
            presets.fetch();
            //Sort them if so. This needs to be done in order for the effects to appear at the propper positions in the GUI (and in the audible effect chain too)
            presets.models = _.sortBy(presets.models, function(model){
                console.log(model.get("position"));
                return model.get("position");
            });

            //The graphical representation of the effect chain. This is the pipe that the effect boxes renders unto.
            var presetView = new patch.view({
                collection : presets,
                id : "effectPipe"
            });
            //The speaker in the GUI
            var playView = new play(this.startPlayback, presets);
            
            //Append to the predefined divs
            $("#effects").append(presetView.el);
            $("#play").append(playView.el);
        },
        
        //This is the function that is called when the user starts/stops the playback.
        //The effect collection is looped trough and the propper Web Audio effects are created and connected, and finaly the sound is started.
        startPlayback : function(presets) {
            //Stop the music and return if we're already playing
            if(playing) {
                currentSong.noteOff(0);
                playing = false;
                clearInterval(animationTimer);
                document.getElementById("effectPipe").style.backgroundColor = "#333";
                return;
            }
            
            var output = context.destination,
            audio = context.createBufferSource(),
            buffer = context.createBuffer(song.get("song"), false),
            nodes = [], 
            node,
            finalNode;

            audio.buffer = buffer;
            audio.loop = true;
            
            
            //Start looping the effects!
            for(var model in presets) {
                var instance = presets[model];
                //Check what kind of effect we're dealing with and create the propper Web Audio effect
                switch(instance.name) {
                    case "delay":
                        node = new AudioNodes.StereoDelay(context);
                        if(instance.params.tempo !== undefined) {
                            node.setTempo(Math.floor(instance.params.tempo * 200));
                        }
                        if(instance.params.level !== undefined) {
                            node.setLevel(instance.params.level);
                        }
                        nodes.push(node);
                        break;
                    case "filter":
                        node = new AudioNodes.Filter(context, "lowpass", {
                            frequency : Math.pow(instance.params.freq, 2) * 10000,
                            q : instance.params.q * 15
                        });
                        nodes.push(node);
                        break;
                    case "reverb":
                        node = new AudioNodes.Convolver(context, "sounds/impulse_rev.wav");
                        if(instance.params.level !== undefined) {
                            node.setLevel(instance.params.level);
                        }
                        nodes.push(node);
                        break;
                    case "compressor":
                        node = context.createDynamicsCompressor();
                        node.input = node;
                        nodes.push(node);
                        break;
                    case "volume":
                        node = context.createGainNode();
                        node.input = node;
                        node.gain.value = instance.params.gain === undefined ? 1 : instance.params.gain;
                        nodes.push(node);
                        break;
                    default:
                        break;
                }
            }
            
            //Start the routing of the effects with the mp3
            finalNode = audio;
            
            //loop trough the newly created Web Audio effects and connect them in turn to each other
            if(nodes.length) {
                for(var i = 0; i < nodes.length; i++) {
                    finalNode.connect(nodes[i].input);
                    finalNode = nodes[i];
                }
            }
            //Connect the last node (which will be the mp3 if there's no effects applied) to the output...
            finalNode.connect(output);
            playing = true;
            currentSong = audio;
            //...and start playback! Boomchickawawaa.
            audio.noteOn(0);
            
            //Create some funky animations (just for fun and giggles)
            var randomColor = function() {
                return Math.floor(Math.random() * 9);
            };
            var effectPipe = document.getElementById("effectPipe"),
                speaker = $("#play");
            //start animation
            animationTimer = setInterval(function() {
                //make speaker shake
                speaker.css("background-size", Math.floor(Math.random()*8+65)+"px " + Math.floor(Math.random()+95)+"px");
                //funky colors for effect pipe
                effectPipe.style.backgroundColor = "#" + randomColor() + randomColor() + randomColor() + randomColor() + randomColor() + randomColor();
            }, 1000 / 8);
        }
    });

    return app;
});
