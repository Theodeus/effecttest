//playback functionallity

define(["backbone"], function(Backbone) {
    var play = Backbone.View.extend({
        playStop : function(e) {
            console.log("play");
            //return if it's not specebar being pressed
            if(e.keyCode && e.keyCode !== 32) {
                return;
            }

            var effectNodes = [], effectNode;
            //create an array with the effects we should add before playback begins
            for(var i = 0; i < this.presets.models.length; i++) {
                effectNode = {
                    name : this.presets.models[i].get("name"),
                    params : this.presets.models[i].attributes
                };
                effectNodes.push(effectNode);
            }

            this.startPlayback(effectNodes);

        },
        initialize : function(startPlayback, presets) {
            _.bindAll(this, "playStop", "render");
            this.startPlayback = startPlayback;
            this.presets = presets;
            this.$el = $("#play");
            
            //add listeners for spacebar and click on the speaker
            document.addEventListener("keydown", this.playStop);
            this.render(); 
        },
        events : {
            "click" : "playStop"
        },
        render : function() {
            this.$el.css("background-image", "url('img/speaker.png')");
        }
    });
    return play;
});
