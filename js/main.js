//main router, imports it's dependencies via require.js
window.onload = function(){
    require(["soundfile", "effects", "play", "preset", "third-party/jquery", "third-party/underscore-min", "third-party/backbone", "AudioNodes"], function(soundfile, effects, play, preset) {
        
        
        var startPlayback = function(presets){
            var context = new webkitAudioContext(),
                output = context.destination,
                audio = context.createBufferSource(),
                buffer = context.createBuffer(song.get("song"), false),
                nodes = [],
                node,
                finalNode;
                
            audio.buffer = buffer;
            audio.loop = true;
            
            
            
            for(model in presets.models){
                switch(presets.models[model].get("name")){
                    case "delay":
                        node = new AudioNodes.StereoDelay(context);
                        nodes.push(node);
                        console.log("I'm a delay");
                        break;
                    case "filter":
                        node = new AudioNodes.Filter(context, "lowpass", {frequency: 2000, q: 1});
                        nodes.push(node);
                        console.log("I'm a filter");
                        break;
                    case "reverb":
                        node = new AudioNodes.Convolver(context, "sounds/impulse_rev.wav");
                        nodes.push(node);
                        console.log("I'm a reverb");
                        break;
                    case "compressor":
                        node = context.createDynamicsCompressor();
                        node.input = node;
                        nodes.push(node);
                        console.log("I'm a compressor");
                        break;
                    case "volume":
                        node = context.createGainNode();
                        node.input = node;
                        node.gain.value = 0.8;
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
        
       // $("#effects").append(delayView.el);
        
        var presets = new preset.collection();
        presets.add(delay);
        presets.add(volume);
        presets.add(reverb);
        presets.add(compressor);
        presets.add(filter);

        var presetView = new preset.view({model: presets});
        
        document.addEventListener("keydown", function(e){
            if(e.keyCode === 32){
                startPlayback(presets);
            }
        });
        
        $("#effects").append(presetView.el);
    });
};
