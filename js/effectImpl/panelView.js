define(["backbone", "ui"], function(Backbone, $) {

    var panelView = Backbone.View.extend({
                
        renderKnob : function(target, parameter, model, value){
            
             $(target).slider({
                orientation: "vertical",
                range: "min",
                step: 0.001,
                min: 0,
                max: 1,
                value: value === undefined ? 0.5 : value,
                slide: function( event, ui ) {
                    model.set(parameter, ui.value);
                }
            });
    
        } 

    });
    return panelView;
});