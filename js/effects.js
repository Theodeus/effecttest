//effect "superclass" and factory

//knobs found at http://tutorialzine.com/2011/11/pretty-switches-css3-jquery/

define(["third-party/jquery", "third-party/jquery-ui", "third-party/underscore-min", "third-party/backbone"], function() {

    var effects = {
        
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
                className : "boxView",
                background : "#ccc",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= name %></p>"/*<img src <%= src %> alt='effect' />"*/);
                },
                render : function() {
                    $(this.el).html(this.template({
                        name : this.model.get("name")
                    }));
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
                    chooseEffect = function(e){
                        //the model has a reference to the parent collection
                        var parent = that.model.get("parent");
                        //the index of the target
                        var emptyIndex = parent.indexOf(that.model);
                        //this gives us the effect name
                        var effectToAdd = e.target.href.split("#")[1];
                        //add new effect first at the calculated index and then remove the empty model to avoid rendering issues
                        parent.add(new effects[effectToAdd].model(), {at: emptyIndex});
                        parent.remove(that.model); 
                    };
                    
                    //extract the availible effects
                    for(e in effects){
                        if(effects.hasOwnProperty(e) && e !== "empty" && e !== "renderKnob"){
                            availibleEffects.push(e);
                        }
                    }
                    
                    //reset the element we're attaching to
                    $(parent).html("");
                    $(this.el).html("<ul>");
                    
                    //create a list of the availible affects and add it to the panel
                    for(i = 0; i < availibleEffects.length; i++){
                        li = document.createElement("li");
                        anchor = document.createElement("a");
                        anchor.href = "#"+availibleEffects[i];
                        anchor.textContent = availibleEffects[i];
                        anchor.onclick = chooseEffect;
                        li.appendChild(anchor);
                        $(this.el).append(li);
                    }
                    $(this.el).append("</ul>");
                    $(parent).append(this.el);
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        },
        
        delay : {
            
            model : Backbone.Model.extend({
                delayTime : 0.5,
                initialize : function() {
                    //_.bindAll(this, "changeFile");
                    this.set({
                        name : "delay",
                        img : "img/delay.png"
                    });
                }
            }),
            
            boxView : Backbone.View.extend({
                className : "boxView",
                background : "#faa",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= name %></p>"/*<img src <%= src %> alt='effect' />"*/);
                },
                render : function() {
                    $(this.el).html(this.template({
                        name : this.model.get("name"),
                        src : this.model.get("src")
                    }));
                    this.el.style.backgroundColor = this.background;
                    return this;
                }
            }),
            
            panelView : Backbone.View.extend({
                className : "panelView",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.template = _.template("<h3><%= title %></h3><span class='parameterLabel'>TEMPO</span><div id='tempo'></div><span class='parameterLabel'>LEVEL</span><div id='level'></div>");
                },
                render : function(parent) {
                    $(this.el).html(this.template({
                        title : this.model.get("name")
                    }));
                    $(parent).html("");
                    $(parent).append(this.el);
                    effects.renderKnob($("#tempo"), "tempo", this.model, this.model.get("tempo") !== undefined ? this.model.get("tempo") : (1/200 * 90));
                    effects.renderKnob($("#level"), "level", this.model, this.model.get("level") !== undefined ? this.model.get("level") : 1);
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        },
        
        
        filter : {
            
            model : Backbone.Model.extend({
                initialize : function() {
                    //_.bindAll(this, "changeFile");
                    this.set({
                        name : "filter",
                        img : "img/filter.png"
                    });
                }
            }),
            
            boxView : Backbone.View.extend({
                className : "boxView",
                background : "#aaf",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= name %></p>"/*<img src <%= src %> alt='effect' />"*/);
                },
                render : function() {
                    $(this.el).html(this.template({
                        name : this.model.get("name"),
                        src : this.model.get("src")
                    }));
                    this.el.style.backgroundColor = this.background;
                    return this;
                },
                events : {
                    "click" : "render"
                }
            }),
            
            panelView : Backbone.View.extend({
                className : "panelView",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.template = _.template("<p><%= title %></p><span class='parameterLabel'>FREQUENCY</span><div id='freq'></div><span class='parameterLabel'>Q</span><div id='q'></div>");
                },
                render : function(parent) {
                    $(this.el).html(this.template({
                        title : this.model.get("name")
                    }));
                    $(parent).html("");
                    $(parent).append(this.el);
                    effects.renderKnob($("#freq"), "freq", this.model, this.model.get("freq") !== undefined ? this.model.get("freq") : (1/10000 * 440));
                    effects.renderKnob($("#q"), "q", this.model, this.model.get("q") !== undefined ? this.model.get("q") : (1/15 * 1));
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        },
        
        
        reverb : {
            
            model : Backbone.Model.extend({
                wet : 0.3,
                initialize : function() {
                    //_.bindAll(this, "changeFile");
                    this.set({
                        name : "reverb",
                        img : "img/reverb.png"
                    });
                }
            }),
            
            boxView : Backbone.View.extend({
                className : "boxView",
                background : "#ffa",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= name %></p>"/*<img src <%= src %> alt='effect' />"*/);
                },
                render : function() {
                    $(this.el).html(this.template({
                        name : this.model.get("name"),
                        src : this.model.get("src")
                    }));
                    this.el.style.backgroundColor = this.background;
                    return this;
                },
                events : {
                    "click" : "render"
                }
            }),
            
            panelView : Backbone.View.extend({
                className : "panelView",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.template = _.template("<p><%= title %></p><span class='parameterLabel'>LEVEL</span><div id='level'></div>");
                },
                render : function(parent) {
                    $(this.el).html(this.template({
                        title : this.model.get("name")
                    }));
                    $(parent).html("");
                    $(parent).append(this.el);
                    effects.renderKnob($("#level"), "level", this.model, this.model.get("level"));
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        },
        
        
        volume : {
            vol : 1,
            model : Backbone.Model.extend({
                initialize : function() {
                    //_.bindAll(this, "changeFile");
                    this.set({
                        name : "volume",
                        img : "img/volume.png"
                    });
                }
            }),
            
            boxView : Backbone.View.extend({
                className : "boxView",
                background : "#aff",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= name %></p>"/*<img src <%= src %> alt='effect' />"*/);
                },
                render : function() {
                    $(this.el).html(this.template({
                        name : this.model.get("name"),
                        src : this.model.get("src")
                    }));
                    this.el.style.backgroundColor = this.background;
                    return this;
                },
                events : {
                    "click" : "render"
                }
            }),
            
            panelView : Backbone.View.extend({
                className : "panelView",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.template = _.template("<p><%= title %></p><span class='parameterLabel'>GAIN</span><div id='gain'></div>");
                },
                render : function(parent) {
                    $(this.el).html(this.template({
                        title : this.model.get("name")
                    }));
                    $(parent).html("");
                    $(parent).append(this.el);
                    effects.renderKnob($("#gain"), "gain", this.model, this.model.get("gain"));
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        },
        
        
        compressor : {
            
            model : Backbone.Model.extend({
                initialize : function() {
                    //_.bindAll(this, "changeFile");
                    this.set({
                        name : "compressor",
                        img : "img/compressor.png"
                    });
                }
            }),
            
            boxView : Backbone.View.extend({
                className : "boxView",
                background : "#afa",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= name %></p>"/*<img src <%= src %> alt='effect' />"*/);
                },
                render : function() {
                    $(this.el).html(this.template({
                        name : this.model.get("name"),
                        src : this.model.get("src")
                    }));
                    this.el.style.backgroundColor = this.background;
                    return this;
                },
                events : {
                    "click" : "render"
                }
            }),
            
            panelView : Backbone.View.extend({
                className : "panelView",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.template = _.template("<p><%= title %></p><p>This node makes sure there's no nasty peaks. Try setting a low filter frequency value and high filter q value to see what i mean.</p><p>There's no settings to be made in the Web Audio implementation at the moment though.</p>");
                },
                render : function(parent) {
                    $(this.el).html(this.template({
                        title : this.model.get("name")
                    }));
                    $(parent).html("");
                    $(parent).append(this.el);
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        },
        
        
        renderKnob : function(target, parameter, model, value){
            
             $(target).slider({
                orientation: "vertical",
                range: "min",
                step: 0.001,
                min: 0,
                max: 1,
                value: value === undefined ? 0.5 : value,
                slide: function( event, ui ) {
                    model.set(parameter, ui.value);
                }
            });
    
        } 

    };
    return effects;
});
