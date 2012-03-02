//This is where the abstract effects are being handled.

define(["backbone", "effectImpl/compressor", "effectImpl/volume", "effectImpl/delay", "effectImpl/reverb", "effectImpl/filter"], function(Backbone, compressor, volume, delay, reverb, filter) {

    var effects = {
        
        //All effect types are defined in their own submodules...
        filter : filter,
        compressor : compressor,
        volume : volume,
        delay : delay,
        reverb : reverb,
        
        //..except for the empty one. This one needs to be able to dynamically loop trough the other effects to create the list of availible effects, and putting in it's own file creates an infinite dependency loop (since this file requires the empty.js file and the empty.js file requires effects.js)
        empty : {
            model : Backbone.Model.extend({
                initialize : function() {
                    this.set({
                        name : "empty",
                        img : "img/empty.png"
                    });
                }
            }),

            boxView : Backbone.View.extend({
                className : "boxView empty",
                background : "#ccc",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("change", this.render);
                },
                render : function() {
                    this.el.style.backgroundColor = this.background;
                    return this;
                }
            }),

            panelView : Backbone.View.extend({
                className : "panelView",
                initialize : function() {
                    _.bindAll(this, "render");
                },
                //This is where the empty effect differentiates from the other effects. We need to create a list of availible effects and define a listener for selecting effects.
                render : function(parent) {
                    var availibleEffects = [],
                        e,
                        i,
                        anchor,
                        li,
                        that = this,
                    
                    //Make the main collection switch to a new effect when an effect is selected 
                    chooseEffect = function(event) {
                        //Get a reference to the parent collection
                        var parent = that.options.parent;
                        //Get the index of the target
                        var emptyIndex = parent.indexOf(that.model);
                        //This gives us the effect name..
                        var effectToAdd = event.target.href.split("#")[1];
                        //Add the new effect first at the calculated index and then remove the empty model to avoid rendering issues
                        var modelToAdd = new effects[effectToAdd].model();
                        parent.add(modelToAdd, {
                            at : emptyIndex
                        });
                        //Make sure we save the position!
                        modelToAdd.set("position", emptyIndex+1)
                        modelToAdd.save();
                        //Remove the empty model form the localStorage.
                        that.model.destroy();
                        parent.remove(that.model);
                    };
                    
                    //Extract the availible effects
                    for(e in effects) {
                        if(effects.hasOwnProperty(e) && e !== "empty") {
                            availibleEffects.push(e);
                        }
                    }

                    //Reset the element we're attaching to
                    $(parent).html("");
                    this.$el.html("<ul>");

                    //Create a list of the availible affects and add it to the panel
                    for( i = 0; i < availibleEffects.length; i++) {
                        li = document.createElement("li");
                        anchor = document.createElement("a");
                        anchor.href = "#" + availibleEffects[i];
                        anchor.textContent = availibleEffects[i];
                        anchor.onclick = chooseEffect;
                        li.appendChild(anchor);
                        this.$el.append(li);
                    }
                    this.$el.append("</ul>");
                    $(parent).append(this.el);
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        }
    };
    return effects;
});
