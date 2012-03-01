define(["backbone"], function(Backbone){
    var compressor = {
            
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
                className : "boxView compressor",
                background : "#afa",
                initialize : function() {
                    _.bindAll(this, "render");
                    this.model.bind("change", this.render);
                },
                render : function() {
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
                    this.template = _.template("<p>There's no settings to be made in the Web Audio implementation at the moment.</p>");
                },
                render : function(parent) {
                    this.$el.html(this.template({}));
                    $(parent).html("");
                    $(parent).append(this.el);
                    return this;
                },
                events : {
                    "click" : "render"
                }
            })
        };
        return compressor;
        
});
