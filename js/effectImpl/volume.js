//The abstract volume effect

//Every abstract effect has two views, one for rendering a box on the effect pipe and one for te effect settings panel.

define(["backbone", "effectImpl/panelView"], function(Backbone, panel) {
    var volume = {

        model : Backbone.Model.extend({
            initialize : function() {
                this.set({
                    name : "volume",
                    img : "img/volume.png"
                });
            }
        }),

        boxView : Backbone.View.extend({
            className : "boxView volume",
            background : "#aff",
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

        panelView : panel.extend({
            className : "panelView",
            initialize : function() {
                _.bindAll(this, "render");
                this.template = _.template("<span class='parameterLabel'>GAIN</span><div id='gain'></div>");
            },
            render : function(parent) {
                this.$el.html(this.template({}));
                $(parent).html("");
                $(parent).append(this.el);
                //Render a slider for the desired volume
                this.renderKnob($("#gain"), "gain", this.model, this.model.get("gain"));
                return this;
            },
            events : {
                "click" : "render"
            }
        })
    };
    return volume;

});
