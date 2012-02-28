//effect "superclass" and factory

define(["third-party/jquery", "third-party/underscore-min", "third-party/backbone"], function() {

    var effects = {
        
        delay : {
            
            model : Backbone.Model.extend({
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
                background : "#f00",
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
                },
                events : {
                    "click" : "render"
                }
            }),
            
            panelView : Backbone.View.extend({
                className : "panelView",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= title %></p>");
                },
                render : function() {
                    $(this.el).html(this.template({
                        title : this.model.get("title")
                    }));
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
                background : "#00f",
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
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= title %></p>");
                },
                render : function() {
                    $(this.el).html(this.template({
                        title : this.model.get("title")
                    }));
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        },
        
        
        reverb : {
            
            model : Backbone.Model.extend({
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
                background : "#ff0",
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
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= title %></p>");
                },
                render : function() {
                    $(this.el).html(this.template({
                        title : this.model.get("title")
                    }));
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        },
        
        
        volume : {
            
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
                background : "#0ff",
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
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= title %></p>");
                },
                render : function() {
                    $(this.el).html(this.template({
                        title : this.model.get("title")
                    }));
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
                background : "#0f0",
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
                    this.model.bind("change", this.render);
                    this.template = _.template("<p><%= title %></p>");
                },
                render : function() {
                    $(this.el).html(this.template({
                        title : this.model.get("title")
                    }));
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
