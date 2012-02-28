//the effect collection, or pipe if you will..

define(["effects", "third-party/jquery", "third-party/underscore-min", "third-party/backbone"], function(effects) {

    var preset = {

            collection : Backbone.Collection.extend({
                
            }),

            view : Backbone.View.extend({
                className : "presetView",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("add", this.render);
                    this.model.bind("remove", this.render);
                    this.render();
                },
                render : function() {
                    var that = this;
                    _.each(this.model.models, function(effect){
                        var delayView = new effects[effect.get("name")].boxView({model:effect});
                        delayView.render();
                        $(that.el).append(delayView.el);
                    });
                    console.log("rendering collection");
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
    };
    return preset;
});
