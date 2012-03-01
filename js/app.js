//main router, imports it's dependencies via require.js
define(["soundfile", "play", "preset", "backbone", "AudioNodes"], function(soundfile, play, preset, Backbone) {
    //"local" globals :)
    var context = new webkitAudioContext(),
        playing = false,
        currentSong, 
        animationTimer;
    
    var app = Backbone.View.extend({
        song : null,
        startPlayback : function(presets) {
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

            for(var model in presets) {

                var instance = presets[model];

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
                        //console.log("empty slot");
                        break;
                }
            }
            finalNode = audio;

            if(nodes.length) {
                for(var i = 0; i < nodes.length; i++) {
                    finalNode.connect(nodes[i].input);
                    finalNode = nodes[i];
                }
            }

            finalNode.connect(output);
            playing = true;
            currentSong = audio;
            audio.noteOn(0);

            var randomColor = function() {
                return Math.floor(Math.random() * 9);
            };
            var effectPipe = document.getElementById("effectPipe");
            //start animation
            animationTimer = setInterval(function() {
                //make speaker shake
                $("#play").css("background-size", Math.floor(Math.random()*8+65)+"px " + Math.floor(Math.random()+95)+"px");
                //funky colors for effect pipe
                effectPipe.style.backgroundColor = "#" + randomColor() + randomColor() + randomColor() + randomColor() + randomColor() + randomColor();
            }, 1000 / 8);
        },
        init : function() {
            //main program flow
            song = new soundfile.model("sounds/song.mp3", "Click to change song");
            var songView = new soundfile.view({
                model : song
            });

            $("#song").html(songView.el);

            var presets = new preset.collection();
            var presetView = new preset.view({
                collection : presets,
                id : "effectPipe"
            });
            var playView = new play(this.startPlayback, presets);

            $("#effects").append(presetView.el);
            $("#play").append(playView.el);
        }
    });

    return app;
});
