//effect "superclass" and factory

//knobs found at http://tutorialzine.com/2011/11/pretty-switches-css3-jquery/

define(["third-party/jquery", "third-party/jquery-ui", "third-party/underscore-min", "third-party/backbone"], function() {

    var effects = {
        
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
                    console.log("rendering delay");
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
                    effects.renderKnob($("#tempo"), "tempo", this.model, this.model.get("tempo"));
                    effects.renderKnob($("#level"), "level", this.model, this.model.get("level"));
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        },
        
        
        filter : {
            
            model : Backbone.Model.extend({
                filterFreq : 440,
                filterQ : 1,
                filterGain : 1,
                filterType : 0,
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
                    console.log("rendering filter");
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
                    effects.renderKnob($("#freq"), "freq", this.model, this.model.get("freq"));
                    effects.renderKnob($("#q"), "q", this.model, this.model.get("q"));
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
                    console.log("rendering reverb");
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
                    console.log("rendering volume");
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
                    console.log("rendering compressor");
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
