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
                initialize : function(_url, _title) {
                    _.bindAll(this, "changeFile");
                    this.set({
                        url : _url,
                        title : _title
                    });
                    this.changeFile(_url, _title);
                }
            }),
            boxView : Backbone.View.extend({
                className : "boxView",
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
                initialize : function(_url, _title) {
                    _.bindAll(this, "changeFile");
                    this.set({
                        url : _url,
                        title : _title
                    });
                    this.changeFile(_url, _title);
                }
            }),
            boxView : Backbone.View.extend({
                className : "boxView",
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
                initialize : function(_url, _title) {
                    _.bindAll(this, "changeFile");
                    this.set({
                        url : _url,
                        title : _title
                    });
                    this.changeFile(_url, _title);
                }
            }),
            boxView : Backbone.View.extend({
                className : "boxView",
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
                initialize : function(_url, _title) {
                    _.bindAll(this, "changeFile");
                    this.set({
                        url : _url,
                        title : _title
                    });
                    this.changeFile(_url, _title);
                }
            }),
            boxView : Backbone.View.extend({
                className : "boxView",
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
