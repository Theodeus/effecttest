//soundfile abstraction

define(["third-party/jquery", "third-party/underscore-min", "third-party/backbone"], function() {

    var soundfile = {
        model : Backbone.Model.extend({
            initialize : function(_url, _title) {
                _.bindAll(this, "changeFile");
                this.set({
                    url : _url,
                    title : _title
                });
                this.changeFile(_url, _title);
            },
            changeFile : function(newUrl, title) {
                this.set({
                    url : newUrl
                });
                var urlSplit = newUrl.split("/");
                this.set({
                    title : title || urlSplit[urlSplit.length-1].replace(".mp3", "") || "untitled"
                });
                var that = this;
                var xhr = new XMLHttpRequest();
                xhr.open("GET", this.get("url"), true);
                xhr.responseType = "arraybuffer";
                xhr.onreadystatechange = function() {
                    if(xhr.readyState = 4 && (xhr.status === 200 || xhr.status === 304)) {
                        that.set({
                            song : xhr.response
                        });
                    }
                };
                xhr.send(null);
            }
        }),
        view : Backbone.View.extend({
            className: "songView",
            initialize : function() {
                _.bindAll(this, "render");
                this.model.bind("change", this.render);
                this.template = _.template("<p><%= title %></p>");
            },
            render : function() {
                $(this.el).html(this.template({title: this.model.get("title")}));
                return this;
            },
            events: {
                "click": "render"
            }
        })
    };
    return soundfile;
});
