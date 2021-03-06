//The abstract delay effect

//Every abstract effect has two views, one for rendering a box on the effect pipe and one for te effect settings panel.

define(["backbone", "effectImpl/panelView"], function(Backbone, panel) {
    var delay = {

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
            className : "boxView delay",
            background : "#faa",
            initialize : function() {
                _.bindAll(this, "render");
                this.model.bind("change", this.render);
            },
            render : function() {
                this.el.style.backgroundColor = this.background;
                return this;
            }
        }),

        panelView : panel.extend({
            className : "panelView",
            initialize : function() {
                _.bindAll(this, "render");
                this.template = _.template("<span class='parameterLabel'>TEMPO</span><div id='tempo'></div><span class='parameterLabel'>LEVEL</span><div id='level'></div>");
            },
            render : function(parent) {
                this.$el.html(this.template({}));
                $(parent).html("");
                $(parent).append(this.el);
                
                //Render sliders for setting the tempo and level of the delay.
                this.renderKnob($("#tempo"), "tempo", this.model, this.model.get("tempo") !== undefined ? this.model.get("tempo") : (1 / 200 * 90));
                this.renderKnob($("#level"), "level", this.model, this.model.get("level") !== undefined ? this.model.get("level") : 1);
                return this;
            },
            events : {
                "click" : "render"
            }
        })

    };
    return delay;

});
