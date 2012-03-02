//This is the effect collection, or effect pipe if you will..

define(["effects", "backbone"], function(effects, Backbone) {

    var patch = {
        
        //This is the collection of effects that will be applied to the sound at playback. It's visualized by the effect boxes on the pipe in the GUI.
        collection : Backbone.Collection.extend({
            localStorage : new Store("effectPreset"),
            initaialize : function(){
                _.bindAll(this, "save");
            }
        }),
        
        //This is the pipe in the GIU. It's responsible for adding and removing effects, as well as providing the GUI for editing effect parameters.
        view : Backbone.View.extend({
            className : "presetView",
           
            initialize : function() {
                _.bindAll(this, "render");
                this.collection.bind("add", this.render);
                this.collection.bind("remove", this.render);
                this.render();
            },
            render : function() {
                var that = this, 
                    numberOfEffects = 0, 
                    emptySlots = 5;
                
                //Reset the effect pipe.
                this.el.innerHTML = "";
                
                //Loop trough the effect collection...
                _.each(this.collection.models, function(effect) {
                    //...create a box for the effect...
                    var effectView = new effects[effect.get("name")].boxView({
                        model : effect
                    });
                    //..render and append it to the pipe..
                    effectView.render();
                    $(that.el).append(effectView.el);
                    //..and keep track of how many effects we've added.
                    numberOfEffects++;
                });
                
                //Check if there we're slots that's not occupied. This will only happen the first time the user visits the app and there's nothing in the localStorage, so we need to populate the collection with empty effects to enable positioning of effects
                emptySlots -= numberOfEffects;
                if(emptySlots > 0) {
                    var emptyEffect = new effects.empty.model();
                    this.collection.add(emptyEffect);
                    //make sure the placeholder will render att the correct position on reloads
                    emptyEffect.set("position", 6-emptySlots);
                    //save it in localStorage
                    emptyEffect.save();
                }
                return this;
            },
            events : {
                "click .boxView" : "handleClick"
            },
            //This can either mean the user is trying to add or remove an effect.
            handleClick : function(e) {
                e.preventDefault();
                
                //If shift is down, the user wants to remove an effect
                if(e.shiftKey){
                     //Go ahead and remove the effect
                    var index;
                    for(var i in this.el.children) {
                        //Find the index of the effect we're going to remove
                        if(this.el.children[i] === e.target) {
                            index = i;
                        }
                    }
                    
                    //Add an empty effect at the index we found
                    var effect = new effects.empty.model();
                    this.collection.add(effect, {
                        at : index
                    });
                    //Make sure it'll render in the right position and save it
                    effect.set("position", parseInt(index,10)+1);
                    effect.save();
                    
                    //Find the effect we're removing in the effect collection (which is 6 effects long right now)
                    var oldEffect = this.collection.at(parseInt(index, 10) + 1);
                    //Remove from localStorage..
                    oldEffect.destroy();
                    //.. and give it the boot!
                    this.collection.remove(oldEffect);
                    //Make sure there's no effect settings panel lingering after the effect is removed.
                    $("#panel").html("");
                    //If shift isn't down we should show a panel with effect settings
                } else {

                    var siblings = e.target.parentNode.childNodes,
                        effect,
                        effectView;
                        
                    //Check the effects in the effects pipe and check if they match the event target (to find out at which index we should create a panel for)
                    for(elem in siblings) {
                        if(siblings[elem] === e.target) {
                            //Get the model and create a panel view for that model
                            effect = this.collection.at(elem);
                            effectView = new effects[effect.get("name")].panelView({
                                model : effect,
                                parent : this.collection
                            });
                            //Inject the element we want the panel to attach itself to
                            effectView.render($("#panel"));
                        }
                    }
                }
                return false;
            }
        })

    };
    return patch;
});
