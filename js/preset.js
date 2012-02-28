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
                    this.el.innerHTML = "";
                    _.each(this.model.models, function(effect){
                        var effectView = new effects[effect.get("name")].boxView({model:effect});
                        effectView.render();
                        $(that.el).append(effectView.el);
                    });
                    console.log("rendering collection");
                    return this;
                },
                events : {
                    "click .boxView" : "showPanel"
                },
                showPanel : function(e){
                    var siblings = e.target.parentNode.childNodes;
                    for(elem in siblings){
                        if(siblings[elem] === e.target){
                            var effect = this.model.at(elem);
                            var effectView = new effects[effect.get("name")].panelView({model:effect});
                            effectView.render($("#panel"));
                        }
                    }                    
                }
            })
    };
    return preset;
});
