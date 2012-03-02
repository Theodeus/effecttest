//The abstract reverb effect

//Every abstract effect has two views, one for rendering a box on the effect pipe and one for te effect settings panel.

define(["backbone", "effectImpl/panelView"], function(Backbone, panel) {
    var reverb = {

        model : Backbone.Model.extend({
            initialize : function() {
                this.set({
                    name : "reverb",
                    img : "img/reverb.png"
                });
            }
        }),

        boxView : Backbone.View.extend({
            className : "boxView reverb",
            background : "#ffa",
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
                this.template = _.template("<span class='parameterLabel'>LEVEL</span><div id='level'></div>");
            },
            render : function(parent) {
                this.$el.html(this.template({}));
                $(parent).html("");
                $(parent).append(this.el);
                //Render a slider for the amount of reverb to be applied
                this.renderKnob($("#level"), "level", this.model, this.model.get("level"));
                return this;
            },
            events : {
                "click" : "render"
            }
        })

    };
    return reverb;

});
