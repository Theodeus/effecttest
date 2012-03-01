//the effect collection, or pipe if you will..

define(["effects", "backbone"], function(effects, Backbone) {

    var preset = {

        collection : Backbone.Collection.extend({
            //localStorage : new Store("songBoxPreset")
        }),

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

                this.el.innerHTML = "";
                _.each(this.collection.models, function(effect) {
                    var effectView = new effects[effect.get("name")].boxView({
                        model : effect
                    });
                    effectView.render();
                    $(that.el).append(effectView.el);
                    numberOfEffects++;
                    
                });
                emptySlots -= numberOfEffects;
                if(emptySlots > 0) {
                    this.collection.add(new effects.empty.model(this.collection, effects));
                }
                
                return this;
            },
            events : {
                "click .boxView" : "handleClick"
            },
            handleClick : function(e) {
                e.preventDefault();
                //either shows panel or removes an effet if shift is down
                
                if(e.shiftKey){
                     //remove effect if it's not empty
                    var index;
                    for(var i in this.el.children) {
                        if(this.el.children[i] === e.target) {
                            index = i;
                        }
                    }
                    this.collection.add(new effects.empty.model(this.collection), {
                        at : index
                    });
                    this.collection.remove(this.collection.at(parseInt(index, 10) + 1));
                    $("#panel").html("");
                } else {
                    //find out what element was clicked by camparing the target with the parents children
                    var siblings = e.target.parentNode.childNodes,
                        effect,
                        effectView;
                        
                    for(elem in siblings) {
                        if(siblings[elem] === e.target) {
                            //get the model and create a panel view for that model
                            effect = this.collection.at(elem);
                            effectView = new effects[effect.get("name")].panelView({
                                model : effect
                            });
                            //inject the element you want the panel to attach itself to
                            effectView.render($("#panel"));
                        }
                    }
                }
                return false;
            }
        })

    };
    return preset;
});
