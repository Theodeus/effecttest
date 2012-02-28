//main router, imports it's dependencies via require.js
window.onload = function(){
    require(["soundfile", "effects", "play", "preset", "third-party/jquery", "third-party/underscore-min", "third-party/backbone", "AudioNodes"], function(soundfile, effects, play, preset) {
        
        var context = new webkitAudioContext()
        var playing = false;
        var currentSong;
        var startPlayback = function(presets){
            if(playing){
                currentSong.noteOff(0);
                playing = false;
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
            
            
            
            for(var model in presets){
                
                var instance = presets[model];
                
                switch(instance.name){
                    case "delay":
                        node = new AudioNodes.StereoDelay(context);
                        if(instance.params.tempo !== undefined){
                            node.setTempo(Math.floor(instance.params.tempo*200));
                        }
                        if(instance.params.level !== undefined){
                            node.setLevel(instance.params.level);
                        }
                        nodes.push(node);
                        console.log("I'm a delay");
                        break;
                    case "filter":
                        node = new AudioNodes.Filter(context, "lowpass", {frequency: Math.pow(instance.params.freq, 2)*10000, q: instance.params.q*15});
                        nodes.push(node);
                        console.log("I'm a filter");
                        break;
                    case "reverb":
                        node = new AudioNodes.Convolver(context, "sounds/impulse_rev.wav");
                        if(instance.params.level !== undefined){
                            node.setLevel(instance.params.level);
                        }
                        nodes.push(node);
                        console.log("I'm a reverb");
                        break;
                    case "compressor":
                        node = context.createDynamicsCompressor();
                        console.log(node);
                        node.input = node;
                        nodes.push(node);
                        console.log("I'm a compressor");
                        break;
                    case "volume":
                        node = context.createGainNode();
                        node.input = node;
                        node.gain.value = instance.params.gain === undefined ? 1 : instance.params.gain;
                        nodes.push(node);
                        console.log("I'm a volume");
                        break;    
                    default:
                        console.log("unknown effect");
                        break;
                }
            }
            
            finalNode = audio;
            
            if(nodes.length){
                for(var i = 0; i < nodes.length; i++){
                    finalNode.connect(nodes[i].input);
                    finalNode = nodes[i];
                }
            }

            finalNode.connect(output);
            playing = true;
            currentSong = audio;
            audio.noteOn(0);    
        };
        
        
        //main program flow
        var song = new soundfile.model("sounds/song.mp3", "a short song");
        var songView = new soundfile.view({model: song});
    
        $("#song").html(songView.el);
    
        var delay = new effects.delay.model();
        var volume = new effects.volume.model();
        var reverb = new effects.reverb.model();
        var compressor = new effects.compressor.model();
        var filter = new effects.filter.model();      
        var presets = new preset.collection();
        
       presets.add(delay);
        presets.add(volume);
        presets.add(reverb);
       presets.add(filter);
        presets.add(compressor);

        var presetView = new preset.view({model: presets});
        
        document.addEventListener("keydown", function(e){
            if(e.keyCode === 32){
                var effectNodes = [], effectNode;
                for(var i = 0; i < presets.models.length; i++){
                    effectNode = {
                                    name: presets.models[i].get("name"),
                                    params: presets.models[i].attributes
                                 };
                    effectNodes.push(effectNode);
                }
                console.log(presets);
                startPlayback(effectNodes);
            }
        });
        
        $("#effects").append(presetView.el);
    });
};
