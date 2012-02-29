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
                    var that = this,
                        numberOfEffects = 0,
                        emptySlots = 5;
                    
                    this.el.innerHTML = "";
                    _.each(this.model.models, function(effect){
                        var effectView = new effects[effect.get("name")].boxView({model:effect});
                        effectView.render();
                        $(that.el).append(effectView.el);
                        numberOfEffects++;
                    });
                    emptySlots -= numberOfEffects;
                    if(emptySlots > 0){
                       this.model.add(new effects.empty.model(this.model));
                    }
                    return this;
                },
                events : {
                    "click .boxView" : "showPanel"
                },
                showPanel : function(e){
                    //find out what element was clicked by camparing the target with the parents children
                    var siblings = e.target.parentNode.childNodes;
                    for(elem in siblings){
                        if(siblings[elem] === e.target){
                            //get the model and create a panel view for that model
                            var effect = this.model.at(elem);
                            var effectView = new effects[effect.get("name")].panelView({model:effect});
                            //inject the element you want the panel to attach itself to
                            effectView.render($("#panel"));
                        }
                    }                    
                }
            })

    };
    return preset;
});
