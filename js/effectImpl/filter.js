define(["backbone", "effectImpl/panelView"], function(Backbone, panel) {
    var filter = {

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
                this.renderKnob($("#freq"), "freq", this.model, this.model.get("freq") !== undefined ? this.model.get("freq") : (1 / 10000 * 440));
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
