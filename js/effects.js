//effect "superclass" and factory

//knobs found at http://tutorialzine.com/2011/11/pretty-switches-css3-jquery/

define(["backbone", "effectImpl/compressor", "effectImpl/volume", "effectImpl/delay", "effectImpl/reverb", "effectImpl/filter"], function(Backbone, compressor, volume, delay, reverb, filter) {

    var effects = {
        filter : filter,
        compressor : compressor,
        volume : volume,
        delay : delay,
        reverb : reverb,
        empty : {
            model : Backbone.Model.extend({
                initialize : function(parent) {
                    this.set({
                        name : "empty",
                        img : "img/empty.png",
                        parent : parent
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
                render : function(parent) {
                    var availibleEffects = [], e, i, anchor, li, that = this,

                    //make the main collection switch to a new effect
                    chooseEffect = function(e) {
                        //the model has a reference to the parent collection
                        var parent = that.model.get("parent");
                        //the index of the target
                        var emptyIndex = parent.indexOf(that.model);
                        //this gives us the effect name
                        var effectToAdd = e.target.href.split("#")[1];
                        //add new effect first at the calculated index and then remove the empty model to avoid rendering issues
                        parent.add(new effects[effectToAdd].model(), {
                            at : emptyIndex
                        });
                        parent.remove(that.model);
                    };
                    //extract the availible effects
                    for(e in effects) {
                        if(effects.hasOwnProperty(e) && e !== "empty" && e !== "renderKnob") {
                            availibleEffects.push(e);
                        }
                    }

                    //reset the element we're attaching to
                    $(parent).html("");
                    this.$el.html("<ul>");

                    //create a list of the availible affects and add it to the panel
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
