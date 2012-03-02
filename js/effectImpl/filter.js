//The abstact filter module

//Every abstract effect has two views, one for rendering a box on the effect pipe and one for te effect settings panel.

define(["backbone", "effectImpl/panelView"], function(Backbone, panel) {
    var filter = {

        model : Backbone.Model.extend({
            initialize : function() {
                this.set({
                    name : "filter",
                    img : "img/filter.png"
                });
            }
        }),

        boxView : Backbone.View.extend({
            className : "boxView filter",
            background : "#aaf",
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
                this.template = _.template("<span class='parameterLabel'>FREQUENCY</span><div id='freq'></div><span class='parameterLabel'>Q</span><div id='q'></div>");
            },
            render : function(parent) {
                this.$el.html(this.template({}));
                $(parent).html("");
                $(parent).append(this.el);
                //We need to render sliders for controlling frequency and Q value of the filter
                //The frequency should range up to 10000, set 440 Hz as default if we haven't set the frequency before.
                this.renderKnob($("#freq"), "freq", this.model, this.model.get("freq") !== undefined ? this.model.get("freq") : (1 / 10000 * 440));
                //Set the Q to 1 if it hasn't been edited.
                this.renderKnob($("#q"), "q", this.model, this.model.get("q") !== undefined ? this.model.get("q") : (1 / 15 * 1));
                return this;
            },
            events : {
                "click" : "render"
            }
        })

    };
    return filter;

});
